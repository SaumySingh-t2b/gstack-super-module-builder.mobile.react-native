import React, {useContext, useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Layout, Text, useTheme} from '@ui-kitten/components'
import {
  DrawerItem,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer'
import DeviceInfo from 'react-native-device-info'
import Icon from 'react-native-vector-icons/Ionicons'

import {GraniteApp, LocalStorage, Router} from '@react-native-granite/core'
import {SafeAreaView} from '@react-native-granite/component'

import {STRINGS} from '../strings'
import {AlertUtils, AuthUtil} from 'src/utils'
import {APP_STRINGS, STORAGE_KEYS} from 'src/constants'
import {ThemeContext, useAuthProvider} from 'src/context'
import {ListItem} from 'src/components'
import {UserProfile} from 'src/workflow/profile'

// global constants
const STACK = [
  // {
  //   name: 'Settings',
  //   icon: 'ios-settings-sharp',
  // },
  {
    name: 'Logout',
    icon: 'log-out-outline',
  },
]

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const {userProfile, appScreens} = useAuthProvider()
  const theme = useTheme()
  const themeContext = useContext(ThemeContext)
  const onDrawerItemPress = async (stack: string) => {
    console.log('onDrawerItemPress -> stack', stack)
    if (stack == 'Logout') {
      onLogOutPress()
      return
    } else if (stack == 'SplashScreen') {
      Router.toggleDrawer()
      Router.replace(stack)
    }
    Router.toggleDrawer()
    Router.navigate('App', {
      screen: stack,
    })
  }

  const onLogOutPress = () => {
    AlertUtils.showAlert(STRINGS.LOGOUT_CONFIRMATION, APP_STRINGS.APP_NAME, [
      {
        text: APP_STRINGS.CANCEL,
      },
      {
        text: APP_STRINGS.LOGOUT,
        onPress: async () => {
          await LocalStorage.set(STORAGE_KEYS.AUTH_TOKEN, null)
          Router.replace('GStackApp')
          themeContext.toggleTheme()
        },
      },
    ])
  }

  const renderDrawerLabel = (label: string) => (
    <Text style={[styles.drawerItem]}>{label}</Text>
  )
  // console.log('CustomDrawer -> userProfile', userProfile)

  return (
    <SafeAreaView>
      <ScrollView>
        {/* TODO: Simplify this itemMapping */}
        <ListItem
          index={0}
          containerStyle={styles.header}
          item={userProfile}
          itemMapping={{
            title: '.first_name',
            subtitle: '.email',
            imageUrl: '.profile_image',
          }}
          onItemPress={() => Router.navigate('Profile')}
        />
        {STACK?.filter((screen) => screen.name != 'Logout')?.map((screen) => (
          <DrawerItem
            key={screen.name}
            icon={() =>
              screen.icon ? <Icon name={screen.icon} size={25} /> : null
            }
            label={() => renderDrawerLabel(screen.name)}
            onPress={() => onDrawerItemPress(screen.name)}
          />
        ))}
        {appScreens
          ?.filter((screen) => !!screen.show_on_drawer)
          ?.map((screen) => (
            <DrawerItem
              key={screen.route}
              label={() => renderDrawerLabel(screen.title)}
              onPress={() => onDrawerItemPress(screen.route)}
            />
          ))}

        {[STACK[STACK.length - 1]]?.map((screen) => (
          <DrawerItem
            key={screen.name}
            icon={() =>
              screen.icon ? <Icon name={screen.icon} size={25} /> : null
            }
            label={() => renderDrawerLabel(screen.name)}
            onPress={() => onDrawerItemPress(screen.name)}
          />
        ))}
      </ScrollView>
      {/* <DrawerItem
        label={() => renderDrawerLabel('Reload')}
        onPress={() => onDrawerItemPress('SplashScreen')}
      /> */}
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
  header: {
    paddingVertical: 12,
  },
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
