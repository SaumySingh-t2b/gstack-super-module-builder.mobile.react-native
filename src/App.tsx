import 'react-native-gesture-handler'
import React from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import {GraniteContainer} from '@react-native-granite/core'
import {IconRegistry} from '@ui-kitten/components'
import {EvaIconsPack} from '@ui-kitten/eva-icons'

import {RootNavigator} from 'src/navigation'
import {PushNotificationHandler} from 'src/screens/notifications/PushNotificationHandler'

import {AuthProvider} from './context'
import superAppTheme from '../theme.json'
import subAppTheme from '../subAppTheme.json'
import {ThemeContext} from './context/ThemeContext'

const App = () => {
  const [theme, setTheme] = React.useState(superAppTheme)

  const toggleTheme = () => {
    const nextTheme = theme === superAppTheme ? subAppTheme : superAppTheme
    setTheme(nextTheme)
  }
  //TODO remove inlinse style
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <GraniteContainer theme={theme} isDark={false}>
          <AuthProvider>
            <RootNavigator />
            <PushNotificationHandler />
          </AuthProvider>
          <IconRegistry icons={EvaIconsPack} />
        </GraniteContainer>
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  )
}

export default App
