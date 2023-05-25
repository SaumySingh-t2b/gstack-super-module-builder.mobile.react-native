import {EventEmitter} from '@react-native-granite/core'
import {PROFILE_EVENTS} from './events'
import {ProfileApiGateway} from './apiGateway'

import {default as Data} from './data.json'
import {OrgApiGateway} from 'src/workflow/organisation/apiGateway'
import {AppSingleton} from 'src/constants'

export class ProfileController {
  private readonly _emitter: EventEmitter

  constructor(eventEmitter: EventEmitter) {
    this._emitter = eventEmitter
  }

  loadInitialData = async () => {
    try {
      const userProfile = await ProfileApiGateway.fetchUserProfile()
      AppSingleton.organisation_id =
        userProfile.organisations?.[0]?.organisation__pk ?? 0
      let appMetaData = await OrgApiGateway.fetchConfigMaster([
        'api_runtime_configuration',
      ])
      appMetaData = appMetaData?.[0]?.extra_data
      let appScreens = await OrgApiGateway.fetchConfigMaster([
        'app_ui_builder_configuration',
      ])
      appScreens = appScreens?.[0]?.extra_data?.screens ?? []

      console.log(
        'ProfileController -> loadInitialData -> appMetaData',
        JSON.stringify({
          appMetaData,
          appScreens,
        }),
      )
      this._emitter.emit(PROFILE_EVENTS.LOAD_INITIAL_DATA_SUCCESS, {
        appMetaData: appMetaData,
        screens: appScreens,
        // screens: Data.screens,
        userProfile,
      })
    } catch (error) {
      console.log('ProfileController -> fetchAppMetaData -> error', error)
    }
  }

  fetchAppMetaData = async () => {
    try {
      const res = await ProfileApiGateway.fetchAppMetaData()
      this._emitter.emit(PROFILE_EVENTS.FETCH_META_DATA_SUCCESS, res)
    } catch (error) {
      console.log('ProfileController -> fetchAppMetaData -> error', error)
    }
  }

  fetchOrganizationSettings = async () => {
    try {
      const res = await ProfileApiGateway.fetchOrganizationSettings()
      this._emitter.emit(PROFILE_EVENTS.FETCH_META_DATA_SUCCESS, res)
    } catch (error) {
      console.log('ProfileController -> fetchAppMetaData -> error', error)
    }
  }

  fetchUserProfile = async () => {
    try {
      this._emitter.emit(PROFILE_EVENTS.FETCH_PROFILE_START)
      //const res = await ProfileApiGateway.fetchUserProfile()
      this._emitter.emit(PROFILE_EVENTS.FETCH_PROFILE_SUCCESS, Data.profile)
    } catch (error: any) {
      this._emitter.emit(PROFILE_EVENTS.FETCH_PROFILE_FAILURE, error?.message)
      console.log('ProfileController -> fetchAppMetaData -> error', error)
    }
  }

  deleteAccount = async () => {
    try {
      this._emitter.emit(PROFILE_EVENTS.DELETE_ACCOUNT_START)
      await ProfileApiGateway.deleteAccount()
      this._emitter.emit(PROFILE_EVENTS.DELETE_ACCOUNT_SUCCESS)
    } catch (error: any) {
      console.log(error)
      this._emitter.emit(
        PROFILE_EVENTS.DELETE_ACCOUNT_FAILURE,
        error?.response?.data?.title,
      )
    }
  }
}
