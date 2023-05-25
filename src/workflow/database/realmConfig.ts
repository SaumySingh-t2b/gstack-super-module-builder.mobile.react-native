import {UserSchema} from './schema'

export const RealmConfig = {
  schema: [UserSchema],
  migration: (oldRealm: any, newRealm: any) => {
    //Migration code goes here...
  },
}
