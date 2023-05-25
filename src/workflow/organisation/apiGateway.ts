import {Networking, Method, GNRequest} from '@react-native-granite/core'
import {ENDPOINTS} from 'src/constants'
import {ORG_URL} from './url'

export const OrgApiGateway = {
  fetchOrganizationSettings: async () => {
    const request = new GNRequest(Method.GET, ORG_URL.ORG_SETTINGS)
    const response = await Networking.makeApiCall(request)
    return (response.data as any)?.results
  },
  fetchConfigMaster: async (keys: string[]) => {
    const request = new GNRequest(Method.GET, ORG_URL.CONFIG_MASTER)
    request.queryParams = {
      keys: JSON.stringify(keys),
    }
    const response = await Networking.makeApiCall(request)
    console.log('org response---->', response)
    return (response.data as any)?.results
  },
}
