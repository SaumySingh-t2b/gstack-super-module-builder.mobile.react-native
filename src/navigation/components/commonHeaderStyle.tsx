import React from 'react'
import {Icon} from '@ui-kitten/components'
import type {StackNavigationOptions} from '@react-navigation/stack'

export const commonHeaderStyle = (
  theme: Record<string, string>,
): StackNavigationOptions => ({
  headerStyle: {
    backgroundColor: theme['color-primary-600'],
  },
  headerTintColor: theme['color-basic-100'],
  headerTitleAlign: 'center',
  headerTitleStyle: {fontSize: 18},
  headerBackTitleVisible: false,
  headerBackImage: () => (
    <Icon
      name="arrow-ios-back-outline"
      style={{height: 30, width: 30}}
      fill={'white'}
    />
  ),
})
