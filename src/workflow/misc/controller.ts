import {EventEmitter} from '@react-native-granite/core'
import {plainToClass} from 'class-transformer'

import {MISC_EVENTS} from './events'
import {default as Data} from './data.json'
import {MiscApiGateway} from './apiGateway'
import {ComponentRendererData} from './entity'
import type {QueryParams} from '@react-native-granite/core/lib/types'

export class MiscController {
  private readonly _emitter: EventEmitter

  constructor(eventEmitter: EventEmitter) {
    this._emitter = eventEmitter
  }

  fetchComponentsMetaData = (url: string) => {
    try {
      const res = plainToClass(ComponentRendererData, Data.components)
      this._emitter.emit(MISC_EVENTS.FETCH_META_DATA_SUCCESS, res)
    } catch (error) {
      console.log('FormsController -> fetchFormsMetaData -> error', error)
    }
  }

  fetchListData = async ({
    url = '',
    baseUrl,
    prevList = [],
    nextPage = 1,
    queryParams,
  }: {
    url?: string
    baseUrl?: string
    prevList?: any[]
    nextPage?: number
    queryParams?: QueryParams
  }) => {
    try {
      this._emitter.emit(MISC_EVENTS.FETCH_LIST_DATA_START, {nextPage})
      const res = await MiscApiGateway.fetchListData({
        url,
        baseUrl,
        page: nextPage,
        queryParams,
      })
      const newList = [...prevList, ...(res?.results ?? res)]

      this._emitter.emit(MISC_EVENTS.FETCH_LIST_DATA_SUCCESS, {
        list: newList,
        nextPage: res?.next_page || nextPage + 1,
      })
    } catch (error) {
      this._emitter.emit(MISC_EVENTS.FETCH_LIST_DATA_FAILURE)
      console.log(
        'MiscController -> fetchListData -> error',
        JSON.stringify(error),
      )
    }
  }
}
