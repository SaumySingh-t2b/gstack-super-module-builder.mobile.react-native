import {Alert, type AlertButton, type AlertOptions} from 'react-native'

export const AlertUtils = {
  showAlert: (
    message: string,
    title = 'Alert',
    buttons?: Array<AlertButton>,
    options?: AlertOptions,
  ) => {
    if (!message) return
    return Alert.alert(title, message, buttons, options)
  },
}
