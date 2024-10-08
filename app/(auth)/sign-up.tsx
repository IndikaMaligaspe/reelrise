import { View, Text , Image, ScrollView, Alert} from 'react-native'
import React, { FormEvent, SyntheticEvent, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import { images } from '../../constants'
import FormField from '@/components/FormField'
import { Link, router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { createUser } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import { GlobalContextType } from '@/context/types.context'

type SignUpFormType = {
  userName: string,
  email:string,
  passWord:string,
}

const SignUp = () => {
  const {setCurrentUser, setIsLoggedIn}  = useGlobalContext() as GlobalContextType;

  const [form, setForm] = useState<SignUpFormType>({
    userName: '',
    email: '',
    passWord:'',
  })
const [isSubmitting, setIsSubmitting] = useState(false);



const submit = async () => {
  console.log("FORM - >", form)
  if(!form.email || !form.passWord || !form.userName){
    Alert.alert('Error', 'Please fill in the required fields !')
    return;
  }
    setIsSubmitting(true);
    try{
      const result = await createUser(
        form.email, form.passWord,  form.userName
      )
      setCurrentUser(result);
      setIsLoggedIn(true);
    } catch (err) {
      Alert.alert('Error', (err as Error).message)
    } 
    finally{
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
              Sign up with Aora              
            </Text>
            <FormField 
              name="Username"
              value={form?.userName}
              onChangeText={(e)=>setForm({...form, userName:e})}
              otherStyles={"mt-7"}
            />
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
          title="Sign Up"
          handlePress={submit}
          containerStyle="mt-7"
          isLoading={isSubmitting}
         />
         <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-white font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
             Sign In
            </Link>
         </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp