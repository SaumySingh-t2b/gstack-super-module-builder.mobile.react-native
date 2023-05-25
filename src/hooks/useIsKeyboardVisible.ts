import React, {useCallback, useEffect, useState} from 'react'
import {Keyboard} from 'react-native'

export const useIsKeyboardVisible = ({
  ...rest
}: {
  onShowKeyboard?: () => void
  onHideKeyboard?: () => void
} = {}) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  const onShowKeyboard = useCallback(() => {
    setIsKeyboardVisible(true)
    rest?.onShowKeyboard?.()
  }, [])

  const onHideKeyboard = useCallback(() => {
    setIsKeyboardVisible(false)
    rest?.onHideKeyboard?.()
  }, [])

  React.useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', onShowKeyboard)
    const hideListener = Keyboard.addListener('keyboardDidHide', onHideKeyboard)
    return () => {
      if (typeof showListener == 'function') {
        showListener?.remove?.()
        hideListener?.remove?.()
      } else {
        Keyboard.removeListener('keyboardDidShow', onShowKeyboard)
        Keyboard.removeListener('keyboardDidHide', onHideKeyboard)
      }
    }
  }, [])

  return {isKeyboardVisible}
}
