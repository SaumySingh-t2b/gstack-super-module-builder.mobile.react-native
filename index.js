/**
 * @format
 */

import {LogBox} from 'react-native'

import {GraniteApp} from '@react-native-granite/core'

import {onNewToken, onOpenNotification, onReceiveNotification} from 'src/misc'

import {name as appName} from './app.json'
import App from './src/App'

LogBox.ignoreAllLogs()

GraniteApp.registerComponent(appName, App, {
  onNewToken,
  onReceiveNotification,
  onOpenNotification,
})
