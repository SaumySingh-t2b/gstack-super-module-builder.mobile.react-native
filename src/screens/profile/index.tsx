import React, {useEffect, useCallback, useState, useLayoutEffect} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {Layout, Text, Button, useTheme} from '@ui-kitten/components'
import {EventEmitter, useEventEmitter} from '@react-native-granite/core'
import {
  HeaderIcon,
  PhoneInput,
  ProfileImage,
} from '@react-native-granite/component'
import Ionicons from 'react-native-vector-icons/Ionicons'

import type {AppScreenProps} from 'src/types'
import STRINGS from './strings'
import {
  ProfileController,
  PROFILE_EVENTS,
  UserProfile,
} from 'src/workflow/profile'
import {HamburgerIcon, ListItem} from 'src/components'
import {useAuthProvider} from 'src/context'
import {SafeAreaView} from 'src/components/atoms/SafeAreaView'

import {MapViewBuilder} from 'src/components'
const emitter = new EventEmitter()
const userProfileController = new ProfileController(emitter)

export const Profile = ({navigation}: AppScreenProps<'Profile'>) => {
  const theme = useTheme()
  const {appMetaData, userProfile} = useAuthProvider()

  //const [userProfile, setProfile] = useState<UserProfile>()

  useLayoutEffect(() => {
    navigation.setOptions({
      // TODO handle for back image
      headerLeft: () =>
        appMetaData?.show_drawer ? <HamburgerIcon theme={theme} /> : null,

      headerRight: () => (
        <HeaderIcon
          Icon={<Ionicons name={'pencil-sharp'} size={24} color={'white'} />}
          onPress={() =>
            navigation.navigate('EditProfileScreen', {
              profile: userProfile!,
            })
          }
        />
      ),
    })
  }, [userProfile])

  useEffect(() => {
    userProfileController.fetchUserProfile()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* <SearchViewBuilder
        baseUrl="https://jsonplaceholder.typicode.com/"
        url="posts/"
        maxListHeight={200}
        itemMapping={{
          title: '.title',
          subtitle: '.body',
        }}
      /> */}
      <ScrollView>
        <Layout style={styles.center}>
          <ProfileImage
            size={128}
            shape={'CIRCLE'}
            resizeMode={'center'}
            url={userProfile?.profile_image}
          />
          <Text style={styles.text} category={'h6'}>
            {userProfile?.first_name ?? ''} {userProfile?.last_name ?? ''}
          </Text>
          {userProfile?.phone ? (
            <Text style={styles.text} category={'p2'}>
              {'+'}
              {userProfile?.country_code ?? ''} {userProfile?.phone ?? ''}
            </Text>
          ) : null}
          <Text style={styles.text} category={'p2'}>
            {userProfile?.email}
          </Text>
        </Layout>
        {userProfile?.organisations?.map((item, index) => (
          <Layout key={item.organisation__pk + 'Layout' + index}>
            <ListItem
              containerStyle={styles.text}
              index={index}
              item={item}
              itemMapping={{
                title: '.organisation__name',
                subtitle: '.organisation__user_id',
                imageUrl: '.organisation__logo__document',
                imageShape: 'SQUARE',
              }}
            />
          </Layout>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    marginVertical: 6,
  },
  logOutText: {
    marginEnd: 6,
    textDecorationLine: 'underline',
  },
  input: {
    marginVertical: 12,
  },
  button: {
    marginTop: 24,
    marginBottom: 12,
  },
})
