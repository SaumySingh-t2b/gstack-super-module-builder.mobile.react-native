import {GNRequest, Method, Networking} from '@react-native-granite/core'
import {ListData} from './entity'
import {LIST_URL} from './url'

class DashboardApiGateway {
  getDashboardData = async () => {
    const endPoint = LIST_URL.PROJECT_LIST

    const request = new GNRequest(Method.GET, endPoint)
    request.queryParams = {
      page_size: 100,
    }

    const response = await Networking.makeApiCall<any>(request)

    return response.data
  }
}

export default new DashboardApiGateway()
