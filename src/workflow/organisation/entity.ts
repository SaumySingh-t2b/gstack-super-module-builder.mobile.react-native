import {BaseEntity} from '@react-native-granite/core'
import {IsEmail, IsInt, IsString} from 'class-validator'
import {Type, Exclude} from 'class-transformer'

export class OrgSettings extends BaseEntity {
  readonly id?: number
}
