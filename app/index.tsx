import { StatusBar } from 'expo-status-bar';
import { View, Text , Image, ScrollView} from 'react-native';
import { Redirect, router, Router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


import { images } from '../constants';
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/context/GlobalProvider';
import { GlobalContextType } from '@/context/types.context';

export default function RootLayout() {

  const {isLoading, isLoggedIn}  = useGlobalContext() as GlobalContextType;

  console.log(`isLoading -> ${isLoading} / isLoggedIn -> ${isLoggedIn}`)

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height:'100%' }}>
        <View className='w-full justify-start items-center min-h[85vh] px-4'>
          <Image 
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image 
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover endless possibilities with {' '}
              <Text className="text-secondary-200">Auro</Text>
            </Text>
            <Image 
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8" 
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 mb-2 text-center"> Where creativity meets innvation:
            embark on a journey of limitless exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={()=>router.push('/sign-in')}
          >
          </CustomButton>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622"  style="light" />
    </SafeAreaView>
  );
}
