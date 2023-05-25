import {EventEmitter} from '@react-native-granite/core'
import {ORG_EVENTS} from './events'
import {OrgApiGateway} from './apiGateway'

export class OrganisationController {
  private readonly _emitter: EventEmitter

  constructor(eventEmitter: EventEmitter) {
    this._emitter = eventEmitter
  }

  fetchOrganizationSettings = async () => {
    try {
      const res = await OrgApiGateway.fetchOrganizationSettings()
      this._emitter.emit(ORG_EVENTS.FETCH_ORG_SETTINGS_SUCCESS, res)
    } catch (error) {
      console.log('ProfileController -> fetchAppMetaData -> error', error)
    }
  }

  fetchConfigMaster = async (keys: string[]) => {
    try {
      const res = await OrgApiGateway.fetchConfigMaster(keys)
      console.log('OrganisationController -> fetchConfigMaster -> res', res)
      this._emitter.emit(ORG_EVENTS.FETCH_CONFIG_MASTER_SUCCESS, res.results)
    } catch (error) {
      console.log('ProfileController -> fetchAppMetaData -> error', error)
    }
  }
}
