import {GNRequest, Method, Networking} from '@react-native-granite/core'

import {PROFILE_URL} from './url'

const ProfileApiGateway = {
  deleteAccount: async () => {
    const request = new GNRequest(Method.POST, PROFILE_URL.DELETE_ACCOUNT)
    await Networking.makeApiCall(request)
  },
}

export default ProfileApiGateway
