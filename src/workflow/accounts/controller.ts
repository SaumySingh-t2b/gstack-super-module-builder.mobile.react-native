import {
  EventEmitter,
  LocalStorage,
  Networking,
} from '@react-native-granite/core'
import {AUTH_EVENTS} from './events'
import AccountsApiGateway from './AccountsApiGateway'
import {AuthUtil, StringUtils} from 'src/utils'
import {ENDPOINTS, STORAGE_KEYS} from 'src/constants'

export class AccountsController {
  private readonly emitter: EventEmitter

  constructor(eventEmitter: EventEmitter) {
    this.emitter = eventEmitter
  }

  /**
   * Function responsible for validating inputs and calling Login API
   * @param email Email
   * @param password Password
   */
  login = async (email: string, password: string) => {
    try {
      this.emitter.emit(AUTH_EVENTS.LOGIN_START)
      let errorMessage = {emailError: '', passwordError: ''}
      if (!StringUtils.isValidEmail(email))
        errorMessage.emailError = 'Invalid email address'
      if (password.length < 6)
        errorMessage.passwordError = 'Password must be of 6 digits'

      if (errorMessage.emailError || errorMessage.passwordError) {
        this.emitter.emit(AUTH_EVENTS.INVALID_INPUT, errorMessage)
        return
      }
      const response = await AccountsApiGateway.signIn(email, password)
      await AuthUtil.setAuthToken(response.access_token!!)
      await AuthUtil.loadAuthToken()
      this.emitter.emit(AUTH_EVENTS.LOGIN_SUCCESS)
    } catch (error: any) {
      console.log(error)
      this.emitter.emit(AUTH_EVENTS.LOGIN_FAILURE, error?.response?.data?.title)
    }
  }

  /**
   * Function responsible for validating inputs and calling SignUp API
   * @param firstName First name
   * @param lastName Last name
   * @param email Email address
   * @param password Password
   * @returns
   */
  signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    try {
      this.emitter.emit(AUTH_EVENTS.SIGNUP_START)
      let errorMessage = {emailError: '', passwordError: ''}
      if (!StringUtils.isValidEmail(email))
        errorMessage.emailError = 'Invalid email address'
      if (password.length < 6)
        errorMessage.passwordError = 'Password must be of 6 digits'

      if (errorMessage.emailError || errorMessage.passwordError) {
        this.emitter.emit(AUTH_EVENTS.INVALID_INPUT, errorMessage)
        return
      }
      await AccountsApiGateway.signUp(firstName, lastName, email, password)
      this.emitter.emit(AUTH_EVENTS.SIGNUP_SUCCESS)
    } catch (error: any) {
      console.log(error)
      this.emitter.emit(
        AUTH_EVENTS.SIGNUP_FAILURE,
        error?.response?.data?.title,
      )
    }
  }

  /**
   * Function responsible for validating inputs and calling Reset Password API
   * @param email Email
   */
  resetPassword = async (email: string) => {
    try {
      this.emitter.emit(AUTH_EVENTS.RESET_PASSWORD_START)
      if (!StringUtils.isValidEmail(email)) {
        this.emitter.emit(AUTH_EVENTS.INVALID_INPUT, 'Invalid email address')
        return
      }
      await AccountsApiGateway.resetPassword(email)
      this.emitter.emit(AUTH_EVENTS.RESET_PASSWORD_SUCCESS)
    } catch (error: any) {
      console.log(error)
      this.emitter.emit(
        AUTH_EVENTS.RESET_PASSWORD_FAILURE,
        error?.response?.data?.title,
      )
    }
  }

  /**
   * Function responsible for calling VerifyToken API
   * @param email Email address
   * @param token Verification token
   */
  verifyToken = async (email: string, token: string) => {
    try {
      this.emitter.emit(AUTH_EVENTS.VERIFICATION_START)
      await AccountsApiGateway.verifyToken(email, token)
      this.emitter.emit(AUTH_EVENTS.VERIFICATION_SUCCESS)
    } catch (error: any) {
      console.log(error)
      this.emitter.emit(
        AUTH_EVENTS.VERIFICATION_FAILURE,
        error?.response?.data?.title,
      )
    }
  }

  /**
   * Function responsible for calling ResendToken API
   * @param email Email address
   */
  resendToken = async (email: string) => {
    try {
      this.emitter.emit(AUTH_EVENTS.RESEND_TOKEN_START)
      await AccountsApiGateway.resendToken(email)
      this.emitter.emit(AUTH_EVENTS.RESEND_TOKEN_SUCCESS)
    } catch (error: any) {
      console.log(error)
      this.emitter.emit(
        AUTH_EVENTS.RESEND_TOKEN_FAILURE,
        error?.response?.data?.title,
      )
    }
  }

  /**
   * Function responsible for changing the env
   */
  switchEnvironment = async (env: string) => {
    return
    ENDPOINTS.API_END_POINT = StringUtils.getApiEndPoint(env) as string
    console.log(
      'AccountsController -> switchEnvironment -> ENDPOINTS.API_END_POINT',
      env,
      ENDPOINTS.API_END_POINT,
    )
    await LocalStorage.set(STORAGE_KEYS.CURRENT_ENV, env)
    Networking.configure(ENDPOINTS.API_END_POINT ?? '')
  }
}
