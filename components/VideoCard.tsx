import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Models } from 'react-native-appwrite'
import { ResizeMode, Video } from 'expo-av';
import { icons } from '@/constants';
import { updateBookmark } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import { GlobalContextType } from '@/context/types.context';
import MenuWrapper from './MenuWrapper';

type VideoCardProps = {
    video: Models.Document;
}

const VideoCard = ({ video: {title, thumbnail, video, $id,
                     creator: {username, avatar}}}: VideoCardProps) => {

  const {currentUser} = useGlobalContext() as GlobalContextType;                 
  const [isPlay, setIsPlay] = useState(false);

  const bookmark = async () =>{
    try{
        await updateBookmark(
          $id,
          currentUser?.$id);
          
    }catch (err) {
        console.log((err as Error).message)
    }

  }

  const exitMenu = async () =>{

  }

  const items = [
    {
        title:"bookmark",
        action:bookmark,
    },
    {
        title:"close",
        action:exitMenu
    }
  ]
  return (
    <View className="flex-col items-center px-4 mb-14 relative z-[-1]">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1 ml-3 ">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image 
                        className=" w-full h-full rounded-lg"
                        resizeMode="cover"
                        source={{uri:avatar}}
                    /> 
                </View>
                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm">{title}</Text>
                    <Text className="tex-xs text-gray-100 font-pregular" numberOfLines={1}>{!username?'':username}</Text>
                </View>
            </View>
            <View className="pt-2">
                <MenuWrapper 
                 items={items}/>
            </View>
        </View>
        {
            isPlay ? (
                <Video 
                source={{ uri: video }}
                className="w-52 h-72 rounded-[35px] mt-3 "
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status:any) =>{
                    if(status?.didJustFinish) {
                        setIsPlay(false);
                    }
                }}
            />
            ) : (
                <TouchableOpacity 
                    activeOpacity={0.7}
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center z-[-1]"
                    onPress={()=> setIsPlay(true)}
                >
                    <Image 
                        source={{ uri:thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode='cover'
                    />
                    <Image 
                       source={icons.play}
                       className="w-12 h-12 absolute"
                       resizeMode='cover'
                    />
                </TouchableOpacity>
            )
        }
    </View>
  )
}

export default VideoCard