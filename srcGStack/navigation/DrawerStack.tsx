import React from 'react'

import {createDrawerNavigator} from '@react-navigation/drawer'

import type {AppStackParamList} from 'src/types'

import BottomTabs from './BottomTabs'
import CustomDrawer from './components/CustomDrawer'

// Global constants
const Drawer = createDrawerNavigator<AppStackParamList>()

export const DrawerStack = () => (
  <Drawer.Navigator
    initialRouteName="BottomStack"
    screenOptions={{headerShown: false}}
    drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen name="BottomStack" component={BottomTabs} />
  </Drawer.Navigator>
)
