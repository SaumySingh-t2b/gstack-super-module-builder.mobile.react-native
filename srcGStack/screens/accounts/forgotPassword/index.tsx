import React, {useCallback, useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {SafeAreaView} from '@react-native-granite/component'
import {EventEmitter, useEventEmitter} from '@react-native-granite/core'
import {Button, Input, Layout, Text} from '@ui-kitten/components'

import {type AuthScreenProps} from 'src/types'
import {AlertUtils} from 'src/utils'
import {AccountsController, AUTH_EVENTS} from 'src/workflow/accounts'

import {STRINGS} from './strings'

// Global constants
const eventEmitter = new EventEmitter()
const controller = new AccountsController(eventEmitter)

export const ForgotPassword = ({
  navigation,
}: AuthScreenProps<'ForgotPassword'>) => {
  const [email, setEmail] = useState('')
  const [emailErrorText, setEmailErrorText] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  useEventEmitter(eventEmitter, (event) => {
    switch (event.type) {
      case AUTH_EVENTS.RESET_PASSWORD.START:
        setIsLoading(true)
        break
      case AUTH_EVENTS.RESET_PASSWORD.SUCCESS:
        setIsLoading(false)
        showSuccessMessage()
        break
      case AUTH_EVENTS.RESET_PASSWORD.FAILURE:
        setIsLoading(false)
        AlertUtils.showAlert(event.data)
        break
      case AUTH_EVENTS.INVALID_INPUT:
        setIsLoading(false)
        setEmailErrorText(event.data)
        break
    }
  })

  const showSuccessMessage = useCallback(() => {
    AlertUtils.showAlert(
      STRINGS.SUCCESS_MESSAGE,
      '',
      [{text: STRINGS.BUTTON_OKAY, onPress: goBack}],
      {cancelable: false},
    )
  }, [])

  const resetPassword = useCallback(() => {
    controller.resetPassword(email)
  }, [email])

  const onEmailChange = useCallback((text: string) => {
    setEmail(text)
    if (text.length === 0) setEmailErrorText(STRINGS.EMPTY_EMAIL)
    else setEmailErrorText('')
  }, [])

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const openSignUpPage = useCallback(() => {
    navigation.replace('Signup')
  }, [navigation])

  return (
    <SafeAreaView>
      <ScrollView centerContent contentContainerStyle={styles.scrollView}>
        <Text style={styles.title} category="h4">
          {STRINGS.FORGOT_TITLE}
        </Text>
        <Input
          style={styles.input}
          placeholder={STRINGS.EMAIL_PLACEHOLDER}
          value={email}
          autoCapitalize="none"
          size="large"
          onChangeText={onEmailChange}
          caption={emailErrorText}
          status={emailErrorText ? 'danger' : 'basic'}
          autoCorrect={false}
        />
        <Button
          style={styles.button}
          size="large"
          disabled={!email || isLoading}
          onPress={resetPassword}>
          {STRINGS.BUTTON_SEND_EMAIL}
        </Button>
        <Text style={styles.returnLogin} onPress={goBack}>
          {STRINGS.RETURN_TO_LOGIN}
        </Text>
      </ScrollView>
      <Layout style={styles.footer}>
        <Text>
          {STRINGS.TEXT_NEW_USER + '  '}
          <Text style={styles.underline} onPress={openSignUpPage}>
            {STRINGS.BUTTON_SIGN_UP}
          </Text>
        </Text>
      </Layout>
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
  input: {
    marginTop: 12,
    marginBottom: 24,
  },
  button: {
    marginVertical: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 8,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  returnLogin: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginVertical: 18,
  },
  underline: {
    textDecorationLine: 'underline',
  },
})
