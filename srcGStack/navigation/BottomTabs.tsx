import React from 'react'

import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {useTheme} from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/FontAwesome'

import type {BottomTabsParamList} from 'src/types'

import {commonHeaderStyle} from './components/commonHeaderStyle'
import {STRINGS} from './strings'
import {Dashboard} from '../screens/dashboard'
import Notifications from '../screens/notifications'
import {Profile} from '../screens/profile'

// Global constants
const Tab = createBottomTabNavigator<BottomTabsParamList>()

const BottomTabs = () => {
  const theme = useTheme()

  return (
    <Tab.Navigator
      screenOptions={commonHeaderStyle(theme) as BottomTabNavigationOptions}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={25} color={color} />,
          tabBarLabel: STRINGS.DASHBOARD,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => <Icon name="user" size={25} color={color} />,
          tabBarLabel: STRINGS.PROFILE,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({color}) => <Icon name="bell" size={25} color={color} />,
          tabBarLabel: STRINGS.NOTIFICATIONS,
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs
