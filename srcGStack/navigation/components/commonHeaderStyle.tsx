import React from 'react'

import type {StackNavigationOptions} from '@react-navigation/stack'
import {Icon} from '@ui-kitten/components'

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
