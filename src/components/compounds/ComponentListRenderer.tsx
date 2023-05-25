import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Layout} from '@ui-kitten/components'

import {type ComponentRendererProps} from '../types'
import {ComponentRenderer} from './ComponentRenderer'

export const ComponentListRenderer = ({
  componentsList,
  extraData,
}: {
  componentsList: ComponentRendererProps[]
  extraData?: object
}) => {
  if (!componentsList.length) return null

  // console.log(' {...extraData}', {...extraData})

  // TODO remove error for if components contain list under scroll view
  // TODO or we can add validation on FE for this
  return componentsList.length == 1 ? (
    componentsList?.map((item) => (
      <Layout key={item.name + 'Layout'} style={{flex: 1}}>
        {/* {__DEV__ ? (
          <Text category="h6" style={styles.title}>
            {item.name}
          </Text>
        ) : null} */}
        {/* NOTE: Appending item and extra data to pass to the children */}

        <ComponentRenderer key={item.name} {...item} extraData={extraData} />
      </Layout>
    ))
  ) : (
    <ScrollView>
      {componentsList?.map((item, index) => (
        <Layout key={item.name + 'Layout' + index}>
          {/* {__DEV__ ? <Text category="h6">{item.name}</Text> : null} */}

          <ComponentRenderer key={item.name} {...item} extraData={extraData} />
        </Layout>
      ))}
    </ScrollView>
  )
}
