import {AppTabs} from '@react-native-granite/component-builder'
import {AppStack} from './navigation/AppStack'
import {ModuleBuilderStack} from './navigation/ModuleBuilderStack'
import type {StyleProp, TextStyle} from 'react-native'

import type {StackScreenProps} from '@react-navigation/stack'

import {type User} from './workflow/accounts'
import {AppMetaData, ScreensEntity, UserProfile} from './workflow/profile'

/**
 * Root Navigators
 */
export type RootStackParamList = {
  SplashScreen: undefined
  GStackSplashScreen: undefined
  Auth: undefined
  App: undefined
  GStackAuth: undefined
  GStackApp: undefined
  ModuleBuilder: undefined
}

export type SupportedComponents =
  | 'MapView'
  | 'List'
  | 'FormRenderer'
  | 'ProfileImage'

export type FieldType = 'PHONE' | 'EMAIL' | 'PASSWORD' | 'DEFAULT'

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

  EditProfileScreen: {profile: UserProfile}
  FormsScreen: {entityName: string}

  ListDetail: {id: string | number; metaData?: any; item?: any}
  DynamicScreen: {
    id?: string | number
    // TODO verify it
    metaData?: any
    item?: any
    extraData?: any
  }
}

export type ModuleBuilderStackParamList = {
  DrawerStack: undefined
  BottomStack: undefined
  Dashboard: undefined
  Profile: undefined
  Notifications: undefined
  SettingsStack: undefined
  Settings: undefined
  AppTabs: undefined
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
export type AppSingletonPropss = {
  organisation_id: number
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

  appScreens?: ScreensEntity[]
  setAppScreens: (screens: any[]) => void

  appMetaData?: AppMetaData
  setAppMetaData: (data: any) => void

  onLoadMetaDataSuccess: (data: LoadMetaDataProps) => void
}

export type AuthContextProp = {
  userProfile?: User
  setUserProfile: (userProfile?: User) => void
}
export type AuthContextPropss = {
  setUserProfile: (userProfile?: User) => void
}
export type ThemeContextProps = {
  theme?: {}
  toggleTheme: () => void
}

export enum EnvTypes {
  Prod = 'prod',
  Beta = 'beta',
  Staging = 'staging',
  Test = 'test',
}

export type LoadMetaDataProps = {
  appMetaData: AppMetaData
  screens: ScreensEntity[]
  userProfile?: User
}
