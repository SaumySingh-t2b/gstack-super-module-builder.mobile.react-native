export const UserSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    email: {type: 'string?'},
    phone: {type: 'string?'},
    profile_picture: {type: 'string?'},
    createDateGN: {type: 'date'},
  },
}
