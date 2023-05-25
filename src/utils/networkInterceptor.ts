import {GraniteApp, Router, type Interceptor} from '@react-native-granite/core'

import {AppSingleton, SECRET_KEYS} from 'src/constants'
import {AuthUtil} from './AuthUtils'

let isShowing = false

export const getNetworkInterceptor = (
  onDonePress?: () => Promise<void>,
): Interceptor => {
  return {
    requestHeaders: () => {
      let headers: any = {
        mobile: true,
        ['User-Agent']: 'ANDROID',
        client: SECRET_KEYS.CLIENT_ID,
      }
      const authToken = AuthUtil.getAuthToken()
      if (authToken) {
        headers = {
          ...headers,
          Authorization: `Bearer ${authToken}`,
          organisation: '176',
          // TODO add organisation id setter on login and splash screen
          ...(AppSingleton.organisation_id && {
            organisation: AppSingleton.organisation_id,
          }),
        }
      }
      console.log('src Header--------------->', headers)

      return headers
    },

    requestInterceptor: (request, error) => {
      return request
    },
    responseInterceptor: async (response, error) => {
      const logout = async () => {
        await GraniteApp.logout()
        Router.replace('Auth')
      }
      if (__DEV__ && error) {
        // logout()
      }
      const status = error?.response?.status
      if (status === 401 && !isShowing) {
        isShowing = true
        logout()
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
