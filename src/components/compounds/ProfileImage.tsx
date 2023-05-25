import React from 'react'

import {Layout} from '@ui-kitten/components'
import Ionicons from 'react-native-vector-icons/Ionicons'

export const ProfileImage = ({size}: any) => {
  return (
    <Layout style={{justifyContent: 'center', alignItems: 'center'}}>
      <Ionicons name={'person'} size={size} />
    </Layout>
  )
}
