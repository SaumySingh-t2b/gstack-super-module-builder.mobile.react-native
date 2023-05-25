import React, {useCallback, useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {SafeAreaView} from '@react-native-granite/component'
import {EventEmitter, Router, useEventEmitter} from '@react-native-granite/core'
import {Button} from '@ui-kitten/components'

import {useAuthProvider} from 'src/context'
import type {AppScreenProps} from 'src/types'
import {AlertUtils} from 'src/utils'
import {PROFILE_EVENTS, ProfileController} from 'src/workflow/profile'

import {STRINGS} from './strings'

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
        onPress: () => {
          controller.deleteAccount()
        },
      },
    ])
  }, [])

  return (
    <SafeAreaView>
      <ScrollView></ScrollView>
      {isLoading && <></>}
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
  },
})

export default Settings
