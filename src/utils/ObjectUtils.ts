import {ObjectUtils as ObjectUtil} from '@react-native-granite/core/lib/utils'
//TODO move to granite
export const ObjectUtils = {
  // TODO handle . thing here instead of all over the place
  getValueAtPath(obj: any, path?: string) {
    return path ? ObjectUtil.getValueAtPath(obj, path ?? '') : ''
  },
}
