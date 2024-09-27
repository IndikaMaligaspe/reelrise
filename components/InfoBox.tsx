import { View, Text } from 'react-native'
import React from 'react'


type InfoBoxProps = {
    title:string | number ,
    subTitle?:string,
    containerStyles?:string,
    titleStyle:string,
}
const InfoBox = ({title, subTitle, containerStyles, titleStyle}: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <Text className={` text-white 
            text-center 
            font-psemibold 
            ${titleStyle}`}>{title}</Text>
        <Text className="text-gray-100 text-sm font-pregular">{subTitle}</Text>
    </View>
  )
}

export default InfoBox