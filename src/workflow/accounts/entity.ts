import {BaseEntity} from '@react-native-granite/core'
import {IsEmail, IsInt, IsString} from 'class-validator'

export class LoginResponse extends BaseEntity {
  @IsString()
  readonly access_token?: string
}

export class User extends BaseEntity {
  @IsInt()
  readonly id?: number

  @IsEmail(undefined)
  readonly email?: string

  @IsString()
  readonly first_name?: string
  @IsString()
  readonly last_name?: string

  @IsString()
  readonly phone?: string
  @IsString()
  readonly country_code?: string

  @IsString()
  readonly profile_picture?: string
  @IsString()
  readonly profile_image?: string

  readonly organisations?: Organisation[]
}

export class Organisation extends BaseEntity {
  readonly organisation__name?: string
  readonly organisation__pk?: number
  readonly organisation__user_id?: number
  readonly organisation__domain?: string
  readonly organisation__logo__document?: string
}
