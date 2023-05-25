import {BaseEntity} from '@react-native-granite/core'
import {IsString} from 'class-validator'
import {Type} from 'class-transformer'

export class ListData extends BaseEntity {
  @Type(() => Result)
  readonly results?: Result[]
}

export class Result extends BaseEntity {
  @IsString()
  readonly email?: string

  @IsString()
  readonly gender?: string
}
