import {BaseEntity} from '@react-native-granite/core'
import {IsEmail, IsInt, IsString} from 'class-validator'
import {Type, Exclude} from 'class-transformer'
import {User} from 'src/workflow/accounts'
import {type FieldType} from 'src/types'

export class FormMetaData extends BaseEntity {
  readonly key: string = ''
  readonly field_type?: FieldType = 'DEFAULT'
  readonly placeholder?: string
  readonly disabled?: boolean
  readonly validations?: InputValidation
}

export class InputValidation extends BaseEntity {
  readonly is_required?: boolean
  readonly min_length?: boolean
  readonly max_length?: boolean
}
