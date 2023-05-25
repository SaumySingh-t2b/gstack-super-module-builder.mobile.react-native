import {LocalStorage, type Interceptor} from '@react-native-granite/core'

import {AppSingleton, SECRET_KEYS} from './../constants'

import {AuthUtil} from './AuthUtils'

let isShowing = false

export const getNetworkInterceptor = (
  onDonePress?: () => Promise<void>,
): Interceptor => {
  return {
    requestHeaders: () => {
      let headers: any = {
        mobile: true,
        client: SECRET_KEYS.CLIENT_ID,
        // Extra data related to device
        'Device-Model': AppSingleton.deviceInfo.deviceModel,
        'Device-Name': AppSingleton.deviceInfo.deviceName,
        'Device-OS': AppSingleton.deviceInfo.deviceOS,
        'OS-Version': AppSingleton.deviceInfo.osVersion,
        'App-Version': AppSingleton.deviceInfo.appVersion,
      }
      const authToken = AuthUtil.getAuthToken()

      if (authToken) {
        headers = {
          ...headers,
          Authorization: `Bearer ${authToken}`,
          organisation: '176',
        }
      }
      // console.log('Gstack Header--------------->', headers)
      return headers
    },

    requestInterceptor: (request, error) => {
      return request
    },
    responseInterceptor: (response, error) => {
      const status = error?.response?.status
      if (status === 401 && !isShowing) {
        isShowing = true
        // Alert.alert(
        //   'Info',
        //   '401 Auth Error.',
        //   [
        //     {
        //       text: 'OK',
        //       onPress: async () => {
        //         await onDonePress()
        //         isShowing = false
        //       },
        //     },
        //   ],
        //   {cancelable: false},
        // )
      }
    },
  }
}
