import React, {useCallback, useLayoutEffect} from 'react'
import {StyleSheet} from 'react-native'

import {EmptyItem, SafeAreaView} from '@react-native-granite/component'
import {GraniteApp, Router} from '@react-native-granite/core'
import {Text, useTheme} from '@ui-kitten/components'

import {HamburgerIcon} from 'src/components'
import type {AppScreenProps} from 'src/types'
import {AlertUtils} from 'src/utils'

import {STRINGS} from './strings'

export const Profile = ({navigation}: AppScreenProps<'Profile'>) => {
  const LogOutButton = useCallback(() => {
    return (
      <Text status="danger" style={styles.logOutText} onPress={onLogOutPress}>
        {STRINGS.LOG_OUT}
      </Text>
    )
  }, [])
  const theme = useTheme()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HamburgerIcon theme={theme} />,
      headerRight: LogOutButton,
    })
  }, [])

  const onLogOutPress = useCallback(() => {
    AlertUtils.showAlert(STRINGS.LOGOUT_CONFIRMATION, 'Confirm', [
      {
        text: STRINGS.BUTTON_NO,
      },
      {
        text: STRINGS.BUTTON_YES,
        onPress: async () => {
          await GraniteApp.logout()
          Router.replace('Auth')
        },
      },
    ])
  }, [navigation])

  return (
    <SafeAreaView>
      <EmptyItem visible={true} title="Profile" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutText: {
    marginEnd: 6,
    textDecorationLine: 'underline',
  },
})
