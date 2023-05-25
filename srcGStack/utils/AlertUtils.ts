import {Alert, type AlertButton, type AlertOptions} from 'react-native'

export const AlertUtils = {
  showAlert: (
    message: string,
    title = 'Alert',
    buttons?: AlertButton[],
    options?: AlertOptions,
  ) => {
    if (!message) return
    Alert.alert(title, message, buttons, options)
  },
}
