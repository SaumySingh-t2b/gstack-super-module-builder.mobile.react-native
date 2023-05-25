import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {StyleSheet} from 'react-native'
import {useTheme} from '@ui-kitten/components'

import {HeaderIcon, List} from '@react-native-granite/component'
import {EventEmitter, Router, useEventEmitter} from '@react-native-granite/core'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useNavigation} from '@react-navigation/native'

import ListItem from './ListItem'

import {MiscController, MISC_EVENTS} from 'src/workflow/misc'
import type {ItemMappingProps, ListBuilderProps} from 'src/components/types'

export const ListBuilder = ({
  entity,
  url,
  baseUrl,
  // TODO remove it
  headerAddIcon,
  emptyItemTitle,
  emptyItemSubtitle,
  itemActionRoute,
  itemType,
  itemMapping = {},
  onItemPress,
}: ListBuilderProps) => {
  const endPoint = url || `api/v1/${entity}/`
  const theme = useTheme()
  const navigation = useNavigation()
  const emitter = useRef(new EventEmitter()).current
  const controller = useRef(new MiscController(emitter)).current

  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isPaging, setIsPaging] = useState(false)
  const [nextPage, setNextPage] = useState(1)
  const [listData, setListData] = useState<any[]>([])

  useLayoutEffect(() => {
    if (headerAddIcon) {
      navigation.setOptions({
        headerRight: () => (
          <HeaderIcon
            Icon={
              <Ionicons
                name={'add'}
                size={28}
                color={theme['color-basic-100']}
              />
            }
            onPress={() => {
              Router.navigate('FormsScreen', {entityName: entity})
            }}
          />
        ),
      })
    }
  }, [headerAddIcon, entity])

  const onLoadMore = useCallback(() => {
    setIsDataLoaded(false)
    controller.fetchListData({url: endPoint, prevList: listData, nextPage})
  }, [endPoint, listData, nextPage])

  const getItemMapping = useCallback(() => {
    const newMapping: any = {}
    Object.keys(itemMapping).forEach((itemKey) => {
      const key = itemKey as keyof ItemMappingProps
      // if (typeof itemMapping[key] === 'string') {
      const pattern = /^[a-z][a-z0-9_]+/g
      const isValid =
        itemMapping?.[key]?.toString()?.match(pattern)?.[0] == itemMapping[key]
      newMapping[key] = (isValid ? '.' : '') + itemMapping[key]
      // }
    })
    return newMapping
  }, [])

  useEventEmitter(emitter, (event) => {
    switch (event.type) {
      case MISC_EVENTS.FETCH_LIST_DATA_START:
        break
      case MISC_EVENTS.FETCH_LIST_DATA_SUCCESS:
        setIsPaging(false)
        setIsDataLoaded(true)
        setNextPage(event.data?.nextPage)
        setIsRefreshing(false)
        setListData(event.data?.list)
        break
      case MISC_EVENTS.FETCH_LIST_DATA_FAILURE:
        setIsDataLoaded(true)
        setIsPaging(false)
        setIsRefreshing(false)
        break
    }
  })

  useEffect(() => {
    controller.fetchListData({url: endPoint, baseUrl})
    console.log('endPoint', endPoint)
  }, [])

  return (
    <List
      // TODO add pk support in extractItem
      isDataLoaded={isDataLoaded}
      isPaging={isPaging}
      data={listData}
      style={styles.container}
      renderItem={({item, index}) => {
        return (
          <ListItem
            item={item}
            itemMapping={getItemMapping()}
            index={index}
            itemType={itemType}
            onItemPress={() => {
              itemActionRoute &&
                Router.navigate(itemActionRoute, {
                  id: item.id,
                  extraData: {
                    detailData: item,
                  },
                })
              onItemPress?.(item, index)
            }}
            containerStyle={styles.itemContainer}
          />
        )
      }}
      onLoadMore={onLoadMore}
      refreshing={isRefreshing}
      maxToRenderPerBatch={20} //TODO: This need to handel better way
      onRefresh={() => {
        setIsDataLoaded(false)
        setIsRefreshing(false)
        setListData([])
        controller.fetchListData({url: endPoint, baseUrl})
      }}
      emptyItemProps={{
        title: emptyItemTitle,
        subtitle: emptyItemSubtitle,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    borderRadius: 4,
    elevation: 1,
  },
})
