import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'
import {useTheme} from '@ui-kitten/components'
//TODO use absolute import
import Settings from './../../srcGStack/screens/settings'
import type {AppStackParamList} from 'src/types'

import {commonHeaderStyle} from './components/commonHeaderStyle'
import {DrawerStack} from './DrawerStack'

const Stack = createStackNavigator<AppStackParamList>()

export const GStackAppStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator screenOptions={commonHeaderStyle(theme)}>
      <Stack.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{headerShown: false}}
      />
      {/* NOTE: screens/stacks where Drawer is NOT accessible */}
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}
