import React, {useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {SafeAreaView} from '@react-native-granite/component'
import {GraniteApp, LocalStorage, Router} from '@react-native-granite/core'
import {
  type DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer'
import {Layout, Text, useTheme} from '@ui-kitten/components'
import DeviceInfo from 'react-native-device-info'
import Icon from 'react-native-vector-icons/Ionicons'

import {APP_STRINGS, STORAGE_KEYS} from './../../constants'
import {AlertUtils} from './../../utils'

import {STRINGS} from '../strings'

// global constants
const STACK = ['Settings', 'Logout']

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const theme = useTheme()
  const [focussedStack, setFocussedStack] = useState(-1)

  const onDrawerItemPress = async (stack: string) => {
    if (stack === 'Logout') {
      onLogOutPress()
      return
    }
    setFocussedStack(STACK.indexOf(stack))
    Router.toggleDrawer()
    Router.navigate(stack)
  }

  const onLogOutPress = () => {
    AlertUtils.showAlert(STRINGS.LOGOUT_CONFIRMATION, APP_STRINGS.APP_NAME, [
      {
        text: APP_STRINGS.CANCEL,
      },
      {
        text: APP_STRINGS.LOGOUT,
        onPress: async () => {
          console.log('logout')
          await LocalStorage.set(STORAGE_KEYS.AUTH_TOKEN, null)
          // await GraniteApp.logout()
          Router.replace('GStackSplashScreen')
        },
      },
    ])
  }

  const renderDrawerLabel = (isFocussed: boolean, label: string) => (
    <Text
      style={[
        styles.drawerItem,
        isFocussed && {
          color: theme['color-primary-800'],
        },
      ]}>
      {label}
    </Text>
  )

  return (
    <SafeAreaView>
      <ScrollView>
        <DrawerItem
          label={() => renderDrawerLabel(focussedStack === 0, STACK[0])}
          icon={() => <Icon name="ios-settings-sharp" size={25} />}
          onPress={() => {
            onDrawerItemPress(STACK[0])
          }}
        />
        <DrawerItem
          label={() => renderDrawerLabel(focussedStack === 1, STACK[1])}
          icon={() => <Icon name="log-out-outline" size={25} />}
          onPress={() => {
            onDrawerItemPress(STACK[1])
          }}
        />
      </ScrollView>
      <Layout style={styles.separator} />
      <Layout style={styles.footerItem}>
        <Text style={styles.footerText}>{DeviceInfo.getApplicationName()}</Text>
        <Text style={styles.footerSubText}>
          {STRINGS.APP_INFO_FOOTER_TEXT(
            DeviceInfo.getVersion(),
            DeviceInfo.getBuildNumber(),
          )}
        </Text>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  footerText: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: '700',
  },

  footerSubText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 4,
  },

  footerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#d3d3d3',
  },

  drawerItem: {
    fontWeight: 'bold',
  },
})

export default CustomDrawer
