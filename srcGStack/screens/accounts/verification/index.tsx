import React, {useCallback, useState} from 'react'
import {Alert, ScrollView, StyleSheet} from 'react-native'

import {SafeAreaView} from '@react-native-granite/component'
import {EventEmitter, useEventEmitter} from '@react-native-granite/core'
import {Button, Input, Text} from '@ui-kitten/components'

import {type AuthScreenProps} from './../../../types'
import {AlertUtils} from './../../../utils'
import {AccountsController, AUTH_EVENTS} from './../../../workflow/accounts'

import {STRINGS} from './strings'

// Global constants
const eventEmitter = new EventEmitter()
const controller = new AccountsController(eventEmitter)

export const Verification = ({
  navigation,
  route,
}: AuthScreenProps<'Verification'>) => {
  const {email} = route.params
  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEventEmitter(eventEmitter, (event) => {
    switch (event.type) {
      case AUTH_EVENTS.VERIFICATION_ACTION.START:
        setIsLoading(true)
        break
      case AUTH_EVENTS.VERIFICATION_ACTION.SUCCESS:
        setIsLoading(false)
        navigateToLogin()
        break
      case AUTH_EVENTS.VERIFICATION_ACTION.FAILURE:
        setIsLoading(false)
        AlertUtils.showAlert(event.data)
        break

      case AUTH_EVENTS.RESEND_TOKEN.START:
        setIsLoading(true)
        break
      case AUTH_EVENTS.RESEND_TOKEN.SUCCESS:
        setIsLoading(false)
        AlertUtils.showAlert(STRINGS.TOKEN_SENT_SUCCESSFULLY)
        break
      case AUTH_EVENTS.RESEND_TOKEN.FAILURE:
        setIsLoading(false)
        AlertUtils.showAlert(event.data)
        break
    }
  })

  const navigateToLogin = useCallback(() => {
    Alert.alert(
      '',
      STRINGS.SUCCESS_MESSAGE,
      [
        {
          text: STRINGS.CONTINUE,
          onPress: () => {
            navigation.navigate('Login')
          },
        },
      ],
      {cancelable: false},
    )
  }, [navigation])

  const verify = useCallback(() => {
    controller.verifyToken(email, token)
  }, [email, token])

  const resendToken = useCallback(() => {
    controller.resendToken(email)
  }, [email])

  const onTokenChange = useCallback((text: string) => {
    setToken(text)
  }, [])

  return (
    <SafeAreaView>
      <ScrollView centerContent contentContainerStyle={styles.scrollView}>
        <Text style={styles.title} category="h4">
          {STRINGS.VERIFICATION_TITLE}
        </Text>
        <Text style={styles.subTitle} category="s1">
          {`${STRINGS.VERIFICATION_MESSAGE} ${email}`}
        </Text>
        <Input
          style={styles.input}
          placeholder={STRINGS.TOKEN_PLACEHOLDER}
          value={token}
          size="large"
          onChangeText={onTokenChange}
        />
        <Button
          style={styles.button}
          size="large"
          disabled={!token || isLoading}
          onPress={verify}>
          {STRINGS.BUTTON_VERIFY}
        </Button>
        <Button
          style={styles.button}
          size="large"
          disabled={isLoading}
          onPress={resendToken}>
          {STRINGS.BUTTON_RESEND}
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    marginVertical: 18,
    textAlign: 'center',
  },
  subTitle: {
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    marginTop: 12,
    marginBottom: 24,
  },
  button: {
    marginVertical: 8,
  },
})
