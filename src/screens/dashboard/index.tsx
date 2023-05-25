import React, {useEffect, useCallback, useState, useLayoutEffect} from 'react'
import {Alert, StyleSheet} from 'react-native'
import {Layout, Text, Button, ListItem, useTheme} from '@ui-kitten/components'
import {
  EventEmitter,
  GraniteApp,
  Router,
  useEventEmitter,
} from '@react-native-granite/core'

import {STRINGS} from './strings'
import {type AppScreenProps} from 'src/types'
import {List} from '@react-native-granite/component'
import {DashboardController, LIST_EVENTS} from 'src/workflow/dashboard'
import {HamburgerIcon} from 'src/components'
import {useAuthProvider} from 'src/context'
import {SafeAreaView} from 'src/components/atoms/SafeAreaView'
const emitter = new EventEmitter()
const controller = new DashboardController(emitter)

export const Dashboard = ({navigation}: AppScreenProps<'Dashboard'>) => {
  const theme = useTheme()
  const {appMetaData} = useAuthProvider()

  const [listMetaData, setListMetaData] = useState({})
  const [listData, setListData] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [isPaging, setIsPaging] = useState(false)
  const [nextPage, setNextPage] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        appMetaData?.show_drawer ? <HamburgerIcon theme={theme} /> : null,
    })
  }, [])

  const onFetchSuccess = (data: any) => {
    setListMetaData(data)
    controller.fetchListData({
      url: data.url,
    })
  }

  useEventEmitter(emitter, (event) => {
    switch (event.type) {
      case LIST_EVENTS.FETCH_META_DATA_SUCCESS:
        onFetchSuccess(event.data)
        break
      case LIST_EVENTS.FETCH_LIST_DATA_SUCCESS:
        setListData(event.data)
        setIsDataLoaded(true)
        break
    }
  })

  useEffect(() => {
    controller.fetchListMetaData()
  }, [])

  return (
    <SafeAreaView>
      <List
        isDataLoaded={isDataLoaded}
        isPaging={isPaging}
        data={listData}
        renderItem={({item, index}) => (
          <ListItem
            title={item.title}
            onPress={() =>
              navigation.navigate('ListDetail', {
                id: item.id,
                metaData: listMetaData,
                item: item,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logOutText: {
    marginEnd: 6,
    textDecorationLine: 'underline',
  },
})
