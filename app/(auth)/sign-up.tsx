import { View, Text , Image, ScrollView} from 'react-native'
import React, { FormEvent, SyntheticEvent, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import { images } from '../../constants'
import FormField from '@/components/FormField'
import { Link } from 'expo-router'
import CustomButton from '@/components/CustomButton'

type SignUpFormType = {
  userName?: string,
  email?:string,
  passWord?:string,
}

const SignUp = () => {
  const [form, setForm] = useState<SignUpFormType>({
    userName: '',
    email: '',
    passWord:'',
  })
const [isSubmitting, setIsSubmitting] = useState(false);

const submit = () => {

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