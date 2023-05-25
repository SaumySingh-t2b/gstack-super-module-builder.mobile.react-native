import {
  BaseWorkflow,
  type EventEmitter,
  LocalStorage,
  Networking,
} from '@react-native-granite/core'

import {ENDPOINTS, STORAGE_KEYS} from './../../constants'
import {StringUtils} from './../../utils'

import AccountsApiGateway from './apiGateway'
import {AUTH_EVENTS} from './events'

export class AccountsController extends BaseWorkflow {
  private readonly _emitter: EventEmitter

  constructor(eventEmitter: EventEmitter) {
    super(eventEmitter)
    this._emitter = eventEmitter
  }

  /**
   * Function responsible for validating inputs and calling Login API
   */
  login = async (email: string, password: string) => {
    const errorMessage = {emailError: '', passwordError: ''}
    if (!StringUtils.isValidEmail(email))
      errorMessage.emailError = 'Invalid email address'
    if (password.length < 6)
      errorMessage.passwordError = 'Password must be of 6 digits'

    if (errorMessage.emailError || errorMessage.passwordError) {
      this._emitter.emit(AUTH_EVENTS.INVALID_INPUT, errorMessage)
      return
    }

    this.controlFlow(AUTH_EVENTS.LOGIN_ACTION, async () => {
      const response = await AccountsApiGateway.signIn({email, password})
      await LocalStorage.set(STORAGE_KEYS.AUTH_TOKEN, response.access_token)
    })
  }

  /**
   * Function responsible for validating inputs and calling SignUp API
   */
  signUp = async ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => {
    const errorMessage = {emailError: '', passwordError: ''}
    if (!StringUtils.isValidEmail(email))
      errorMessage.emailError = 'Invalid email address'
    if (password.length < 6)
      errorMessage.passwordError = 'Password must be of 6 digits'

    if (errorMessage.emailError || errorMessage.passwordError) {
      this._emitter.emit(AUTH_EVENTS.INVALID_INPUT, errorMessage)
      return
    }

    this.controlFlow(AUTH_EVENTS.SIGNUP_ACTION, async () => {
      await AccountsApiGateway.signUp({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })
    })
  }

  /**
   * Function responsible for validating inputs and calling Reset Password API
   */
  resetPassword = async (email: string) => {
    this._emitter.emit(AUTH_EVENTS.RESET_PASSWORD.START)
    if (!StringUtils.isValidEmail(email)) {
      this._emitter.emit(AUTH_EVENTS.INVALID_INPUT, 'Invalid email address')
      return
    }

    this.controlFlow(AUTH_EVENTS.RESET_PASSWORD, async () => {
      await AccountsApiGateway.resetPassword({email})
    })
  }

  /**
   * Function responsible for calling VerifyToken API
   */
  verifyToken = async (email: string, token: string) => {
    this.controlFlow(AUTH_EVENTS.VERIFICATION_ACTION, async () => {
      await AccountsApiGateway.verifyToken({email, token})
    })
  }

  /**
   * Function responsible for calling ResendToken API
   */
  resendToken = async (email: string) => {
    this.controlFlow(AUTH_EVENTS.RESEND_TOKEN, async () => {
      await AccountsApiGateway.resendToken({email})
    })
  }

  /**
   * Function responsible for changing the env
   */
  switchEnvironment = async (env: string) => {
    ENDPOINTS.API_END_POINT = StringUtils.getApiEndPoint(env)
    console.log(
      'AccountsController -> switchEnvironment -> ENDPOINTS.API_END_POINT',
      env,
      ENDPOINTS.API_END_POINT,
    )
    await LocalStorage.set(STORAGE_KEYS.CURRENT_ENV, env)
    Networking.configure(ENDPOINTS.API_END_POINT ?? '')
  }
}
