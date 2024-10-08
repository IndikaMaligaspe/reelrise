import React, { useState } from 'react'
import { Text, View , TextInputProps, TextInput, Image, TouchableOpacity, Alert} from 'react-native'

import { icons } from '@/constants';
import { router, usePathname } from 'expo-router';

interface ExtraProps {
    otherStyles?:{}
    initialQuery?: string | string[],
}

type InputProps = TextInputProps & ExtraProps;

function SearchInput({placeholder, initialQuery } : InputProps) {
  const pathname = usePathname();  
  const [query, setQuery] = useState(initialQuery instanceof Array? initialQuery.join(): initialQuery || '');

  return (

        <View className="border-2 border-black-200 w-full h-16 px-4
         bg-black-100 rounded-2xl focus:border-secondary items-center  flex-row space-x-4">
            <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder={placeholder}
                placeholderTextColor="#CDCDEO"
                onChangeText={(e) => setQuery(e)}

            />
           
            <TouchableOpacity
                onPress={()=>{
                    if(!query){
                        return Alert.alert('Missing query', "Please input a query to search! ")
                    }
                    if(pathname.startsWith('/search')) 
                        router.setParams({query})
                    else
                        router.push(`/search/${query}`)
                }}
            >
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