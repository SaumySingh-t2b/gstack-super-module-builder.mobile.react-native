import {Database, type DbGateway} from '@react-native-granite/core'
import {UserSchema, RealmConfig} from 'src/workflow/database'
import {classToPlain} from 'class-transformer'
import {User} from './entity'

class AccountDbGateway implements DbGateway {
  schemaName = UserSchema.name
  currentSchema = RealmConfig

  saveUser = async (user: User) => {
    const data = classToPlain(user)
    await Database.dbCreateOrUpdate(this, data)
  }
}

export default new AccountDbGateway()
