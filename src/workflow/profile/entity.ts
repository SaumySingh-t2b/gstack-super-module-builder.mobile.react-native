import {BaseEntity} from '@react-native-granite/core'
import {IsEmail, IsInt, IsString} from 'class-validator'
import {Type, Exclude} from 'class-transformer'
import {User} from 'src/workflow/accounts'

// TODO fix this extends User thing
export class UserProfile extends User {
  // @IsInt()
  // readonly id?: number
  // @Type(() => User) readonly user?: User
}

export class AppMetaData extends BaseEntity {
  readonly base_url?: string
  readonly show_drawer?: boolean
  readonly show_bottom_tabs?: boolean
  readonly bottom_tabs?: BottomTabsEntity[]
}
export class BottomTabsEntity extends BaseEntity {
  readonly route?: string
  readonly title?: string
  readonly label?: string
  readonly url?: string
  readonly iconSize?: number
}

export class AppScreens extends BaseEntity {
  readonly screens?: ScreensEntity[]
}
export class ScreensEntity extends BaseEntity {
  readonly route: string = ''
  readonly title: string = ''
  readonly description?: string
  readonly show_on_drawer?: boolean
  readonly components?: ComponentsEntity[]
}
export class ComponentsEntity extends BaseEntity {
  readonly name: string = ''
  readonly props?: object
}
class Props {
  baseUrl?: string | null
  url?: string | null
  emptyItemTitle?: string | null
  emptyItemSubtitle?: string | null
  itemType?: string | null
  itemActionRoute_?: string | null
  itemActionRoute?: string | null
  itemMapping?: ItemMapping | null
  // map view
  followsUserLocation?: boolean | null
  location?: Location | null
  supportFullScreen?: boolean | null
}

class ItemMapping {
  readonly title?: string
  readonly subtitle?: string
  readonly imageProps?: ImageProps
}
class ImageProps {
  readonly url?: string
  readonly shape?: string
}
interface Location {
  latitude: number
  longitude: number
}
