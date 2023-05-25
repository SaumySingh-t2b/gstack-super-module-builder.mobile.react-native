import React from 'react'
import themeSuperApp from './../../theme.json'
export const ThemeContext = React.createContext({
  theme: themeSuperApp,
  toggleTheme: () => {},
})
