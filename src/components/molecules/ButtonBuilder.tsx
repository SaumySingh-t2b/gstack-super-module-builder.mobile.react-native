import React from 'react'
import {Layout, Button, Spinner} from '@ui-kitten/components'
import type {ButtonBuilderProps} from '../types'

/**
 *
 * A custom button which contains both a button and it's corresponding alert that will be triggered on button press
 */
export const ButtonBuilder = ({
  title,
  containerStyle,
  buttonStyle,
  onPress,
  isLoading,
  ...rest
}: ButtonBuilderProps) => {
  const onButtonPress = () => {
    if (isLoading) return
    onPress?.()
  }

  return (
    <Layout style={[containerStyle]}>
      <Button
        style={[buttonStyle]}
        size="medium"
        onPress={onButtonPress}
        accessoryRight={() =>
          isLoading ? <Spinner size={'small'} status={'basic'} /> : <></>
        }
        {...rest}>
        {title}
      </Button>
    </Layout>
  )
}
