import {EventEmitter} from '@react-native-granite/core'
import {FORM_EVENTS} from './events'
import {plainToClass} from 'class-transformer'

import {default as Data} from './data.json'
import {StringUtils} from 'src/utils/StringUtils'
import STRINGS from 'src/components/strings'
import {FormMetaData} from './entity'
import {FormsApiGateway} from 'src/workflow/forms/apiGateway'

export class FormsController {
  private readonly _emitter: EventEmitter

  constructor(eventEmitter: EventEmitter) {
    this._emitter = eventEmitter
  }

  fetchEntityConfigs = async (entityName: string) => {
    try {
      const res = await FormsApiGateway.fetchEntityConfigs(entityName)
      const entityObj =
        res.find((item: any) => item.table_name == entityName)?.properties ?? {}
      // const entityMetaData: FormMetaData[] = Object.keys((key:string)=> {
      // })
      this._emitter.emit(FORM_EVENTS.FETCH_ENTITY_CONFIG_SUCCESS, res)
    } catch (error) {
      console.log('FormsController -> fetchEntityConfigs -> error', error)
    }
  }

  fetchFormsMetaData = (url: string) => {
    try {
      // items keys is generated on the mobile side using placeholders to have less data on APIs
      const res = plainToClass(FormMetaData, Data.formMetaData).map((item) => ({
        ...item,
        key: StringUtils.toSnakeCase(item.placeholder),
      }))
      this._emitter.emit(FORM_EVENTS.FETCH_META_DATA_SUCCESS, res)
    } catch (error) {
      console.log('FormsController -> fetchFormsMetaData -> error', error)
    }
  }

  /**
   *
   * @param formsInputData The input data state of FormRenderer
   * @param formsMetaData Forms metadata
   * @returns
   */
  private validateInputs = (formsInputData: any, formsMetaData: any[]) => {
    let errorObj: any = {}

    formsMetaData.forEach((item) => {
      if (item.isRequired) {
        let error = formsInputData[item.key] ? '' : STRINGS.INPUT_REQUIRED

        if (formsInputData[item.key] && item.fieldType === 'email') {
          const isValid = StringUtils.isValidEmail(formsInputData[item.key])
          if (!isValid) {
            error = STRINGS.INVALID_EMAIL
          }
        }

        errorObj = {
          ...errorObj,
          [`${item.key}Error`]: error,
        }
      }
    })
    return errorObj
  }

  submitFormsMetaData = (formsInputData: any, formsMetaData: any[]) => {
    try {
      const error = this.validateInputs(formsInputData, formsMetaData)
      this._emitter.emit(FORM_EVENTS.POST_META_DATA_INVALID_INPUT, error)
      const isValidationFailed = Object.values(error).some((value) => !!value)
      console.log(
        'FormsController -> submitFormsMetaData -> isValidationFailed',
        isValidationFailed,
      )
      if (isValidationFailed) return

      this._emitter.emit(FORM_EVENTS.POST_META_DATA_SUCCESS)
    } catch (error) {
      console.log('FormsController -> submitFormsMetaData -> error', error)
    }
  }
}
