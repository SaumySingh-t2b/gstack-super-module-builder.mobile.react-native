import {EventEmitter, useEventEmitter} from '@react-native-granite/core'
import type {QueryParams} from '@react-native-granite/core/lib/types'
import type {ListBuilderProps} from 'src/components'
import {MiscController, MISC_EVENTS} from 'src/workflow/misc'
import React, {useCallback, useEffect, useState} from 'react'
import {Keyboard} from 'react-native'

const emitter = new EventEmitter()
const controller = new MiscController(emitter)

export const useListState = ({
  url,
  baseUrl,
  isSearchView,
}: {
  isSearchView?: boolean
} & Pick<ListBuilderProps, 'url' | 'baseUrl'>) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isPaging, setIsPaging] = useState(false)
  const [nextPage, setNextPage] = useState(1)
  const [listData, setListData] = useState<any[]>([])

  const onLoadMore = useCallback(() => {
    setIsPaging(true)
    console.log('onLoadMore -> setIsPaging', setIsPaging)
    controller.fetchListData({url, prevList: listData, nextPage})
  }, [url, listData, nextPage])

  const onRefresh = useCallback(
    ({
      shouldRefresh,
      queryParams,
    }: {shouldRefresh?: boolean; queryParams?: QueryParams} = {}) => {
      setIsRefreshing(!!shouldRefresh)
      controller.fetchListData({url, baseUrl, queryParams})
    },
    [url],
  )

  useEventEmitter(emitter, (event) => {
    switch (event.type) {
      case MISC_EVENTS.FETCH_LIST_DATA_START:
        break
      case MISC_EVENTS.FETCH_LIST_DATA_SUCCESS:
        setIsPaging(false)
        setIsDataLoaded(true)
        setNextPage(event.data?.nextPage)
        setListData(event.data?.list)
        break
      case MISC_EVENTS.FETCH_LIST_DATA_FAILURE:
        setIsDataLoaded(true)
        setIsPaging(false)
        break
    }
  })

  useEffect(() => {
    if (!isSearchView) {
      onRefresh()
    }
  }, [])

  return {
    isDataLoaded,
    isRefreshing,
    isPaging,
    listData,
    setListData,
    onRefresh,
    onLoadMore,
  }
}
