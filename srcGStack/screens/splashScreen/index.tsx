import React from 'react'
import {Image, StyleSheet} from 'react-native'

import {SafeAreaView} from '@react-native-granite/component'
import {LocalStorage, Networking} from '@react-native-granite/core'
import {Layout} from '@ui-kitten/components'

import appLogo from 'src/assets/images/appLogo.png'
import {ENDPOINTS, STORAGE_KEYS} from './../../constants'
import {type RootScreenProps} from 'src/types'
import {AuthUtil, getNetworkInterceptor, StringUtils} from './../../utils'

export const GStackSplashScreen = ({
  navigation,
}: RootScreenProps<'GStackSplashScreen'>) => {
  const init = async () => {
    const token = await LocalStorage.get(STORAGE_KEYS.AUTH_TOKEN)
    console.log('token-------->', token)
    const currentEnv = await LocalStorage.get(STORAGE_KEYS.CURRENT_ENV)
    const interceptor = getNetworkInterceptor()
    if (currentEnv) {
      ENDPOINTS.API_END_POINT = StringUtils.getApiEndPoint(currentEnv)
    }
    Networking.configure(ENDPOINTS.API_END_POINT ?? '', interceptor)
    if (token) {
      // console.log('Token ----------------->', token)
      navigation.replace('GStackApp')
    } else {
      navigation.replace('GStackAuth')
    }
  }

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
    alignSelf: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
})
