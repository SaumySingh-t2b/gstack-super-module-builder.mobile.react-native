import React, {useCallback, useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {SafeAreaView} from '@react-native-granite/component'
import {EventEmitter, useEventEmitter} from '@react-native-granite/core'
import {Button, CheckBox, Input, Layout, Text} from '@ui-kitten/components'

import {type AuthScreenProps} from './../../../types'
import {AlertUtils, DevUtils} from './../../../utils'
import {AccountsController, AUTH_EVENTS} from './../../../workflow/accounts'

import {STRINGS} from './strings'

const authCreds = DevUtils.getAuthConfigs()

// Global Constants
const eventEmitter = new EventEmitter()
const controller = new AccountsController(eventEmitter)

// Global Variables
let _email = ''

export const SignUp = ({navigation}: AuthScreenProps<'Signup'>) => {
  const [email, setEmail] = useState(authCreds.email || '')
  const [emailErrorText, setEmailErrorText] = useState('')

  const [firstName, setFirstName] = useState('')
  const [firstNameErrorText, setFirstNameErrorText] = useState('')

  const [lastName, setLastName] = useState('')
  const [lastNameErrorText, setLastNameErrorText] = useState('')

  const [password, setPassword] = useState(authCreds.password || '')
  const [passwordErrorText, setPasswordErrorText] = useState('')

  const [termsAccepted, setTermsAccepted] = useState(false)
  const [policyAccepted, setPolicyAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitPress = useCallback(() => {
    controller.signUp({firstName, lastName, email, password})
  }, [firstName, lastName, email, password])

  const onEmailChange = useCallback((text: string) => {
    setEmail(text)
    if (text.length === 0) setEmailErrorText(STRINGS.EMPTY_EMAIL)
    else setEmailErrorText('')
  }, [])

  const onFirstNameChange = useCallback((text: string) => {
    setFirstName(text)
    if (text.length === 0) setFirstNameErrorText(STRINGS.EMPTY_FIRSTNAME)
    else setFirstNameErrorText('')
  }, [])

  const onLastNameChange = useCallback((text: string) => {
    setLastName(text)
    if (text.length === 0) setLastNameErrorText(STRINGS.EMPTY_LASTNAME)
    else setLastNameErrorText('')
  }, [])

  const onPasswordTextChange = useCallback((text: string) => {
    setPassword(text)
    if (text.length === 0) setPasswordErrorText(STRINGS.EMPTY_PASSWORD)
    else setPasswordErrorText('')
  }, [])

  const switchTermsSelection = useCallback((isChecked: boolean) => {
    setTermsAccepted(isChecked)
  }, [])

  const switchPolicySelection = useCallback((isChecked: boolean) => {
    setPolicyAccepted(isChecked)
  }, [])

  _email = email
  const openVerificationPage = useCallback(() => {
    navigation.navigate('Verification', {email: _email})
  }, [navigation])

  useEventEmitter(eventEmitter, (event) => {
    switch (event.type) {
      case AUTH_EVENTS.SIGNUP_ACTION.START:
        setIsLoading(true)
        break
      case AUTH_EVENTS.SIGNUP_ACTION.SUCCESS:
        setIsLoading(false)
        openVerificationPage()
        break
      case AUTH_EVENTS.SIGNUP_ACTION.FAILURE:
        setIsLoading(false)
        AlertUtils.showAlert(event.data)
        break
      case AUTH_EVENTS.INVALID_INPUT:
        setIsLoading(false)
        setEmailErrorText(event.data.emailError)
        setPasswordErrorText(event.data.passwordError)
        break
    }
  })

  return (
    <SafeAreaView>
      <ScrollView centerContent contentContainerStyle={styles.scrollView}>
        <Text style={styles.title} category="h4">
          {STRINGS.SIGNUP_TITLE}
        </Text>
        <Input
          style={styles.input}
          placeholder={STRINGS.EMAIL_PLACEHOLDER}
          value={email}
          size="large"
          onChangeText={onEmailChange}
          autoCapitalize="none"
          keyboardType="email-address"
          status={emailErrorText ? 'danger' : 'basic'}
          caption={emailErrorText}
          autoCorrect={false}
        />
        <Input
          style={styles.input}
          placeholder={STRINGS.FIRSTNAME_PLACEHOLDER}
          value={firstName}
          size="large"
          onChangeText={onFirstNameChange}
          autoCorrect={false}
          status={firstNameErrorText ? 'danger' : 'basic'}
          caption={firstNameErrorText}
        />
        <Input
          style={styles.input}
          placeholder={STRINGS.LASTNAME_PLACEHOLDER}
          size="large"
          value={lastName}
          onChangeText={onLastNameChange}
          autoCorrect={false}
          status={lastNameErrorText ? 'danger' : 'basic'}
          caption={lastNameErrorText}
        />
        <Input
          style={styles.input}
          placeholder={STRINGS.PASSWORD_PLACEHOLDER}
          value={password}
          secureTextEntry
          size="large"
          onChangeText={onPasswordTextChange}
          status={passwordErrorText ? 'danger' : 'basic'}
          caption={passwordErrorText}
          autoCorrect={false}
        />
        <Layout style={styles.hyperlinkWrapper}>
          <CheckBox checked={termsAccepted} onChange={switchTermsSelection} />
          <Text style={styles.hyperlink}>
            {STRINGS.TEXT_TERMS_AND_CONDITIONS}
          </Text>
        </Layout>
        <Layout style={styles.hyperlinkWrapper}>
          <CheckBox checked={policyAccepted} onChange={switchPolicySelection} />
          <Text style={styles.hyperlink}>{STRINGS.TEXT_PRIVACY_POLICY}</Text>
        </Layout>
        <Button
          style={styles.button}
          onPress={onSubmitPress}
          size="large"
          disabled={
            !email ||
            !firstName ||
            !lastName ||
            !password ||
            !termsAccepted ||
            !policyAccepted ||
            isLoading
          }>
          {STRINGS.BUTTON_SUBMIT}
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
  input: {
    marginVertical: 12,
  },
  button: {
    marginTop: 24,
    marginBottom: 12,
  },
  hyperlink: {
    marginHorizontal: 8,
    textDecorationLine: 'underline',
  },
  hyperlinkWrapper: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingVertical: 6,
  },
})
