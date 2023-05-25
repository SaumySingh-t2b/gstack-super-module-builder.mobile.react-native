import Config from 'react-native-config'

import {type AppSingletonProps} from 'src/types'

import {APP_STRINGS} from './strings'

export {APP_STRINGS}

export enum STORAGE_KEYS {
  AUTH_TOKEN = 'GSTACK_AUTH_TOKEN',
  USER_ID = 'GSTACK__ID',
  CURRENT_ENV = 'GSTACK__ENV',
}

export const ENDPOINTS = {
  API_END_POINT: Config.API_END_POINT,
}

export const SECRET_KEYS = {
  CLIENT_ID: Config.CLIENT_ID,
  BUGSEE_ANDROID_TOKEN: Config.BUGSEE_ANDROID_TOKEN,
  BUGSEE_IOS_TOKEN: Config.BUGSEE_IOS_TOKEN,
  GOOGLE_API_KEY: Config.GOOGLE_API_KEY,
}

export const AppSingleton: AppSingletonProps = {
  organisationId: 0,
  deviceInfo: {},
}

export const ENVIRONMENT = ['prod', 'beta', 'staging', 'test']
