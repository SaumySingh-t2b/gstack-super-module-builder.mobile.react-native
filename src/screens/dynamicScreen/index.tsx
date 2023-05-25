import React, {useEffect, useCallback, useState, useLayoutEffect} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Layout, Text, Input, Button, useTheme} from '@ui-kitten/components'
import {EventEmitter, Router, useEventEmitter} from '@react-native-granite/core'

import type {AppScreenProps} from 'src/types'

import {
  ComponentListRenderer,
  ComponentRenderer,
  HamburgerIcon,
  type ComponentRendererProps,
} from 'src/components'
import {MiscController, MISC_EVENTS} from 'src/workflow/misc'
import {EmptyItem} from '@react-native-granite/component'
import {useAuthProvider} from 'src/context'
import {APP_STRINGS} from 'src/constants'
import {SafeAreaView} from 'src/components/atoms/SafeAreaView'
const emitter = new EventEmitter()
const controller = new MiscController(emitter)

export const DynamicScreen = ({
  navigation,
  route,
}: AppScreenProps<'DynamicScreen' | 'Dashboard'>) => {
  const theme = useTheme()

  const {appMetaData, appScreens} = useAuthProvider()

  const [extraData, setExtraData] = useState(route.params?.extraData)

  const getComponentsList = useCallback(() => {
    return (
      appScreens?.find((item) => item.route === route.name)?.components ?? []
    )
  }, [appScreens])
  // Make custom component renderer component to handle this with props
  const [components, setComponents] = useState<ComponentRendererProps[]>(
    getComponentsList(),
  )
  // console.log('components', route.key, components)

  useEventEmitter(emitter, (event) => {
    switch (event.type) {
      case MISC_EVENTS.FETCH_META_DATA_SUCCESS:
        // setComponents(event.data)

        break
    }
  })

  useEffect(() => {
    controller.fetchComponentsMetaData('')
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* @ts-ignore */}

      <ComponentListRenderer
        key={'CLR' + route.key}
        componentsList={components}
        extraData={extraData}
      />
      <EmptyItem
        visible={components.length == 0}
        title={APP_STRINGS.EMPTY_COMPONENTS_LIST}
        containerStyle={styles.container}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    marginTop: 6,
  },
})
