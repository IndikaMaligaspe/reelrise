import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';


import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import {searchPosts, searchSavedVideos } from '@/lib/appwrite'
import useAppWrite from '@/hooks/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider';
import { GlobalContextType } from '@/context/types.context';


type SearhProps = {
  initialQuery:string
}

const Bookmark = ({initialQuery}:SearhProps) => {
  const { query } = useLocalSearchParams();
  const {currentUser} = useGlobalContext() as GlobalContextType
  const { data: posts, refetch }  = useAppWrite(()=> searchSavedVideos(query, currentUser!=null?currentUser.$id:''));


  useEffect(() =>{
    refetch();
  },[query]);

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
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Your search results for
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}
                </Text>
              </View>
            </View>
            <SearchInput 
              placeholder='Searh for a video'
              onChangeText={()=>{}}
            />
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState 
            title="Be the first to upload a video"
            subtitle="No Videos found"
            buttonTitle="back to Explore"
            path='/home'
          />
        )}
      />
    
    </SafeAreaView>


  )
}

export default Bookmark