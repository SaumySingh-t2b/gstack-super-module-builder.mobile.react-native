import React, {useState} from 'react'
import {
  Platform,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  Dimensions,
} from 'react-native'
import {type LatLng, type Region} from 'react-native-maps'
import {Layout} from '@ui-kitten/components'
import {GNMapView} from '@react-native-granite/component'

const longitudeDelta = Platform.OS == 'android' ? 0.0421 : 0.004
const latitudeDelta = Platform.OS == 'android' ? 0.0922 : 0.004
const WINDOW_HEIGHTS = Dimensions.get('window').height * 0.88

export const MapViewBuilder = ({
  containerStyle,
  mapStyle,
  isFullScreen,
  location,
  followsUserLocation,
  showsUserLocation,
  supportFullScreen,

  ...rest
}: {
  containerStyle?: StyleProp<TextStyle>
  mapStyle?: StyleProp<TextStyle>
  isFullScreen?: boolean
  location: LatLng
  followsUserLocation: any
  showsUserLocation: any
  supportFullScreen: any
}) => {
  console.log('location', location)
  const [region, setRegion] = useState<Region>({
    latitude: 23.344101,
    longitude: 85.309563,
    ...(location && {location}),
    latitudeDelta,
    longitudeDelta,
  })

  return (
    <Layout style={[containerStyle]}>
      {!region.latitude || !region.longitude ? null : (
        <GNMapView
          style={[styles.map, mapStyle]}
          onMapReady={() => {}}
          showsUserLocation={true}
          region={region}
          showsMyLocationButton={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          containerStyle={[
            styles.container,
            isFullScreen && {height: WINDOW_HEIGHTS},
          ]}
          scrollEnabled={false}
          minZoomLevel={Platform.OS === 'android' ? 16 : 0}
          zoomControlEnabled={true}
          followsUserLocation={true}
          loadingEnabled
          {...rest}
        />
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginVertical: 4,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapIcon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    height: 35,
    width: 50,
    marginVertical: 10,
    position: 'absolute',
  },
})
