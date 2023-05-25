import React, {useLayoutEffect} from 'react'

import {EmptyItem, SafeAreaView} from '@react-native-granite/component'
import {useTheme} from '@ui-kitten/components'

import {HamburgerIcon} from 'src/components'
import type {AppScreenProps} from 'src/types'

const Notifications = ({navigation}: AppScreenProps<'Notifications'>) => {
  const theme = useTheme()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HamburgerIcon theme={theme} />,
    })
  }, [])

  return (
    <SafeAreaView>
      <EmptyItem visible={true} title="Notifications" />
    </SafeAreaView>
  )
}

export default Notifications
