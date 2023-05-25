import {Networking, Method, GNRequest} from '@react-native-granite/core'
import {UserProfile} from 'src/workflow/profile/entity'
import deviceInfoModule from 'react-native-device-info'
import {PROFILE_URL} from './url'

export const ProfileApiGateway = {
  fetchAppMetaData: async () => {
    const request = new GNRequest(Method.GET, PROFILE_URL.APP_META_DATA)
    request.queryParams = {
      package_name: deviceInfoModule.getBundleId(),
    }
    const response = await Networking.makeApiCall(request)

    return response.data as any
  },
  fetchOrganizationSettings: async () => {
    const request = new GNRequest(Method.GET, PROFILE_URL.APP_META_DATA)
    request.queryParams = {
      package_name: deviceInfoModule.getBundleId(),
    }
    const response = await Networking.makeApiCall(request)
    return response.data as any
  },

  fetchUserProfile: async () => {
    const request = new GNRequest(Method.GET, PROFILE_URL.PROFILE)
    const response = await Networking.makeApiCall(request)
    console.log('Profile------------->', response)
    return response.data as UserProfile
  },
  deleteAccount: async () => {
    const request = new GNRequest(Method.POST, PROFILE_URL.DELETE_ACCOUNT)
    await Networking.makeApiCall(request)
  },
}
