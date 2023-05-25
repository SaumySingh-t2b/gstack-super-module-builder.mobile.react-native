import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {Router} from '@react-native-granite/core'
import {Icon} from '@ui-kitten/components'

export const HamburgerIcon = ({
  theme,
  onPress,
}: {
  theme: Record<string, string>
  onPress?: () => void
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Router.toggleDrawer()
        onPress?.()
      }}>
      <Icon
        name="menu"
        style={styles.headerIcon}
        fill={theme['color-basic-100']}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  headerIcon: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
})
