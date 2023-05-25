import {Networking, Method, GNRequest} from '@react-native-granite/core'

export const DashboardApiGateway = {
  fetchListData: async ({url, nextPage}: {url: string; nextPage: string}) => {
    const request = new GNRequest(Method.GET, url)
    request.queryParams = {
      page: nextPage,
    }
    request.useAuthHeader = false
    const response = await Networking.makeApiCall(request)
    console.log('dashboard ---->', response)
    return response.data as any[]
  },
  fetchListDetailData: async (url: string) => {
    const request = new GNRequest(Method.GET, url)
    request.useAuthHeader = false
    const response = await Networking.makeApiCall(request)
    return response.data as any[]
  },
}
