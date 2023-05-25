import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'

import {ForgotPassword} from './../screens/accounts/forgotPassword'
import {Login} from './../screens/accounts/login'
import {SignUp} from './../screens/accounts/signup'
import {Verification} from './../screens/accounts/verification'
import type {AuthStackParamList} from './../types'

// Global Constants
const Stack = createStackNavigator<AuthStackParamList>()

export const GStackAuthStack = () => {
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
