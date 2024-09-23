import React, { useState } from 'react'
import { Text, View , TextInputProps, TextInput, Image, TouchableOpacity} from 'react-native'

import { icons } from '@/constants';

interface ExtraProps {
    otherStyles:{}
    name: string,
}

type InputProps = TextInputProps & ExtraProps;

function FormField({otherStyles, name, placeholder,  keyboardType, value, onChangeText } : InputProps) {
  const [showPassowrd, setShowPassword] = useState(false)
  return (
    <View className={`space-y2 ${otherStyles}`}>
        <Text className="text-base text-gray-100 font-pmedium">
            {name}
        </Text>
        <View className="border-2 border-black-200 w-full h-16 px-4
         bg-black-100 rounded-2xl focus:border-secondary items-center  flex-row">
            <TextInput className="flex-1 text-white font-psemibold text-base"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={onChangeText}
                secureTextEntry={name === 'Password' && !showPassowrd} 
                keyboardType={keyboardType}
            />
            {
                name === 'Password' && (
                    <TouchableOpacity 
                        onPress={(()=> 
                        setShowPassword(!showPassowrd))}
                    >
                        <Image source={!showPassowrd? icons.eyeHide : icons.eye} 
                        className="w-6 h-6"
                        resizeMode="contain"/>
                    </TouchableOpacity>
                )
            }
        </View>
    </View>
  )
}

export default FormField