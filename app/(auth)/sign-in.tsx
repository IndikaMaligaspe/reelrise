import { View, Text , Image, ScrollView, Alert} from 'react-native'
import React, { FormEvent, SyntheticEvent, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import { images } from '../../constants'
import FormField from '@/components/FormField'
import { Link, router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import { GlobalContextType } from '@/context/types.context'


type SignInFormType = {
  email:string,
  passWord:string,
}

const SignIn = () => {
  const {setCurrentUser, setIsLoggedIn}  = useGlobalContext() as GlobalContextType;
  const [form, setForm] = useState<SignInFormType>({
    email: '',
    passWord:'',
  })
const [isSubmitting, setIsSubmitting] = useState(false);

const submit = async () => {

  if(!form.email || !form.passWord){
    Alert.alert('Error', 'Please fill in the required fields !')
    return
  }
    setIsSubmitting(true);
    try{
      await signIn(
        form.email, form.passWord
      )
      const result = await getCurrentUser();
      setCurrentUser(result);
      setIsLoggedIn(true);
    } catch (err) {
      Alert.alert('Error', (err as Error).message)
    }
    finally {
      setIsSubmitting(false); 
      router.replace('/home')
    }
}
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
         <View className="w-full flex justify-center items-center min-h[85vh] px-4 my-6">
            <Image 
              source={images.logo}
              resizeMode='contain'
              className="w-[115px] h-[35px]"
            />
            <Text className="text-2xl text-white text-sembold mt-10, font-psemibold">
              Log in to Aora              
            </Text>
            <FormField 
              name="Email"
              value={form?.email}
              onChangeText={(e)=>setForm({...form, email:e})}
              otherStyles={"mt-7"}
              keyboardType="email-address"
            />
            <FormField 
              name="Password"
              value={form?.passWord}
              onChangeText={(e)=>setForm({...form, passWord:e})}
              otherStyles={"mt-7"}
            />
     
         <CustomButton 
          title="Sign In"
          handlePress={submit}
          containerStyle="mt-7"
          isLoading={isSubmitting}
         />
         <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-white font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
             Sign Up
            </Link>
         </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn