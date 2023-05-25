import React, {useEffect, useCallback, useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Layout, Text, useTheme, Input, Button} from '@ui-kitten/components'
import {EventEmitter, useEventEmitter} from '@react-native-granite/core'

import type {AppScreenProps} from 'src/types'
import {STRINGS} from './strings'
import {DashboardController} from 'src/workflow/dashboard'
import {DASHBOARD_EVENTS} from 'src/workflow/dashboard/events'
import {
  ComponentListRenderer,
  DetailViewBuilder,
  GNMapView,
} from 'src/components'
import type {ComponentRendererProps} from 'src/components'

import {useAuthProvider} from 'src/context'
import {SearchViewBuilder} from '@react-native-granite/component-builder'
import {SafeAreaView} from 'src/components/atoms/SafeAreaView'

const emitter = new EventEmitter()
const controller = new DashboardController(emitter)

export const ListDetail = ({
  navigation,
  route,
}: AppScreenProps<'ListDetail'>) => {
  const {id, metaData, item: details} = route.params
  const theme = useTheme()

  const {appScreens} = useAuthProvider()

  const [detailData, setDetailData] = useState<any>(details ?? {})
  // Make custom component renderer component to handle this with props
  // const [components, setComponents] = useState<ComponentRendererProps[]>([])
  const [detailMetaDataKeys, setDetailMetaDataKeys] = useState<any[]>([])

  const getComponentsList = useCallback(() => {
    return (
      appScreens?.find((item) => item.route === route.name)?.components ?? []
    )
  }, [appScreens])
  // Make custom component renderer component to handle this with props
  const [components, setComponents] = useState<ComponentRendererProps[]>(
    getComponentsList(),
  )
  const onFetchSuccess = (data: any[]) => {
    // setDetailData(data)
  }

  useEventEmitter(emitter, (event) => {
    switch (event.type) {
      case DASHBOARD_EVENTS.FETCH_LIST_DETAIL_DATA_SUCCESS:
        onFetchSuccess(event.data.res)
        setComponents(event.data.components)
        break
      case DASHBOARD_EVENTS.FETCH_DETAIL_META_DATA_SUCCESS:
        setDetailMetaDataKeys(event.data)
        break
    }
  })

  useEffect(() => {
    controller.fetchDetailMetaData()
    controller.fetchListDetailData(id, metaData)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        {detailMetaDataKeys && (
          <DetailViewBuilder
            cardStyle={{backgroundColor: theme['color-basic-500']}}
            keyMapping={detailMetaDataKeys}
            detailData={details}
          />
        )}
        {/* @ts-ignore */}
        <ComponentListRenderer componentsList={components} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  text: {
    marginTop: 6,
  },
})
