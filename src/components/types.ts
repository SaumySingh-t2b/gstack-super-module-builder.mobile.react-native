export type EnvironmentSelectModalProps = {
  visible: boolean
  onDismiss: () => void
}

import {FormMetaData} from 'src/workflow/forms'
import type {
  ListRenderItem,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type {InputProps} from '@ui-kitten/components'
import type {ProfileImageProps, Shape} from '@react-native-granite/component'

export type FormRendererProps = {
  /**
   * @description A `plain object` which will be used to render the initial data of the forms.
   * The `exact key` will be `mapped` to the input values if that key contains in the meta data.
   */
  initialFormData?: any
  /**
   * The metadata to render the forms
   */
  formsMetaData: FormMetaData[]
  /**
   * If you want the form will fetch the metadata by itself, pass this prop
   */
  metaDataUrl?: string
}

/**
 * Any screen will render the screen by their default UI, then comes the components rendering part
 *
 */
export interface ComponentRendererProps {
  name: string
  props?: any
  extraData?: object
}

export type ItemMappingProps = {
  title?: string
  subtitle?: string
  captionTopLeft?: string
  captionTopRight?: string
  captionBottomLeft?: string
  captionBottomRight?: string
  imageStaticUrl?: string
  itemType?: 'ADVANCED' | 'STANDARD'
  imageUrl?: string
  imageShape?: Shape
  imageSize?: number
}

export type ListBuilderProps = {
  entity?: string
  url?: string
  baseUrl?: string
  headerAddIcon?: boolean
  emptyItemTitle?: string
  emptyItemSubtitle?: string
  itemActionRoute?: string
  itemMapping?: ItemMappingProps
  itemType?: 'ADVANCED' | 'STANDARD'
  onItemPress?: (item: any, index: number) => void
}

export type CaptionsProps<T = ViewStyle | TextStyle> = {
  topLeft?: StyleProp<T>
  topRight?: StyleProp<T>
  bottomLeft?: StyleProp<T>
  bottomRight?: StyleProp<T>
}

export type ListItemProps = {
  containerStyle?: StyleProp<TextStyle>
  titleStyle?: StyleProp<TextStyle>
  descriptionStyle?: StyleProp<TextStyle>
  textContainerStyle?: CaptionsProps<ViewStyle>
  textStyle?: CaptionsProps<TextStyle>
  itemType?: 'ADVANCED' | 'STANDARD'
  item?: any
  index: number
  itemMapping?: ItemMappingProps
  children?: React.ReactNode
  onItemPress?: (item: any, index: number) => void
}

export type ButtonBuilderProps = {
  title: string
  containerStyle?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  onPress?: () => void
  isLoading?: boolean
}

export type CaptionsViewProps = {
  viewContainerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<TextStyle>
  text?: string
}
export type SearchInputProps = {
  isRealtimeSearch?: boolean
  style?: StyleProp<TextStyle>
  onQueryChange: (value: string) => void
} & InputProps

export type DetailViewBuilderProps = {
  type?: 'MINIMAL' | 'TABULAR'
  cardTitle?: string
  cardSubtitle?: string
  keyMapping?: any[] //shared by both minimal and tabular
  // TODO may need to rename it for generalization
  detailData?: any

  showCardIcon?: boolean
  onCardIconPress?: () => void
  onCardPress?: () => void

  footer?: JSX.Element
  children?: React.ReactNode
  containerStyle?: StyleProp<TextStyle>
  cardStyle?: StyleProp<TextStyle>
  labelStyle?: StyleProp<TextStyle>
  descriptionStyle?: StyleProp<TextStyle>
  keyColor?: string
  valueColor?: string
  backgroundColor?: string
  cardIcon?: JSX.Element
}

export type SearchViewProps = {
  maxListHeight?: number
  queryKey?: string
  renderItem?: ListRenderItem<any>
} & Omit<SearchInputProps, 'onQueryChange'>

export type SearchViewBuilderProps = {
  maxListHeight?: number
  queryKey?: string
  containerStyle?: StyleProp<ViewStyle>
  renderItem?: ListRenderItem<any>
} & Pick<SearchInputProps, 'isRealtimeSearch'> &
  ListBuilderProps

export type CardDetailProps = Omit<
  DetailViewBuilderProps,
  'type' | 'containerStyle'
>
