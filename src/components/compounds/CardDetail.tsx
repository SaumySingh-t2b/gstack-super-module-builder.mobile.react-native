import React, {useCallback} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Layout, Text, Card, useTheme, StyleService} from '@ui-kitten/components'
import IonicIcon from 'react-native-vector-icons/Ionicons'
import type {CardDetailProps} from 'src/components/types'
import {ObjectUtils} from 'src/utils'

export const CardDetail = ({
  cardTitle,
  cardSubtitle,
  keyMapping,
  showCardIcon = true,
  onCardIconPress,
  onCardPress,
  footer,
  keyColor,
  valueColor,
  detailData,
  cardIcon = <IonicIcon name="pencil-sharp" size={24} />,
  cardStyle,
}: CardDetailProps) => {
  const theme = useTheme()
  console.log('detailData', detailData)

  const renderDetails = useCallback(
    (title: string, value: any, index: number) => {
      return (
        <Layout
          style={[styles.itemWrapper, kittenStyles.defaultBackground]}
          key={title + index}>
          <Layout style={[styles.itemTitle, kittenStyles.defaultBackground]}>
            <Text category="s2" style={[styles.title, {color: keyColor}]}>
              {title}
            </Text>
            <Text category="s2" style={[styles.subTitle, {color: valueColor}]}>
              :
            </Text>
          </Layout>
          <Layout
            style={[
              styles.itemTitle,
              {justifyContent: 'flex-start'},
              kittenStyles.defaultBackground,
            ]}>
            <Text category="p2">{value}</Text>
          </Layout>
        </Layout>
      )
    },
    [],
  )

  const getLabel = (key?: string) => {
    return ObjectUtils.getValueAtPath(detailData, '.' + key) ?? key
  }

  return (
    <Card
      style={[styles.cardContainer, cardStyle, kittenStyles.defaultBackground]}
      onPress={onCardPress}>
      <Layout
        style={[styles.headerOuterWrapper, kittenStyles.defaultBackground]}>
        <Layout
          style={[styles.headerLeftPortion, kittenStyles.defaultBackground]}>
          <Layout style={kittenStyles.defaultBackground}>
            {getLabel(cardTitle) ? (
              <Text category="s1" style={styles.cardTitle}>
                {getLabel(cardTitle)}
              </Text>
            ) : null}
            {getLabel(cardSubtitle) ? (
              <Layout
                style={[styles.headerCaption, kittenStyles.defaultBackground]}>
                <Text category="c1">{getLabel(cardSubtitle)}</Text>
              </Layout>
            ) : null}
          </Layout>
        </Layout>
        <Layout
          style={[styles.headerRightPortion, kittenStyles.defaultBackground]}>
          {showCardIcon && (
            <TouchableOpacity
              style={kittenStyles.defaultBackground}
              activeOpacity={0.7}
              onPress={onCardIconPress}>
              {cardIcon}
            </TouchableOpacity>
          )}
        </Layout>
      </Layout>
      <Layout style={kittenStyles.defaultBackground}>
        {keyMapping?.map(({key, label}, index) =>
          renderDetails(
            label,
            ObjectUtils.getValueAtPath(detailData, '.' + key),
            index,
          ),
        )}
      </Layout>
      {footer}
    </Card>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    paddingBottom: 4,
  },
  headerOuterWrapper: {
    flexDirection: 'row',
  },
  card: {
    borderWidth: 2,
  },
  headerLeftPortion: {
    flexDirection: 'row',
    paddingBottom: 8,
    flex: 1,
  },
  headerRightPortion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  headerCaption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  itemTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    height: 24,
    width: 24,
    marginStart: 12,
  },
  title: {
    flex: 1,
  },
  subTitle: {paddingHorizontal: 12},
  cardTitle: {fontWeight: 'bold'},
})

const kittenStyles = StyleService.create({
  defaultBackground: {
    backgroundColor: 'color-basic-500',
  },
})
