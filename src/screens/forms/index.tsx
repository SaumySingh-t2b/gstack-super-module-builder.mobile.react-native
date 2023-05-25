import React, {useEffect, useCallback, useState} from 'react'
import {StyleSheet} from 'react-native'
import {EventEmitter, useEventEmitter} from '@react-native-granite/core'

import type {AppScreenProps} from 'src/types'
import {FormMetaData, FormsController, FORM_EVENTS} from 'src/workflow/forms'
import STRINGS from './strings'
import {FormRenderer} from 'src/components'
import {User} from 'src/workflow/accounts'
import {SafeAreaView} from '@react-native-granite/component'

const emitter = new EventEmitter()
const controller = new FormsController(emitter)

export const FormsScreen = ({
  navigation,
  route,
}: AppScreenProps<'FormsScreen'>) => {
  const {entityName} = route.params

  const [entity, setEntity] = useState<any>()
  const [formsMetaData, setFormsMetaData] = useState<FormMetaData[]>([])

  const onFetchSuccess = (data: any[]) => {
    const inputFields: any = {}
    data.forEach((item) => {
      const key: keyof User = item.key
      inputFields[key] = entity?.[key] || ''
    })

    console.log('onFetchSuccess -> inputFields', inputFields)
    setFormsMetaData(data)
  }

  useEventEmitter(emitter, (event) => {
    switch (event.type) {
      case FORM_EVENTS.FETCH_ENTITY_CONFIG_SUCCESS:
        onFetchSuccess(event.data)
        console.log('event.data', event.data)
        break
    }
  })

  useEffect(() => {
    controller.fetchEntityConfigs(entityName)
  }, [])

  return (
    <SafeAreaView>
      <FormRenderer formsMetaData={formsMetaData} initialFormData={entity} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
