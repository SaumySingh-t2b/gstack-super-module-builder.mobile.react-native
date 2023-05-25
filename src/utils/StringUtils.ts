import Config from 'react-native-config'

//TODO move to granite
export const StringUtils = {
  isValidEmail(email: string) {
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email.length > 0 && emailPattern.test(email)
  },
  getApiEndPoint(env: string) {
    return env == 'prod'
      ? Config.API_END_POINT
      : Config.API_END_POINT?.replace('api', 'api-' + env)
  },

  toSnakeCase: (input?: string) => {
    if (!input) return ''
    return input.replace(/\s/g, '_').toLowerCase()
  },
}
