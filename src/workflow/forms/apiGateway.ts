import {Networking, Method, GNRequest} from '@react-native-granite/core'
import {FORMS_URL} from './url'

export const FormsApiGateway = {
  fetchEntityConfigs: async (entity_name: string) => {
    const request = new GNRequest(Method.GET, FORMS_URL.ENTITY_LIST)
    request.queryParams = {
      entity_name,
    }

    const response = await Networking.makeApiCall(request)
    return (response.data as any)?.results
  },
}
