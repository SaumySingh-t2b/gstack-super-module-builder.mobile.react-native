import React, {useCallback, useEffect, useRef, useState} from 'react'
import {ActivityIndicator, AppState, type AppStateStatus} from 'react-native'

import {type FirebaseMessagingTypes} from '@react-native-firebase/messaging'
import {
  globalEmitter,
  Notification,
  useAppState,
  useEventEmitter,
} from '@react-native-granite/core'

import {useAuthProvider} from 'src/context'

let timeoutId: any

export const PushNotificationHandler = () => {
  const {userProfile} = useAuthProvider()

  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notificationMessage, setNotificationMessage] = useState('')

  const appState = useAppState()
  const appStateRef = useRef<AppStateStatus>(AppState.currentState)

  const getToken = async () => {
    const token = await Notification.getFcmToken()
    console.log('token', token)
  }

  const onNotificationReceive = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    onPress?: boolean,
  ) => {
    console.log('NOTIFICATION RECEIVED')
    setNotificationMessage(remoteMessage?.notification?.body ?? '')
    handlePushNotification(remoteMessage.data, onPress)
  }

  const showLoader = useCallback(() => {
    setIsLoading(true)
  }, [])

  const hideLoader = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handlePushNotification = useCallback(
    (message: any, onPress?: boolean) => {
      showLoader()
      if (!message.m_body) {
        return
      }
      hideLoader()
    },
    [userProfile],
  )

  useEffect(() => {
    appStateRef.current = appState
  }, [appState])

  useEffect(() => {
    getToken()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  useEventEmitter(globalEmitter, (event) => {
    switch (event.type) {
      case 'NEW_NOTIFICATION':
        console.log('NotificationService -> NEW_NOTIFICATION')
        onNotificationReceive(event.data)
        break
      case 'NOTIFICATION_PRESS':
        console.log('NotificationService -> NEW_NOTIFICATION')
        onNotificationReceive(event.data, true)
        break
    }
  })

  return <>{isLoading && <ActivityIndicator />}</>
}
