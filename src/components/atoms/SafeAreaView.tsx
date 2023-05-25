import React, {useState} from 'react'
import {Alert, StyleSheet, View} from 'react-native'
import {LongPressGestureHandler, State} from 'react-native-gesture-handler'
import {SafeAreaView as RawSafeAreaView} from '@react-native-granite/component'
import {Router} from '@react-native-granite/core'
import {Layout} from '@ui-kitten/components'

import {ThemeContext} from 'src/context'

let duration: number
let prevTapTime: number
export const SafeAreaView = ({children}: any) => {
  const MIN_DURATION = 300
  const themeContext = React.useContext(ThemeContext)

  const onLongPress = (event: any) => {
    if (duration <= MIN_DURATION) {
      if (event.nativeEvent.state === State.ACTIVE) {
        Router.replace('GStackApp')
        themeContext.toggleTheme()
      }
    }
  }

  const onBegan = () => {
    // runs every time when gesture pressed
    if (prevTapTime) {
      duration = Date.now() - prevTapTime
    }
    prevTapTime = Date.now()
  }

  return (
    <RawSafeAreaView style={style.container}>
      <LongPressGestureHandler
        onHandlerStateChange={onLongPress}
        minDurationMs={1500}
        onBegan={onBegan}>
        <Layout style={style.container}>{children}</Layout>
      </LongPressGestureHandler>
    </RawSafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {flex: 1},
})
