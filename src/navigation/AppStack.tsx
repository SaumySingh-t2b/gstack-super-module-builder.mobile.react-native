import React, {useCallback} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {useTheme} from '@ui-kitten/components'

import {commonHeaderStyle} from './components/commonHeaderStyle'
import {DrawerStack} from './DrawerStack'

import type {AppStackParamList} from 'src/types'
import Settings from 'src/screens/settings'
import {ListDetail as ListDetail} from 'src/screens/dashboardDetail'
import {EditProfileScreen} from 'src/screens/profile/EditProfileScreen'
import {DynamicScreen} from 'src/screens/dynamicScreen'
import {useAuthProvider} from 'src/context'
import {HamburgerIcon} from 'src/components'
import {FormsScreen} from 'src/screens/forms'

const Stack = createStackNavigator<AppStackParamList>()

export const STACK_SCREENS = [
  'DashboardDetail',
  'EditProfileScreen',
  'DynamicScreen',
  'Settings',
]

export const AppStack = () => {
  const theme = useTheme()
  const {appMetaData, appScreens} = useAuthProvider()

  // get two screens array like from screens and bottom tabs then map them a/cly
  const renderDynamicScreens = useCallback(() => {
    const filteredScreens = appScreens?.filter(
      (screen) => !STACK_SCREENS.includes(screen.route),
    )
    // TODO fix this
    // ?.filter((screen) => {
    //   // Remove Dashboard screen from this stack if show_bottom_tabs is disabled
    //   // as it will be included in the drawer stack so that drawer is accessible from it
    //   return !appMetaData?.show_bottom_tabs && screen.route != 'Dashboard'
    // })

    const isDrawerVisible = useCallback(
      (route?: string) => {
        console.log(
          'renderDynamicScreens -> route',
          route,
          // include search bar listbuilder
          appMetaData?.bottom_tabs?.map((item) => item.route)?.includes(route),
        )
        if (
          // appMetaData?.show_bottom_tabs &&
          appMetaData?.show_drawer &&
          appMetaData?.bottom_tabs?.map((item) => item.route)?.includes(route)
        ) {
          return true
        }
        return false
      },
      [appMetaData],
    )

    return filteredScreens?.map((screen) => {
      if (screen.route)
        return (
          <Stack.Screen
            key={screen.route}
            name={screen.route as any}
            component={DynamicScreen}
            options={{
              title: screen.title,
              // TODO fix for non bottom tabs screen, will work automatically once FE changes
              // ...(isDrawerVisible(screen.route)
              //   ? {headerLeft: () => <HamburgerIcon theme={theme} />}
              //   : {}),
            }}
          />
        )
    })
  }, [appMetaData, appScreens])

  return (
    <Stack.Navigator screenOptions={commonHeaderStyle(theme)}>
      <Stack.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{headerShown: false}}
      />
      {/* NOTE: screens/stacks where Drawer is NOT accessible */}
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      <Stack.Screen name="ListDetail" component={ListDetail} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="DynamicScreen" component={DynamicScreen} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="FormsScreen"
        component={FormsScreen}
        options={{title: 'Create New'}}
      />
      {/* <Stack.Screen
        component={DynamicScreen}
        name="c86e050b-a2d5-479c-8817-75e8d3c182ed"
        options={{title: 'Account'}}
      /> */}
      {renderDynamicScreens()}
      {/* {console.log('stack--------->', renderDynamicScreens())} */}
    </Stack.Navigator>
  )
}
