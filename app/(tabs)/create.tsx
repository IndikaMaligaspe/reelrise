import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '@/constants';
import CustomButton from '@/components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import { useGlobalContext } from '@/context/GlobalProvider';
import { GlobalContextType } from '@/context/types.context';
import { router } from 'expo-router';
import { createVideoPost } from '@/lib/appwrite';

type FormProps = {
  title: string,
  video: any | null,
  thumbnail: any |null,
  prompt: string,
  userId?:string,
}

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormProps>({
    title: '',
    video: null,
    thumbnail:  null,
    prompt: '',
  })
  const { currentUser } = useGlobalContext() as GlobalContextType;

  const openPicker = async (selectType :string)=> {
      const result = await ImagePicker.launchImageLibraryAsync(
        {
          mediaTypes: selectType === 'image'
              ?ImagePicker.MediaTypeOptions.Images
              :ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });

        if(!result.canceled) {
          if(selectType === 'image'){
            setForm({...form, thumbnail: result.assets[0]})
          }
          if(selectType === 'video'){
            setForm({...form, video: result.assets[0]})
          }
        }
  }
  const submit = async  () =>{
    if(form.prompt === "" ||
      form.title === "" ||
      !form.thumbnail||
      !form.video
      ) {
        return Alert.alert('Error', 'Please provide all fields ');
      }

      setUploading(true);
      try{
        await createVideoPost({
          ...form,
          userId: currentUser?.$id,
        });

      
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home"); 
      } catch (err) {
        Alert.alert("Error", (err as Error).message )
      } finally {
        setForm({
          title: '',
          video: null,
          thumbnail:  null,
          prompt: '',
        })
        setUploading(false);
      }

    
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="pt-4 my-6 mx-6" scrollEnabled showsVerticalScrollIndicator={false}>
        <Text className="text-2l text-white font-psemibold">
            Upload Video
        </Text>
        <FormField 
          otherStyles="mt-10"
          name="Video Title"
          placeholder="Video Title" 
          value={form.title} 
          onChangeText={(e)=> setForm({...form, title:e})}
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium"> Upload Video</Text>
          <TouchableOpacity
            onPress={(e)=>{openPicker('video')}}
          >
            {
               
              form.video? (
                <Video 
                  source={{ uri: form.video.uri }}
                  className="w-full h-64 rounded-2xl"
                  resizeMode={ResizeMode.COVER}
                  isLooping={false}
                  aria-disabled
                  />  
              ):(
                <View className="w-full h-16 px-4 
                bg-black-100 rounded-2xl justify-center 
                items-center">
                  <View className="w-14 h14 border 
                  border-dashed border-secondary-100
                  justify-center items-center">
                    <Image 
                      source={icons.upload}
                      resizeMode='contain'
                      className="w-1/2 h-1/2"
                    />
                  </View>
                </View>
             )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium"> Thumbnail Image</Text>
          <TouchableOpacity 
            onPress={(e)=>{openPicker('image')}}
          >
            {
              form.thumbnail? (
                <Image 
                  source={{uri:form.thumbnail.uri}}
                  resizeMode='cover'
                  className="w-full h-40 px-4"
                />
              ):(
                <View className="w-full h-16 px-4 
                bg-black-100 rounded-2xl justify-center 
                items-center border border-black-200 
                flex-row space-x-2">
                    <Image 
                      source={icons.upload}
                      resizeMode='contain'
                      className="w-5 h-5"
                    />
                    <Text className='text-sm text-gray-100 font-pmedium'>
                      Choose a file
                    </Text>
                </View>
             )}
          </TouchableOpacity>
        </View>
        <FormField 
          otherStyles="mt-7"
          name="AI Prompt"
          placeholder="The prompt you used to create this video" 
          value={form.prompt} 
          onChangeText={(e)=> setForm({...form, prompt:e})}
        />
        <CustomButton 
          title="Submit & Publish"
          handlePress={submit}
          containerStyle="my-6"
          isLoading={uploading}
        />  
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create