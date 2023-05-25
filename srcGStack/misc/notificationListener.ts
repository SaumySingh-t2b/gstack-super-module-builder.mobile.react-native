import {type FirebaseMessagingTypes} from '@react-native-firebase/messaging'

export const onNewToken = (token: string) => {
  console.log('onNewToken -> token', token)
}

export const onReceiveNotification = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  console.log('onReceiveNotification -> remoteMessage', remoteMessage)
}

export const onOpenNotification = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  console.log('onOpenNotification -> remoteMessage', remoteMessage)
}
