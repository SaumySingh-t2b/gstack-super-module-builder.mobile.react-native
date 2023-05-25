import Config from 'react-native-config'
console.log('Config', Config)

import {AppSingletonPropss, type AppSingletonProps} from 'src/types'
import {APP_STRINGS} from './strings'

export {APP_STRINGS}

export enum STORAGE_KEYS {
  AUTH_TOKEN = 'AUTH_TOKEN',
  USER_ID = 'USER_ID',
  CURRENT_ENV = 'CURRENT_ENV',
}

// TODO demo
const PROJECT_CODE = 'PRJ95B5EF' || 'prj94c82b'
const ENV = 'development'
// `https://${PROJECT_CODE}-api-${ENV}.granitestack.io/`
export const ENDPOINTS = {
  API_END_POINT: 'https://api-test.granitestack.com/' || Config.API_END_POINT,
  G_STACK_END_POINT: 'https://api-test.granitestack.com/',
}

export const SECRET_KEYS = {
  // TODO demo
  CLIENT_ID: Config.CLIENT_ID,
  BUGSEE_ANDROID_TOKEN: Config.BUGSEE_ANDROID_TOKEN,
  BUGSEE_IOS_TOKEN: Config.BUGSEE_IOS_TOKEN,
  GOOGLE_API_KEY: Config.GOOGLE_API_KEY,
}

export const AppSingleton: AppSingletonPropss = {
  organisation_id: 0,
}

export const ENVIRONMENT = ['prod', 'beta', 'staging', 'test']
