import React, {useCallback, useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {HeaderIcon, SafeAreaView} from '@react-native-granite/component'
import {EventEmitter, Router, useEventEmitter} from '@react-native-granite/core'
import {Button, Input, Layout, Text, useTheme} from '@ui-kitten/components'
import Icon from 'react-native-vector-icons/Ionicons'

import {EnvironmentSelectModal} from './../../../components'
import {type AuthScreenProps} from './../../../types'
import {AlertUtils, DevUtils} from './../../../utils'
import {AccountsController, AUTH_EVENTS} from './../../../workflow/accounts'

import {STRINGS} from './strings'
import {allowedDomainList as ALLOWED_DOMAINS} from '../../../../allowedDomainList.json'

const authCreds = DevUtils.getAuthConfigs()

// Global Constants
const eventEmitter = new EventEmitter()
const controller = new AccountsController(eventEmitter)

export const Login = ({navigation}: AuthScreenProps<'Login'>) => {
  const [email, setEmail] = useState(
    authCreds.email || 'saumy.singh@thoughts2binary.com',
  )
  const [password, setPassword] = useState(authCreds.password || 'Pass1234')
  const [emailErrorText, setEmailErrorText] = useState('')
  const [passwordErrorText, setPasswordErrorText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSettingsIcon, setShowSettingsIcon] = useState(false)
  const [showEnvModal, setShowEnvModal] = useState(false)

  const theme = useTheme()

  const onLoginPress = useCallback(() => {
    controller.login(email, password)
    // Router.replace('GStackApp')
  }, [email, password])

  const openSignUpPage = useCallback(() => {
    navigation.navigate('Signup')
  }, [navigation])

  const openForgotPasswordPage = useCallback(() => {
    navigation.navigate('ForgotPassword')
  }, [navigation])

  const onEmailTextChange = useCallback((text: string) => {
    setEmail(text)
    if (text.length === 0) setEmailErrorText(STRINGS.EMPTY_EMAIL)
    else setEmailErrorText('')
  }, [])

  const onPasswordTextChange = useCallback((text: string) => {
    setPassword(text)
    if (text.length === 0) setPasswordErrorText(STRINGS.EMPTY_PASSWORD)
    else setPasswordErrorText('')
  }, [])

  const onBlurResult = (username: string) => {
    console.log('onBlurResult -> onBlurResult', onBlurResult)
    if (__DEV__) {
      setShowSettingsIcon(true)
    }
    const domain = username.split('@')[1]
    const allowedDomains = ALLOWED_DOMAINS.includes(domain)
    if (allowedDomains) {
      setShowSettingsIcon(true)
      return
    }
    if (!username) {
      setEmailErrorText(STRINGS.EMPTY_EMAIL)
    }
  }

  useEventEmitter(eventEmitter, (event) => {
    switch (event.type) {
      case AUTH_EVENTS.LOGIN_ACTION.START:
        setIsLoading(true)
        break
      case AUTH_EVENTS.LOGIN_ACTION.SUCCESS:
        setIsLoading(false)
        Router.replace('GStackApp')
        break
      case AUTH_EVENTS.LOGIN_ACTION.FAILURE:
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
    <SafeAreaView style={styles.safeAreaView}>
      {showSettingsIcon && (
        <HeaderIcon
          containerStyle={styles.settings}
          onPress={() => {
            setShowEnvModal(true)
          }}
          Icon={
            <Icon
              style={styles.settingIcon}
              name="ios-settings-sharp"
              size={25}
              color={theme['color-basic-400']}
            />
          }
        />
      )}
      <ScrollView centerContent contentContainerStyle={styles.scrollView}>
        <Text style={styles.title} category="h4">
          {'Super App'}
        </Text>
        <Text style={styles.title} category="h4">
          {STRINGS.LOGIN_TITLE}
        </Text>
        <Input
          style={styles.input}
          placeholder={STRINGS.USERNAME_PLACEHOLDER}
          value={email}
          autoCapitalize="none"
          size="large"
          onChangeText={onEmailTextChange}
          status={emailErrorText ? 'danger' : 'basic'}
          caption={emailErrorText}
          autoCorrect={false}
          onBlur={() => {
            onBlurResult(email)
          }}
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
        <Button
          style={styles.button}
          size="large"
          onPress={onLoginPress}
          disabled={isLoading || !email || !password}>
          {STRINGS.BUTTON_LOGIN}
        </Button>
        <Text style={styles.forgotPassword} onPress={openForgotPasswordPage}>
          {STRINGS.TEXT_FORGOT_PASSWORD}
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
      <EnvironmentSelectModal
        visible={showEnvModal}
        onDismiss={() => {
          setShowEnvModal(false)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
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
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  forgotPassword: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginVertical: 18,
  },
  settings: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  settingIcon: {
    opacity: 0.6,
  },
})
