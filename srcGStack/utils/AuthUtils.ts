import {LocalStorage} from '@react-native-granite/core'
import {getDeviceInfo} from '@react-native-granite/device-info'

import {AppSingleton, STORAGE_KEYS} from './../constants'
import {type AuthProps} from 'src/types'

let auth: AuthProps = {
  token: null,
  userId: 0,
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthUtil {
  static loadAuthToken = async () => {
    const authToken = await LocalStorage.get(STORAGE_KEYS.AUTH_TOKEN)
    const userId = await LocalStorage.get(STORAGE_KEYS.USER_ID)
    auth.token = authToken
    auth.userId = userId

    try {
      AppSingleton.deviceInfo = await getDeviceInfo()
    } catch (error) {
      console.log('AuthUtil -> staticloadAuthToken -> error', error)
    }
    return authToken
  }

  static getAuthToken = () => {
    return auth.token
  }

  static get authToken() {
    return auth.token
  }

  static setAuthToken = async (authToken: string) => {
    await LocalStorage.set(STORAGE_KEYS.AUTH_TOKEN, authToken ?? '')
    auth.token = authToken
  }

  static resetAuthToken = async () => {
    auth.token = null
    auth.userId = 0
  }

  static getProperty = (key: keyof AuthProps) => {
    return auth[key]
  }

  static setProperty = async (
    key: keyof AuthProps,
    value: string,
    saveToStorage = true,
  ) => {
    if (saveToStorage) {
      await LocalStorage.set(STORAGE_KEYS.AUTH_TOKEN, value ?? '')
    }
    auth = {
      ...auth,
      [key]: value,
    }
  }
}
