// Third party libraries imports
import {BaseWorkflow, EventEmitter} from '@react-native-granite/core'

// Project Relative Imports
import {DASHBOARD_EVENTS} from './events'
import DashboardApiGateway from './apiGateway'

export class DashboardController extends BaseWorkflow {
  private readonly _emitter: EventEmitter

  constructor(eventEmitter: EventEmitter) {
    super(eventEmitter)
    this._emitter = eventEmitter
  }
  /**
   * Function responsible for getting the Dashboard data from api
   */
  getDashboardData = async () => {
    this.controlFlow(DASHBOARD_EVENTS.DASHBOARD_DATA_START, async () => {
      const res = await DashboardApiGateway.getDashboardData()
    })
  }
}
