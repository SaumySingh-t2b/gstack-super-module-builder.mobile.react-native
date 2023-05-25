import React, {useCallback, useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'

import {Layout, Input, ListItem, useTheme} from '@ui-kitten/components'
import Ionicons from 'react-native-vector-icons/Ionicons'

import type {SearchViewBuilderProps} from '../types'
import {SearchInput} from './SearchInput'
import {useIsKeyboardVisible, useListState} from 'src/hooks'
import {List} from '@react-native-granite/component'

export const SearchViewBuilder = ({
  url,
  isRealtimeSearch,
  containerStyle,
  maxListHeight,
  queryKey,
  ...rest
}: //   TODO : showListAlso when keyboard hidden
SearchViewBuilderProps) => {
  const theme = useTheme()
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const {
    isDataLoaded,
    isPaging,
    listData: searchResults,
    setListData,
    onRefresh,
    onLoadMore,
  } = useListState({url, baseUrl: rest?.baseUrl, isSearchView: true})

  const {isKeyboardVisible} = useIsKeyboardVisible()

  const onChangeText = useCallback((text: string) => {
    if (!text) {
      setListData([])
      return
    }
    onRefresh({
      queryParams: queryKey
        ? {
            [queryKey]: text,
          }
        : {},
    })
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme['color-primary-500'],
        },
        containerStyle,
      ]}>
      <SearchInput
        isRealtimeSearch={true}
        style={styles.searchInput}
        onQueryChange={onChangeText}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      />
      {isKeyboardVisible && isSearchFocused && (
        <>
          {searchResults.length > 0 ? (
            <View style={maxListHeight ? {maxHeight: maxListHeight} : {}}>
              <List
                isDataLoaded={isDataLoaded}
                isPaging={isPaging}
                nestedScrollEnabled={true}
                data={searchResults}
                keyboardShouldPersistTaps="always"
                onLoadMore={onLoadMore}
                renderItem={({item}) => <ListItem title={item.title} />}
              />
            </View>
          ) : null}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
  },
  searchInput: {
    marginVertical: 0,
  },
})
