import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'
import {useTheme} from '@ui-kitten/components'

import type {ModuleBuilderStackParamList} from 'src/types'

import {commonHeaderStyle} from './components/commonHeaderStyle'

import {Dashboard} from 'src/screens/dashboard'

const Stack = createStackNavigator<ModuleBuilderStackParamList>()

export const ModuleBuilderStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator screenOptions={commonHeaderStyle(theme)}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Dashboard"
        component={Dashboard}
      />
    </Stack.Navigator>
  )
}
