import React, { useState } from 'react'
import { Text, View , TextInputProps, TextInput, Image, TouchableOpacity} from 'react-native'

import { icons } from '@/constants';

interface ExtraProps {
    otherStyles?:{}
}

type InputProps = TextInputProps & ExtraProps;

function SearchInput({placeholder,  keyboardType, value, onChangeText } : InputProps) {
  return (

        <View className="border-2 border-black-200 w-full h-16 px-4
         bg-black-100 rounded-2xl focus:border-secondary items-center  flex-row space-x-4">
            <TextInput className="flex-1 text-white font-psemibold text-base mt-0.5"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
           
            <TouchableOpacity>
                <Image 
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </TouchableOpacity>
           
        </View>
  )
}

export default SearchInput;