import React, {useState} from 'react'
import {StyleSheet} from 'react-native'

import {ModalContainer} from '@react-native-granite/component'
import {EventEmitter} from '@react-native-granite/core'
import {Button, Layout, Radio, RadioGroup, Text} from '@ui-kitten/components'

import {EnvTypes} from 'src/types'
import {AccountsController} from 'src/workflow/accounts'

import STRINGS from '../strings'
import type {EnvironmentSelectModalProps} from '../types'

const eventEmitter = new EventEmitter()
const controller = new AccountsController(eventEmitter)

const ENV_LIST = Object.keys(EnvTypes)

export const EnvironmentSelectModal = ({
  visible,
  onDismiss,
}: EnvironmentSelectModalProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onRadioButtonPress = async (index: number) => {
    // @ts-expect-error need to fix the typing here
    controller.switchEnvironment(EnvTypes[ENV_LIST[index]])
    onDismiss()
  }

  return (
    <ModalContainer visible={visible}>
      <Text category="h6" style={styles.textStyle}>
        {STRINGS.SELECT_AN_ENVIRONMENT}
      </Text>
      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index)
        }}>
        {ENV_LIST.map((item, index) => (
          <Radio key={index}>{item}</Radio>
        ))}
      </RadioGroup>
      <Layout style={styles.buttonStyle}>
        <Button
          status={'basic'}
          onPress={() => {
            onRadioButtonPress(selectedIndex)
          }}>
          {STRINGS.OKAY}
        </Button>
      </Layout>
    </ModalContainer>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignContent: 'flex-end',
    marginVertical: 8,
  },
  textStyle: {
    textAlign: 'center',
    marginVertical: 8,
  },
})
