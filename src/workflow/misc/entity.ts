import {BaseEntity} from '@react-native-granite/core'
import type {FieldType, SupportedComponents} from 'src/types'

export class ComponentRendererData extends BaseEntity {
  readonly key?: string
  readonly name?: SupportedComponents
  readonly props?: any
}
