import {UserSchema} from './schema'

/**
 * @note
 * Schema Rule: DO NOT rename/modify/delete any schema or property after being app is live
 * You can only add new property or schema once app is live, it is to mitigate MIGRATION
 */
export const RealmConfig = {
  schema: [UserSchema],
  migration: (oldRealm: any, newRealm: any) => {
    // Migration code goes here...
  },
}
