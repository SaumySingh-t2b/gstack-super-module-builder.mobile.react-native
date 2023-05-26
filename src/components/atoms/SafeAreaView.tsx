import React, {useState} from 'react'
import {Alert, StyleSheet, View} from 'react-native'
import {LongPressGestureHandler, State} from 'react-native-gesture-handler'
import {SafeAreaView as RawSafeAreaView} from '@react-native-granite/component'
import {Router} from '@react-native-granite/core'
import {Layout} from '@ui-kitten/components'

import {ThemeContext} from 'src/context'
import {AppSingleton} from 'src/constants'

export const SafeAreaView = ({children}: any) => {
  const NUMBER_OF_POINTER = 2
  const TRUE = 'true'
  const themeContext = React.useContext(ThemeContext)

  const onLongPress = (event: any) => {
    if (
      event.nativeEvent.state === State.ACTIVE &&
      event.nativeEvent.numberOfPointers === NUMBER_OF_POINTER &&
      AppSingleton.IS_RUNNING_IN_SUPER_APP === TRUE
    ) {
      Router.replace('GStackApp')
      themeContext.toggleTheme()
    }
  }

  return (
    <RawSafeAreaView style={style.container}>
      <LongPressGestureHandler
        onHandlerStateChange={onLongPress}
        minDurationMs={1500}>
        <Layout style={style.container}>{children}</Layout>
      </LongPressGestureHandler>
    </RawSafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {flex: 1},
})
