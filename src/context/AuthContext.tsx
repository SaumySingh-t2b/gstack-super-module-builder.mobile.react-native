import React, {useCallback, useState} from 'react'
import {plainToClass} from 'class-transformer'

import {User} from '../workflow/accounts'
import type {AuthContextProps, LoadMetaDataProps} from 'src/types'
import {Networking, Router} from '@react-native-granite/core'
import {AppMetaData, AppScreens, ScreensEntity} from 'src/workflow/profile'
import {appMetaData} from 'src/workflow/profile/data.json'
import {getNetworkInterceptor} from 'src/utils'
import {ENDPOINTS} from 'src/constants'

export const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps,
)

export const AuthProvider: React.FC<{}> = ({children}) => {
  const [userProfile, setUserProfile] = useState<User>()
  const [appMetaData, setAppMetaData] = useState<AppMetaData>()
  const [appScreens, setAppScreens] = useState<ScreensEntity[]>()

  const onLoadMetaDataSuccess = useCallback(
    async ({appMetaData, screens, userProfile}: LoadMetaDataProps) => {
      setAppMetaData(appMetaData)
      console.log('appMetaData------r', appMetaData.show_bottom_tabs)
      setAppScreens(screens)
      setUserProfile(userProfile)
      // Networking.configure(appMetaData.base_url, getNetworkInterceptor())
      // Networking.configure(ENDPOINTS.API_END_POINT!, getNetworkInterceptor())
      // await init()
      if (appMetaData.show_bottom_tabs) {
        console.log(
          'appMetaData.show_bottom_tabs',
          appMetaData.show_bottom_tabs,
        )
        Router.replace('App', {
          screen: 'DrawerStack',
        })
      } else {
        console.log('App========')
        Router.replace('App', {
          screen: 'DrawerStack',
          params: {
            screen: 'Dashboard',
          },
        })
      }
    },
    [],
  )

  const authActions: AuthContextProps = {
    userProfile,
    setUserProfile: (profile) => {
      setUserProfile(plainToClass(User, profile))
    },
    appScreens,
    setAppScreens: (screens) => {
      setAppScreens(screens)
    },
    appMetaData,
    setAppMetaData: (metaData) => {
      setAppMetaData(metaData)
    },
    onLoadMetaDataSuccess: (data: LoadMetaDataProps) =>
      onLoadMetaDataSuccess(data),
  }

  return (
    <AuthContext.Provider value={authActions}>{children}</AuthContext.Provider>
  )
}

export const useAuthProvider = () => React.useContext(AuthContext)
