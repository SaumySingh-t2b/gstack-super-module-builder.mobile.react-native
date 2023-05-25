import React, {useEffect, useCallback, useState} from 'react'
import {
  Alert,
  type KeyboardTypeOptions,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {Layout, Text, Input, Button} from '@ui-kitten/components'
import {EventEmitter, useEventEmitter} from '@react-native-granite/core'
import {PhoneInput} from '@react-native-granite/component'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {FormMetaData, FormsController, FORM_EVENTS} from 'src/workflow/forms'
import STRINGS from '../strings'
import {StringUtils} from 'src/utils'
import {type FormRendererProps} from '../types'
import {useRef} from 'react'

const emitter = new EventEmitter()
const controller = new FormsController(emitter)

export const FormRenderer = ({
  initialFormData,
  formsMetaData,
  metaDataUrl,
}: FormRendererProps) => {
  const isInitialDataLoadedRef = useRef(false)
  //   const [formsMetaData, setFormsMetaData] = useState<any[]>([])
  const [formsInput, setFormsInput] = useState<any>({})
  const [formsInputErrors, setFormsInputErrors] = useState<any>({})
  const [showPassword, setShowPassword] = useState(true)

  const onInputChange = useCallback((metaData: any, value: string) => {
    setFormsInput((prev: any) => ({
      ...prev,
      [metaData.key]: value,
    }))
  }, [])

  const onCountryChange = useCallback((metaData: any, value: string) => {
    setFormsInput((prev: any) => ({
      ...prev,
      [`${metaData.key}Country`]: value,
    }))
  }, [])

  const onSubmitPress = useCallback(
    (formsInputData: any, formsMetaData: any[]) => {
      controller.submitFormsMetaData(formsInputData, formsMetaData)
      console.log('formsInputData', formsInputData)
    },
    [],
  )

  const getKeyboardType = useCallback((metaData: any) => {
    let keyboardType: KeyboardTypeOptions = 'default'
    if (metaData.fieldType === 'email') {
      keyboardType = 'email-address'
    } else if (metaData.fieldType === 'phone') {
      keyboardType = 'numeric'
    }
    return keyboardType
  }, [])

  const loadInitialData = () => {}

  const onFetchSuccess = (metaData: FormMetaData[]) => {
    console.log('onFetchSuccess -----------> metaData', initialFormData)
    const inputFields: any = {}
    metaData.forEach((item) => {
      const key = item.key
      inputFields[key] = initialFormData?.[key] || ''
    })

    setFormsInput(inputFields)
    console.log('onFetchSuccess -> inputFields', inputFields)
    // TODO issue here not getting forms data
    // setFormsMetaData(data)
  }

  useEventEmitter(emitter, (event) => {
    switch (event.type) {
      case FORM_EVENTS.FETCH_META_DATA_SUCCESS:
        onFetchSuccess(event.data)
        break
      case FORM_EVENTS.POST_META_DATA_INVALID_INPUT:
        setFormsInputErrors((prev: any) => ({
          ...prev,
          ...event.data,
        }))
        break
    }
  })

  useEffect(() => {
    console.log('formsMetaData', formsMetaData)

    onFetchSuccess(formsMetaData)
  }, [formsMetaData, initialFormData])

  useEffect(() => {
    if (metaDataUrl) {
      controller.fetchFormsMetaData(metaDataUrl)
    }
  }, [metaDataUrl])

  useEffect(() => {
    if (!isInitialDataLoadedRef) {
      loadInitialData()
    }
  }, [])

  return (
    <Layout style={styles.container}>
      <ScrollView>
        {formsMetaData
          ?.filter((item) => !!item.key)
          ?.map((metaData) =>
            metaData.field_type === 'PHONE' ? (
              <PhoneInput
                key={metaData.key}
                value={formsInput[metaData.key] ?? ''}
                withFlagButton={true}
                disabled={!!metaData.disabled}
                fallbackCountryCode={'IN'}
                onChangeText={(value, status, phone) =>
                  onInputChange(metaData, value)
                }
                onCountryChange={(country) =>
                  onCountryChange(metaData, country.callingCode?.[0])
                }
              />
            ) : (
              <Input
                key={metaData.key}
                style={styles.input}
                placeholder={metaData.placeholder}
                value={formsInput[metaData.key]}
                size="large"
                disabled={!!metaData.disabled}
                onChangeText={(value) => onInputChange(metaData, value)}
                autoCapitalize="none"
                secureTextEntry={
                  showPassword && metaData.field_type === 'PASSWORD'
                }
                accessoryRight={() => (
                  <Layout>
                    {metaData.field_type === 'PASSWORD' ? (
                      <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={24}
                        onPress={() => setShowPassword((prev) => !prev)}
                      />
                    ) : null}
                  </Layout>
                )}
                keyboardType={getKeyboardType(metaData)}
                status={
                  // TODO update TSC version to have suffix type checking for this one
                  formsInputErrors[`${metaData.key}Error`] ? 'danger' : 'basic'
                }
                caption={formsInputErrors[`${metaData.key}Error`]}
                autoCorrect={false}
              />
            ),
          )}
        <Button
          style={styles.button}
          onPress={() => onSubmitPress(formsInput, formsMetaData)}
          size="small">
          {STRINGS.BUTTON_SUBMIT}
        </Button>
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  input: {
    marginVertical: 12,
  },
  button: {
    marginTop: 24,
    marginBottom: 12,
  },
})
