import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image, ViewToken } from 'react-native'
import React, { useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { Models } from 'react-native-appwrite';
import { icons } from '@/constants';
import { ResizeMode, Video } from 'expo-av';




type TrandingItemProps = {
    activeItem:Models.Document,
    item:Models.Document
}

const zoomIn:any = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

const zoomOut:any = {
    1: {
        scale: 1
    },
    0: {
        scale: 0.9
    }
}
const TrandingItem = ({activeItem, item}:TrandingItemProps) =>{
  const video = useRef(null);
  const [play, setPlay] = useState(false);  
  return(
    <Animatable.View 
     className="mr-5"
     animation={activeItem.$id === item.$id? zoomIn : zoomOut}
     duration={500}>
        {
            play ? (
                <Video 
                    source={{ uri: item.video }}
                    className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status:any) =>{
                        if(status?.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ):(
                <TouchableOpacity 
                    className="relative justify-center items-center" 
                    activeOpacity={0.7}
                    onPress={() =>setPlay(true)}
                >
                    <ImageBackground 
                        source={{uri:item.thumbnail}}
                        className="w-52 h-72 rounded-[35px] my-5
                        overflow-hidden shadow-lg shadow-black/40"
                        resizeMode='cover'
                    />
                    <Image 
                        source={icons.play}
                        className="w-12 h12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )
        }
    </Animatable.View>
  )
}


type TrendingProps = {
    posts:Models.Document[]
}

type viewableItemsProps = {
    viewableItems: ViewToken<Models.Document>[];
    changed: ViewToken<Models.Document>[]
}
const Trending = ({posts}: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[0])
  
  const viewableItemChanged = (info:viewableItemsProps) =>{
    // console.log('inside viewableItemChanged - ',info, info.viewableItems[0]?.item?.$id, activeItem.$id)
    if(info.viewableItems.length > 0){
        setActiveItem(info.viewableItems[0].item)
    }
  }

  return (
   <FlatList 
        data = {posts}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({item}) =>(
            <TrandingItem 
                activeItem={activeItem}
                item={item}
            />
        )}
        onViewableItemsChanged={viewableItemChanged}
        viewabilityConfig={{
            itemVisiblePercentThreshold: 70,
          }}
        contentOffset={{ x: 170, y:0 }}
   />
  )
}

export default Trending