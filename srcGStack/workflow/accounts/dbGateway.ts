import {Database, type DbGateway} from '@react-native-granite/core'
import {classToPlain} from 'class-transformer'

import {RealmConfig, UserSchema} from './../../workflow/database'

import {type User} from './entity'

class AccountDbGateway implements DbGateway {
  schemaName = UserSchema.name
  currentSchema = RealmConfig

  saveUser = async (user: User) => {
    const data = classToPlain(user)
    await Database.dbCreateOrUpdate(this, data)
  }
}

export default new AccountDbGateway()
