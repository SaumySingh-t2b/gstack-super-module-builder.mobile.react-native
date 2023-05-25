import {Networking, Method, GNRequest} from '@react-native-granite/core'
import type {QueryParams} from '@react-native-granite/core/lib/types'

export const MiscApiGateway = {
  fetchListData: async ({
    url,
    baseUrl,
    page = 1,
    queryParams,
  }: {
    url: string
    baseUrl?: string
    page: number | string
    queryParams?: QueryParams
  }) => {
    const request = new GNRequest(Method.GET, url)
    request.queryParams = {
      page,
      ...queryParams,
    }
    if (baseUrl) request.baseUrl = baseUrl
    const response = await Networking.makeApiCall(request)
    console.log('misc =====>', response)
    return response.data as any
  },
}
