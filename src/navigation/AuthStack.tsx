import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {Login} from 'src/screens/accounts/login'
import {SignUp} from 'src/screens/accounts/signup'
import {ForgotPassword} from 'src/screens/accounts/forgotPassword'
import {Verification} from 'src/screens/accounts/verification'
import type {AuthStackParamList} from 'src/types'

// Global Constants
const Stack = createStackNavigator<AuthStackParamList>()

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  )
}
