import {EventEmitter} from '@react-native-granite/core'
import {DASHBOARD_EVENTS} from './events'
import {DashboardApiGateway} from './apiGateway'

import {default as Data} from './data.json'

export class DashboardController {
  private readonly _emitter: EventEmitter

  constructor(eventEmitter: EventEmitter) {
    this._emitter = eventEmitter
  }

  fetchListMetaData = () => {
    try {
      this._emitter.emit(
        DASHBOARD_EVENTS.FETCH_META_DATA_SUCCESS,
        Data.listMetaData,
      )
    } catch (error) {
      console.log('HomeController -> fetchListMetaData -> error', error)
    }
  }

  fetchDetailMetaData = () => {
    try {
      this._emitter.emit(
        DASHBOARD_EVENTS.FETCH_DETAIL_META_DATA_SUCCESS,
        Data.detailMetaData,
      )
    } catch (error) {
      console.log('DashboardController -> fetchDetailMetaData -> error', error)
    }
  }

  fetchListData = async (
    metaData: any,
    nextPage: string = '1',
    prevList: any[] = [],
  ) => {
    this._emitter.emit(DASHBOARD_EVENTS.FETCH_LIST_DATA_START)
    try {
      const res = await DashboardApiGateway.fetchListData({
        ...metaData,
        nextPage,
      })
      const newList = [...prevList, ...res]
      this._emitter.emit(DASHBOARD_EVENTS.FETCH_LIST_DATA_SUCCESS, newList)
    } catch (error: any) {
      console.log('HomeController -> error', error)
      this._emitter.emit(
        DASHBOARD_EVENTS.FETCH_LIST_DATA_FAILURE,
        error?.message,
      )
    }
  }

  fetchListDetailData = async (id: string | number, metaData: any) => {
    this._emitter.emit(DASHBOARD_EVENTS.FETCH_LIST_DATA_START)
    try {
      const res = await DashboardApiGateway.fetchListDetailData(metaData.url)
      this._emitter.emit(DASHBOARD_EVENTS.FETCH_LIST_DETAIL_DATA_SUCCESS, {
        res,
        components: Data.listMetaData.components,
      })
    } catch (error: any) {
      console.log('DashboardController -> error', error)
      this._emitter.emit(
        DASHBOARD_EVENTS.FETCH_LIST_DATA_FAILURE,
        error?.message,
      )
    }
  }
}
