import React, {useCallback} from 'react'
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native'

import {Layout, Text, Card, Icon, useTheme} from '@ui-kitten/components'
import IonicIcon from 'react-native-vector-icons/Ionicons'

import type {DetailViewBuilderProps} from '../types'
import {CardDetail} from './CardDetail'

const DetailViewBuilder = ({
  keyMapping,
  detailData,
  children,
  containerStyle,
  cardStyle,
  labelStyle,
  descriptionStyle,
  type = 'MINIMAL',
  cardTitle,
  cardSubtitle,
  onCardIconPress,
  showCardIcon = false,
  onCardPress,
  footer,
  backgroundColor,
  cardIcon,
}: DetailViewBuilderProps) => {
  console.log('DetailViewBuilderProps', keyMapping, detailData)
  const filterShownKeys = useCallback(
    (key: string) => {
      if (!keyMapping) return false
      return keyMapping?.find((item: any) => item?.key === key)
    },
    [keyMapping],
  )

  return (
    <Layout style={[styles.container, containerStyle]}>
      {type == 'MINIMAL' ? (
        <Layout style={styles.detailStyle}>
          {Object?.keys(detailData || {})
            ?.filter((label) => filterShownKeys(label))
            ?.map((key) => (
              <Layout style={[styles.cardStyle, cardStyle]} key={key}>
                {key ? (
                  <Text category={'s1'} style={[labelStyle]}>
                    {filterShownKeys(key)?.label}
                  </Text>
                ) : null}
                {detailData[key] ? (
                  <Text style={[descriptionStyle]} category={'s2'}>
                    {detailData[key]}
                  </Text>
                ) : null}
                {children}
              </Layout>
            ))}
        </Layout>
      ) : (
        <CardDetail
          cardSubtitle={cardSubtitle}
          cardTitle={cardTitle}
          keyMapping={keyMapping}
          onCardIconPress={onCardIconPress}
          showCardIcon={showCardIcon}
          onCardPress={onCardPress}
          footer={footer}
          detailData={detailData}
          backgroundColor={backgroundColor}
          cardIcon={cardIcon}
          cardStyle={cardStyle}
        />
      )}
    </Layout>
  )
}

export default React.memo(DetailViewBuilder)

const styles = StyleSheet.create({
  container: {
    // marginBottom: 8,
    flex: 1,
  },

  detailStyle: {
    flex: 1,
  },

  cardStyle: {
    marginBottom: 5,
    borderRadius: 4,
    padding: 5,
  },
})
