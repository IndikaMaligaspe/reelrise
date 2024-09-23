import {Text, TouchableOpacity } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    title:string,
    containerStyle?:{},
    textStyles?:{},
    isLoading?:boolean,
    handlePress:()=>void,
}

const CustomButton : React.FC<CustomButtonProps> = ({ title, containerStyle, textStyles, isLoading, handlePress}) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={` bg-secondary justify-center flex flex-row items-center min-h-[40]  min-w-[300] rounded-xl ${containerStyle}
                    ${isLoading? "opacity-50": ""}`}
            disabled={isLoading}
        >
      <Text className={` text-primary font-psemibold text-lg ${textStyles}`} > {title} </Text>
    </TouchableOpacity>
  )
}

export default CustomButton