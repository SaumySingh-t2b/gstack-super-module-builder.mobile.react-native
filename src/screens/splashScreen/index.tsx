import React, {useLayoutEffect} from 'react'
import {StyleSheet, Image} from 'react-native'
import {Layout} from '@ui-kitten/components'
import {
  EventEmitter,
  GraniteApp,
  LocalStorage,
  Networking,
  useEventEmitter,
} from '@react-native-granite/core'
import {SafeAreaView} from '@react-native-granite/component'

import appLogo from 'src/assets/images/appLogo.png'

import type {RootScreenProps} from 'src/types'
import {ENDPOINTS, STORAGE_KEYS} from 'src/constants'
import {ProfileController, PROFILE_EVENTS} from 'src/workflow/profile'
import {AuthUtil, getNetworkInterceptor} from 'src/utils'
import {ThemeContext, useAuthProvider} from 'src/context'
import {AccountsController} from 'src/workflow/accounts'

const emitter = new EventEmitter()
const controller = new ProfileController(emitter)
const accountsController = new AccountsController(emitter)

export const SplashScreen = ({navigation}: RootScreenProps<'SplashScreen'>) => {
  const {onLoadMetaDataSuccess} = useAuthProvider()

  const init = async () => {
    const currentEnv = await LocalStorage.get(STORAGE_KEYS.CURRENT_ENV)
    await accountsController.switchEnvironment(currentEnv)
    Networking.configure(ENDPOINTS.API_END_POINT!, getNetworkInterceptor())

    // await GraniteApp.logout()
    const token = await AuthUtil.loadAuthToken()
    console.log('init -> token', token)

    if (token) {
      controller.loadInitialData()
    } else navigation.replace('Auth')
  }

  const themeContext = React.useContext(ThemeContext)
  useLayoutEffect(() => {
    themeContext.toggleTheme()
  }, [])

  useEventEmitter(emitter, (event) => {
    switch (event.type) {
      case PROFILE_EVENTS.LOAD_INITIAL_DATA_SUCCESS:
        console.log('event.datafkdjgkjs---------->', JSON.stringify(event.data))
        onLoadMetaDataSuccess(event.data)
        navigation.replace('App')
    }
  })

  React.useEffect(() => {
    init()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        <Image resizeMode="center" style={styles.image} source={appLogo} />
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
})
