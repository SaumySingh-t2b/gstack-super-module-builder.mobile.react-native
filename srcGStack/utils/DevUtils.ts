let authCreds: any = {}

try {
  authCreds = require('../../authCreds.json')
} catch (error) {
  console.log('Please make a file authCreds.json at the root', error)
}

export const DevUtils = {
  getAuthConfigs: () => {
    if (__DEV__) return authCreds

    return {}
  },
}
