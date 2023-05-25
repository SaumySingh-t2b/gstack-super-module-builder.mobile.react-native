import {Alert, ScrollView, StyleSheet} from 'react-native'
import React, {useCallback, useLayoutEffect, useState} from 'react'
import {Button, Text} from '@ui-kitten/components'
import {EmptyItem, SafeAreaView} from '@react-native-granite/component'

import type {AppScreenProps} from 'src/types'
import {STRINGS} from './strings'
import {EventEmitter, Router, useEventEmitter} from '@react-native-granite/core'
import {ProfileController, PROFILE_EVENTS} from 'src/workflow/profile'
import {AlertUtils} from 'src/utils'
import {useAuthProvider} from 'src/context'

// Global constants

const eventEmitter = new EventEmitter()
const controller = new ProfileController(eventEmitter)

const Settings = ({navigation}: AppScreenProps<'Settings'>) => {
  const [isLoading, setIsLoading] = useState(false)

  const {setUserProfile} = useAuthProvider()

  useEventEmitter(eventEmitter, (event) => {
    switch (event.type) {
      case PROFILE_EVENTS.DELETE_ACCOUNT_START:
        setIsLoading(true)
        break
      case PROFILE_EVENTS.DELETE_ACCOUNT_SUCCESS:
        setIsLoading(false)
        setUserProfile(undefined)
        Router.replace('App')
        break
      case PROFILE_EVENTS.DELETE_ACCOUNT_FAILURE:
        setIsLoading(false)
        AlertUtils.showAlert(event.data)
        break
    }
  })

  const onDeleteAccountPress = useCallback(() => {
    AlertUtils.showAlert(STRINGS.DELETE_ACCOUNT_CONFIRMATION, 'Warning', [
      {
        text: STRINGS.BUTTON_NO,
      },
      {
        text: STRINGS.BUTTON_YES,
        onPress: async () => {
          await controller.deleteAccount()
        },
      },
    ])
  }, [])

  return (
    <SafeAreaView>
      <ScrollView></ScrollView>
      <Button
        size="tiny"
        style={styles.deleteButton}
        status={'danger'}
        onPress={onDeleteAccountPress}>
        {STRINGS.DELETE_ACCOUNT}
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  deleteButton: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 8,
  },
})

export default Settings
