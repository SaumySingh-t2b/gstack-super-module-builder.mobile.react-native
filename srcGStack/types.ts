import type {StyleProp, TextStyle} from 'react-native'

import type {StackScreenProps} from '@react-navigation/stack'

import {type User} from './workflow/accounts'

/**
 * Root Navigators
 */
export type RootStackParamList = {
  SplashScreen: undefined
  Auth: undefined
  App: undefined
}

export type ModalContainerProps = {
  children: React.ReactNode
  visible: boolean
  containerStyle?: StyleProp<TextStyle>
}

export type RadioButtonProps = {
  setShowRadioButton: (showRadioButton: boolean) => void
  showRadioButton?: boolean
}

export type RootScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>

/**
 * Auth Screens
 */
export type AuthStackParamList = {
  Login: undefined
  Signup: undefined
  ForgotPassword: undefined
  Verification: {email: string}
}

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>

/**
 * App Screens
 */
export type AppStackParamList = {
  DrawerStack: undefined
  BottomStack: undefined
  Dashboard: undefined
  Profile: undefined
  Notifications: undefined
  SettingsStack: undefined
  Settings: undefined
}

/**
 * App Screens
 */
export type BottomStackParamList = {
  BottomStack: undefined
}

/**
 * App Screens
 */
export type SettingStackParamList = {
  Settings: undefined
}

/**
 * App Screens
 */
export type BottomTabsParamList = {
  Dashboard: undefined
  Profile: undefined
  Notifications: undefined
}

export type AppScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>

/**
 * Constants
 */

export type ID = string | number

export type AppSingletonProps = {
  organisationId: number
  deviceInfo: any
}

export type AuthProps = {
  token?: string | null
  userId: ID
}

/**
 * -----Start of Context Props-----
 */

export type AuthContextProps = {
  userProfile?: User
  setUserProfile: (userProfile?: User) => void
}

export enum EnvTypes {
  Prod = 'prod',
  Beta = 'beta',
  Staging = 'staging',
  Test = 'test',
}
