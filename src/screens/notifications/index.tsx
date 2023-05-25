import React, {useLayoutEffect} from 'react'

import type {AppScreenProps} from 'src/types'

import {useTheme} from '@ui-kitten/components'
import {HamburgerIcon, ListBuilder} from 'src/components'
import {useAuthProvider} from 'src/context'
import {SafeAreaView} from 'src/components/atoms/SafeAreaView'
export const Notifications = ({
  navigation,
}: AppScreenProps<'Notifications'>) => {
  const theme = useTheme()
  const {appMetaData} = useAuthProvider()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        appMetaData?.show_drawer ? <HamburgerIcon theme={theme} /> : null,
    })
  }, [])

  return (
    <SafeAreaView>
      <ListBuilder
        url={'granite/v1/notifications/'}
        itemMapping={{
          subtitle: 'verb',
          captionBottomLeft: 'created_at',
        }}
      />
    </SafeAreaView>
  )
}
