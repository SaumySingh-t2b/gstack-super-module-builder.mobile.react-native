import {EventEmitter} from '@react-native-granite/core'
import {DASHBOARD_EVENTS} from './events'

import DashboardApiGateway from './apiGateway'

export class DashboardDataInflator {
  private readonly emitter: EventEmitter

  constructor(eventEmitter: EventEmitter) {
    this.emitter = eventEmitter
  }

  loadListData = async () => {
    try {
      this.emitter.emit(DASHBOARD_EVENTS.DASHBOARD_DATA_START)
      const listData = await DashboardApiGateway.getDashboardData()

      this.emitter.emit(DASHBOARD_EVENTS.DASHBOARD_DATA_SUCCESS, listData)
    } catch (error: any) {
      console.log(error)
      this.emitter.emit(
        DASHBOARD_EVENTS.DASHBOARD_DATA_FAILURE,
        error?.response?.data?.title,
      )
    }
  }
}
