import React, {type PropsWithChildren, useState} from 'react'

import {plainToClass} from 'class-transformer'

import type {
  AuthContextProp,
  AuthContextProps,
  AuthContextPropss,
} from 'src/types'

import {User} from '../workflow/accounts'

const defaultValue: AuthContextPropss = {
  setUserProfile: () => {},
}

export const AuthContext = React.createContext<AuthContextProps>(
  defaultValue as any,
)

export const AuthProvider = ({children}: PropsWithChildren<any>) => {
  const [userProfile, setUserProfile] = useState<User>()

  const authActions: AuthContextProp = {
    userProfile,
    setUserProfile: (profile) => {
      setUserProfile(plainToClass(User, profile))
    },
  }

  return (
    <AuthContext.Provider value={authActions as any}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthProvider = () => React.useContext(AuthContext)
