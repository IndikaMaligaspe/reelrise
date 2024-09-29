import { View, Text, FlatList, Image , RefreshControl, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts } from '@/lib/appwrite'
import useAppWrite from '@/hooks/useAppwrite'
import VideoCard from '@/components/VideoCard'


const Home = () => {
  const [refreshing, setRefreshing] =  useState(false);
  const { data: posts, isLoading, refetch }  = useAppWrite(getAllPosts);
  const { data: latestPosts }  = useAppWrite(getAllPosts);


  const onRefreshing = async () =>{
    setRefreshing(true);
    await refetch();
    setRefreshing(false)
  }

  return (  
    <SafeAreaView className="bg-primary h-full">
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
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  ReelRise
                </Text>
              </View>
              <View>
                <Image 
                  source={images.logoSmall}
                  resizeMode='contain'
                  className="w-9 h-10"
                />
              </View>
            </View>
            <SearchInput 
              placeholder='Searh for a video'
              value=''
              onChangeText={()=>{}}
            />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3"> Latest Videos </Text>
              <Trending  posts={latestPosts}/>
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
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefreshing}
          />
        }
      />
    </SafeAreaView>
  )
}

export default Home