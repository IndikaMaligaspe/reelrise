import { icons } from '@/constants';
import React, { useState } from 'react'
import {View, Image, TouchableOpacity, Text} from 'react-native';


type MenuItems = {
    title:string,
    action:()=>Promise<void>
}

type MenuProps = {
    items:MenuItems[]
}
    
const MenuWrapper = ({items}:MenuProps) => { 
    const [visible, setVisible] = useState(false);
    return (
            <View className="pt-2 justify-center absolute right-1 top-3 z-10">
                {
                        
                    visible ? (
                        <View className="relative top-2  mr-2 right-3 bg-gray-600 border border-gray-500 p-2 rounded-xl">
                            {
                                items.map((item, index)=>{
                                    return (
                                    <TouchableOpacity key={index} onPress={()=>{item.action(); setVisible(!visible)}}>
                                        <Text className="text-white font-pmedium mb-1">{item.title}</Text>
                                    </TouchableOpacity>)
                                })
                            }
                        </View>
                    ):null
                }
                <TouchableOpacity onPress={(e)=>setVisible(!visible)} className=" right-1 top-1 text-white absolute">
                    <Image 
                        source={icons.menu}
                        className="w-5 h-5"
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                    
            </View>
    )
}

export default MenuWrapper