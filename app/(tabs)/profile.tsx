import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';



import EmptyState from '@/components/EmptyState'
import {getUserPosts, signOut } from '@/lib/appwrite'
import useAppWrite from '@/hooks/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider';
import { GlobalContextType } from '@/context/types.context';
import { icons } from '@/constants';
import InfoBox from '@/components/InfoBox';
import { router } from 'expo-router';




const Profile = () => {
  const {currentUser, setCurrentUser, setIsLoggedIn}  = useGlobalContext() as  GlobalContextType;
  const { data: posts, refetch }  = useAppWrite(()=> getUserPosts(currentUser!=null?currentUser.$id:''));

  const logOut = async () =>{
    console.log('SIGN OUT')
    await signOut();
    setCurrentUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in');
  }

  return (
    <SafeAreaView className="bg-black-100 h-full pt-2">
      <FlatList
        data = {posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item, index}) => (
          <VideoCard 
             key={index}
             video = {item}
          />
        )}
        ListHeaderComponent={() =>(
          <View className="mt-6 mb-6 px-4 w-full 
             justify-center items-center">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={()=>logOut()}
            >
              <Image 
                source={icons.logout}
                resizeMode='contain'
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image 
                source={{uri: currentUser?.avatar}}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode='contain'
              />
            </View>
            <InfoBox
              title={currentUser?.username}
              containerStyles="mt-5"
              titleStyle="text-lg"
            />
            <View className="mt-5 flex-row">
              <InfoBox 
                title={posts.length || 0}
                subTitle="Posts"
                containerStyles="mr-10"
                titleStyle="text-xl"
              />
              <InfoBox 
                title="1.2k"
                subTitle="Followers"
                titleStyle="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState 
            title="Be the first to upload a video"
            subtitle="No Videos foubd"
            buttonTitle="Create Video"
            path='/create'
          />
        )}
      />
    
    </SafeAreaView>


  )
}

export default Profile