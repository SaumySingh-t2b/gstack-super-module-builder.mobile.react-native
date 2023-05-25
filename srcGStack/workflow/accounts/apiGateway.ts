import {GNRequest, Method, Networking} from '@react-native-granite/core'

import {SECRET_KEYS} from './../../constants'

import {type LoginResponse} from './entity'
import {ACCOUNTS_URL} from './url'

const AccountsApiGateway = {
  signIn: async (body: {email: string; password: string}) => {
    const request = new GNRequest(Method.POST, ACCOUNTS_URL.LOGIN)
    request.body = body
    request.headersExtra = {client: SECRET_KEYS.CLIENT_ID}
    const response = await Networking.makeApiCall<LoginResponse>(request)
    return response.data as LoginResponse
  },

  signUp: async (body: {
    first_name: string
    last_name: string
    email: string
    password: string
  }) => {
    const request = new GNRequest(Method.POST, ACCOUNTS_URL.REGISTER)
    request.body = body
    await Networking.makeApiCall(request)
  },

  resetPassword: async (body: {email: string}) => {
    const request = new GNRequest(Method.POST, ACCOUNTS_URL.RESET_PASSWORD)
    request.body = body
    await Networking.makeApiCall(request)
  },

  verifyToken: async (body: {email: string; token: string}) => {
    const request = new GNRequest(Method.POST, ACCOUNTS_URL.VERIFY_TOKEN)
    request.body = body
    await Networking.makeApiCall(request)
  },

  resendToken: async (body: {email: string}) => {
    const request = new GNRequest(Method.POST, ACCOUNTS_URL.RESEND_TOKEN)
    request.body = body
    await Networking.makeApiCall(request)
  },
}

export default AccountsApiGateway
