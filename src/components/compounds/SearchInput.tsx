import React, {useCallback, useState} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {Layout, Input} from '@ui-kitten/components'
import Ionicons from 'react-native-vector-icons/Ionicons'

import type {SearchInputProps} from '../types'

export const SearchInput = ({
  isRealtimeSearch,
  onQueryChange,
  style,
  ...rest
}: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const onChangeText = useCallback((text: string) => {
    //TODO add debouncing
    setSearchQuery(text)
    isRealtimeSearch && onQueryChange(text)
  }, [])

  return (
    <Input
      value={searchQuery}
      onChangeText={onChangeText}
      maxLength={100}
      autoCorrect={false}
      style={[styles.container, style]}
      returnKeyType={'search'}
      accessoryRight={() => (
        <Layout style={styles.row}>
          {searchQuery ? (
            <TouchableOpacity onPress={() => onChangeText('')}>
              <Ionicons name="close" size={16} />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            activeOpacity={isRealtimeSearch ? 1 : 0.5}
            onPress={() => !isRealtimeSearch && onQueryChange(searchQuery)}>
            <Ionicons name="search" size={16} style={styles.close} />
          </TouchableOpacity>
        </Layout>
      )}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
  },
  close: {
    paddingHorizontal: 6,
  },
})
