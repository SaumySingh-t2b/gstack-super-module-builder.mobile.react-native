import React, {useEffect, useLayoutEffect, useState} from 'react'
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'

import {EmptyItem, SafeAreaView} from '@react-native-granite/component'
import {useTheme} from '@ui-kitten/components'
import {
  EventEmitter,
  LocalStorage,
  Router,
  useEventEmitter,
} from '@react-native-granite/core'
import {ListBuilder} from '@react-native-granite/component-builder'

import {HamburgerIcon} from 'src/components'
import {type AppScreenProps} from 'src/types'
import {AuthUtil} from './../../utils'

export const Dashboard = ({navigation}: AppScreenProps<'Dashboard'>) => {
  const theme = useTheme()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HamburgerIcon theme={theme} />,
    })
  }, [])

  // TODO APPLY GRID VIEW HERE
  return (
    <SafeAreaView style={styles.container}>
      <EmptyItem visible={true} title="SuperApp" />

      {/* <ListBuilder
        url={'gstack/v1/project/'}
        itemMapping={{
          title: 'name',
          subtitle: 'description',
          captionBottomLeft: 'created_at',

          itemType: 'ADVANCED',
          imageShape: 'SQUARE',
          imageSize: 45,
          imageUrl: 'favicon',
        }}
        onItemPress={(item) => {
          console.log(item)
          Router.replace('SplashScreen')
        }}
      /> */}

      <View style={{padding: 20}}>
        <TouchableOpacity
          onPress={() => {
            console.log('------------------------------------------>')
            Router.replace('SplashScreen')
          }}>
          <Image
            style={styles.tinyLogo}
            source={require('src/assets/images/appLogo.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logOutText: {
    marginEnd: 6,
    textDecorationLine: 'underline',
  },
  tinyLogo: {
    height: 100,
    width: 100,
  },
})
