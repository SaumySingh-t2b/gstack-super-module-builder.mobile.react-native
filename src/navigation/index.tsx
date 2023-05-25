import React from 'react'

import {GraniteApp} from '@react-native-granite/core'
import {createStackNavigator} from '@react-navigation/stack'

import {AuthStack} from './AuthStack'

import {GStackAuthStack} from './../../srcGStack/navigation/AuthStack'
import {GStackAppStack} from './../../srcGStack/navigation/AppStack'
import {GStackSplashScreen} from './../../srcGStack/screens/splashScreen'

import type {RootStackParamList} from 'src/types'
import {SplashScreen} from 'src/screens/splashScreen'
import {ModuleBuilderStack} from './ModuleBuilderStack'
import {AppStack} from './AppStack'

// Global Constants
const Stack = createStackNavigator<RootStackParamList>()

export const RootNavigator = () => {
  return (
    <GraniteApp.RootStack
      initialRouteName="GStackSplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="GStackSplashScreen" component={GStackSplashScreen} />
      <Stack.Screen name="GStackAuth" component={GStackAuthStack} />
      <Stack.Screen name="GStackApp" component={GStackAppStack} />

      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="App" component={AppStack} />
    </GraniteApp.RootStack>
  )
}
