import React from 'react'

import {type ComponentRendererProps} from '../types'

export const ComponentRenderer = (componentProps: ComponentRendererProps) => {
  // console.log('ComponentRenderer -> componentProps', componentProps)
  const {name, props, extraData} = componentProps
  const Component =
    require('@react-native-granite/component')?.[name] ??
    require('../index')?.[name]
  // console.log('ComponentRenderer -> Component', Component)

  if (!Component) return null

  console.log('props------------->', {...props})
  console.log('rendered component--------------->', Component)
  return <Component {...props} {...extraData} />
}
