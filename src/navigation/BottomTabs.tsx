import React, {useCallback, useEffect} from 'react'
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import {useTheme} from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {STRINGS} from './strings'
import {commonHeaderStyle} from './components/commonHeaderStyle'

import type {BottomTabsParamList} from 'src/types'
import {Dashboard} from 'src/screens/dashboard'
import {Profile} from 'src/screens/profile'
import {Notifications} from 'src/screens/notifications'
import {DynamicScreen} from 'src/screens/dynamicScreen'
import {HamburgerIcon} from 'src/components'
import {useAuthProvider, AuthContext, AuthProvider} from 'src/context'

// Global constants
const Tab = createBottomTabNavigator<BottomTabsParamList>()

const ICON_SIZE = 24

const TABS_SCREEN = ['Dashboard', 'Profile', 'Notifications', 'next']

const BottomTabs = () => {
  const theme = useTheme()
  const {appMetaData} = useAuthProvider()
  // console.log('BottomTabs -> appMetaData?.show_drawer', appMetaData)

  const getLabel = useCallback(
    (route?: string) => {
      return appMetaData?.bottom_tabs?.find((item) => item.route === route)
        ?.label
    },
    [appMetaData],
  )

  const renderDynamicTabs = useCallback(() => {
    const isDrawerVisible = useCallback(
      (route?: string) => {
        if (
          appMetaData?.show_drawer &&
          appMetaData?.bottom_tabs?.map((item) => item.route)?.includes(route)
        ) {
          return true
        }
        return false
      },
      [appMetaData],
    )
    console.log('__________________>', appMetaData?.bottom_tabs)
    return appMetaData?.bottom_tabs
      ?.filter((screen) => !TABS_SCREEN.includes(screen.route!))
      ?.map((screen) => {
        console.log('BottomTabs -> screen', screen.title)
        return (
          <Tab.Screen
            key={screen.route}
            name={screen.route as any}
            component={DynamicScreen as any}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialIcons
                  name="dashboard-customize"
                  size={ICON_SIZE}
                  color={color}
                />
              ),
              headerTitle: screen.title,
              tabBarLabel: screen.label,
              title: screen.title,
              ...(isDrawerVisible(screen.route)
                ? {headerLeft: () => <HamburgerIcon theme={theme} />}
                : {}),
            }}
          />
        )
      })
  }, [appMetaData])

  return (
    <Tab.Navigator
      screenOptions={commonHeaderStyle(theme) as BottomTabNavigationOptions}>
      <Tab.Screen
        name="Dashboard"
        component={DynamicScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home" size={ICON_SIZE} color={color} />
          ),
          tabBarLabel: getLabel('Dashboard') || STRINGS.DASHBOARD,
          headerLeft: () =>
            !!appMetaData?.show_drawer && <HamburgerIcon theme={theme} />,
        }}
      />
      {renderDynamicTabs()}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="user" size={ICON_SIZE} color={color} />
          ),
          tabBarLabel: getLabel('Profile') || STRINGS.PROFILE,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="bell" size={ICON_SIZE} color={color} />
          ),
          tabBarLabel: getLabel('Notifications') || STRINGS.NOTIFICATIONS,
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs
