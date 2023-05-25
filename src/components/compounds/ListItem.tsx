import React, {useCallback} from 'react'
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Text, useTheme} from '@ui-kitten/components'
import {ProfileImage} from '@react-native-granite/component'
import type {ListItemProps, CaptionsViewProps} from '../types'
import {ObjectUtils} from 'src/utils'

const SCREEN_WIDTH = Dimensions.get('screen').width * 0.97

const ListItem = ({
  containerStyle,
  textStyle,
  titleStyle,
  descriptionStyle,
  textContainerStyle,
  itemType = 'STANDARD',
  item,
  index,
  itemMapping,
  children,
  onItemPress,
}: ListItemProps) => {
  const theme = useTheme()
  const imgStyle = [
    {backgroundColor: theme['color-basic-500']},
    itemType == 'ADVANCED' && styles.imgStyle,
  ]

  const CaptionView = React.useCallback(
    ({viewContainerStyle, style, text}: CaptionsViewProps) =>
      text ? (
        <View style={[styles.view, viewContainerStyle]}>
          <Text
            style={[{color: theme['color-basic-1200']}, style]}
            category={'c1'}>
            {text}
          </Text>
        </View>
      ) : null,
    [],
  )

  const getProfileImage = useCallback(() => {
    const url = ObjectUtils.getValueAtPath(item, itemMapping?.imageUrl)
    return url ? url : itemMapping?.imageStaticUrl
  }, [])

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme['color-basic-500']},
        containerStyle,
      ]}>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => onItemPress?.(item, index)}>
        <View
          style={[
            styles.profileImageContainer,
            itemType == 'ADVANCED' && {flexDirection: 'column'},
          ]}>
          {getProfileImage() ? (
            <ProfileImage
              url={getProfileImage()}
              shape={itemMapping?.imageShape}
              size={Number(itemMapping?.imageSize) || 30}
              containerStyle={imgStyle}
              imageStyle={imgStyle}
              resizeMode={itemType == 'ADVANCED' ? 'contain' : 'cover'}
            />
          ) : null}
          <View
            style={
              itemType === 'STANDARD'
                ? styles.viewWrapper
                : styles.viewWrapperImg
            }>
            <View style={styles.rowContainer}>
              <CaptionView
                viewContainerStyle={textContainerStyle?.topLeft}
                text={ObjectUtils.getValueAtPath(
                  item,
                  itemMapping?.captionTopLeft ?? '',
                )}
                style={textStyle?.topLeft}
              />
              <CaptionView
                viewContainerStyle={textContainerStyle?.topRight}
                text={ObjectUtils.getValueAtPath(
                  item,
                  itemMapping?.captionTopRight,
                )}
                style={[styles.textRight, textStyle?.topRight]}
              />
            </View>
            <Text
              style={[styles.labelText, titleStyle]}
              category="s1"
              numberOfLines={1}>
              {ObjectUtils.getValueAtPath(item, itemMapping?.title ?? '')}
            </Text>
            <Text
              style={[styles.descriptionText, descriptionStyle]}
              category="s2"
              numberOfLines={1}>
              {ObjectUtils.getValueAtPath(item, itemMapping?.subtitle ?? '')}
            </Text>
            {children}
            <View style={styles.rowContainer}>
              <CaptionView
                viewContainerStyle={textContainerStyle?.bottomLeft}
                text={ObjectUtils.getValueAtPath(
                  item,
                  itemMapping?.captionBottomLeft ?? '',
                )}
                style={textStyle?.bottomLeft}
              />
              <CaptionView
                viewContainerStyle={textContainerStyle?.bottomRight}
                text={ObjectUtils.getValueAtPath(
                  item,
                  itemMapping?.captionBottomRight ?? '',
                )}
                style={[styles.textRight, textStyle?.bottomRight]}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default React.memo(ListItem)

const styles = StyleSheet.create({
  container: {
    padding: 2,
    borderRadius: 4,
    margin: 2,
  },
  textRight: {
    textAlign: 'right',
  },
  profileImageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 2,
    marginVertical: 3,
    justifyContent: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view: {
    flex: 1,
  },
  viewWrapper: {
    marginStart: 10,
    marginEnd: 6,
    flex: 1,
  },
  viewWrapperImg: {
    marginHorizontal: 6,
    flex: 1,
  },
  labelText: {
    fontWeight: '600',
  },
  descriptionText: {
    paddingBottom: 2,
  },
  imgStyle: {
    width: SCREEN_WIDTH,
    height: 160,
    borderRadius: 4,
  },
})
