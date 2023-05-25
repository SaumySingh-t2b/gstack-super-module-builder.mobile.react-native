import {BaseWorkflow, type EventEmitter} from '@react-native-granite/core'

import ProfileApiGateway from './apiGateway'
import {PROFILE_EVENTS} from './events'

export class ProfileController extends BaseWorkflow {
  private readonly _emitter: EventEmitter

  constructor(eventEmitter: EventEmitter) {
    super(eventEmitter)
    this._emitter = eventEmitter
  }

  /**
   * Function responsible for deleting the user account
   */
  deleteAccount = async () => {
    this.controlFlow(PROFILE_EVENTS.DELETE_ACCOUNT, async () => {
      await ProfileApiGateway.deleteAccount()
    })
  }
}
