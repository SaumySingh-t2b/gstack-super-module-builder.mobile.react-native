import {BaseEntity} from '@react-native-granite/core'
import {IsEmail, IsInt, IsString} from 'class-validator'

export class LoginResponse extends BaseEntity {
  @IsString() readonly access_token?: string
}

export class User extends BaseEntity {
  @IsInt() readonly id?: number
  @IsEmail(undefined) readonly email?: string
  @IsString() readonly name?: string
  @IsString() readonly phone?: string
  @IsString() readonly profile_picture?: string
}
