import { View, Image, Text } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

type EmptyStateProps = {
    title:string,
    subtitle:string,
    buttonTitle?:string
}

const EmptyState = ({title, subtitle, buttonTitle}: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
       <Image 
        source={images.empty}
        resizeMode='contain'
        className="2-[270px] h-[215px]"
       />
       <Text className="font-pmedium text-sm text-gray-100">
                {title}
        </Text>
        <Text className="text-xl font-psemibold text-white mt-2 text-center">
            {subtitle}
        </Text>
        {
            buttonTitle &&
            <CustomButton
            title={buttonTitle}
            handlePress={()=>(router.push('/create'))}
            containerStyle="w-full my-5"
            />
        }
    </View>
  )
}

export default EmptyState