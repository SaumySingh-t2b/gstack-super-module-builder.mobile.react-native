import {createDrawerNavigator} from '@react-navigation/drawer'
import {useTheme} from '@ui-kitten/components'

import type {AppStackParamList} from 'src/types'
import CustomDrawer from './components/CustomDrawer'
import BottomTabs from './BottomTabs'
import {useAuthProvider} from 'src/context'
import {DynamicScreen} from 'src/screens/dynamicScreen'
import {commonHeaderStyle} from 'src/navigation/components/commonHeaderStyle'
import {HamburgerIcon} from 'src/components'
import {useCallback} from 'react'

// Global constants
const Drawer = createDrawerNavigator<AppStackParamList>()

export const DrawerStack = () => {
  const theme = useTheme()

  const {appMetaData} = useAuthProvider()

  const renderDynamicScreens = useCallback(() => {
    return (
      !appMetaData?.show_bottom_tabs && (
        <Drawer.Screen
          name={'Dashboard'}
          component={DynamicScreen}
          // @ts-ignore
          options={{
            title: 'Dashboard',
            headerShown: true,
            ...commonHeaderStyle(theme),
            headerLeft: () =>
              appMetaData?.show_drawer ? <HamburgerIcon theme={theme} /> : null,
          }}
        />
      )
    )
  }, [appMetaData])

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        gestureHandlerProps: {
          enabled: !!appMetaData?.show_drawer,
        },
      }}
      drawerContent={(props) =>
        appMetaData?.show_drawer ? <CustomDrawer {...props} /> : null
      }>
      <Drawer.Screen name="BottomStack" component={BottomTabs} />
      {renderDynamicScreens()}
    </Drawer.Navigator>
  )
}
