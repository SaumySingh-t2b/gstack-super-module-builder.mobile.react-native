import {Networking, Method, GNRequest} from '@react-native-granite/core'
import Config from 'react-native-config'
import {LoginResponse} from './entity'
import {ACCOUNTS_URL} from './url'

class AccountsApiGateway {
  /**
   * Function to call sign-in API
   * @param email Validated email
   * @param password Validated password
   * @returns LoginResponse
   */
  signIn = async (email: string, password: string) => {
    const request = new GNRequest(Method.POST, ACCOUNTS_URL.LOGIN)
    request.body = {email, password}
    request.headersExtra = {client: Config.CLIENT_ID}
    const response = await Networking.makeApiCall<LoginResponse>(request)
    console.log('AccountsApiGateway -> signIn -> response', response)
    return response.data as LoginResponse
  }

  /**
   * Function to call sign-up API
   * @param first_name Validated first name
   * @param last_name Validated last Name
   * @param email Validated email
   * @param password Validated password
   */
  signUp = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  ) => {
    const request = new GNRequest(Method.POST, ACCOUNTS_URL.REGISTER)
    request.body = {first_name, last_name, email, password}
    await Networking.makeApiCall(request)
  }

  /**
   * Function to call reset password API
   * @param email Validated email
   */
  resetPassword = async (email: string) => {
    const request = new GNRequest(Method.POST, ACCOUNTS_URL.RESET_PASSWORD)
    request.body = {email}
    await Networking.makeApiCall(request)
  }

  /**
   * Function to get verification token
   * @param email Validated Email
   * @param token Token
   */
  verifyToken = async (email: string, token: string) => {
    const request = new GNRequest(Method.POST, ACCOUNTS_URL.VERIFY_TOKEN)
    request.body = {email, token}
    await Networking.makeApiCall(request)
  }

  /**
   * Function to resend verification token
   * @param email Validated email
   */
  resendToken = async (email: string) => {
    const request = new GNRequest(Method.POST, ACCOUNTS_URL.RESEND_TOKEN)
    request.body = {email}
    await Networking.makeApiCall(request)
  }
}

export default new AccountsApiGateway()
