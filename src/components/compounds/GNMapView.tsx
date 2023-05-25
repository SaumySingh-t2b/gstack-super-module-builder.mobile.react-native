import React, {useState} from 'react'
import {
  Dimensions,
  Platform,
  type StyleProp,
  StyleSheet,
  type TextStyle,
} from 'react-native'
import MapView, {type LatLng, type Region} from 'react-native-maps'
import {Layout} from '@ui-kitten/components'

const longitudeDelta = Platform.OS == 'android' ? 0.0421 : 0.004
const latitudeDelta = Platform.OS == 'android' ? 0.0922 : 0.004
const {width} = Dimensions.get('screen')

export const GNMapView = ({
  containerStyle,
  mapStyle,
  isSmall,
  location,
  ...rest
}: {
  containerStyle?: StyleProp<TextStyle>
  mapStyle?: StyleProp<TextStyle>
  isSmall?: boolean
  location: LatLng
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
        <MapView
          style={[styles.map, mapStyle]}
          onMapReady={() => {}}
          showsUserLocation={true}
          region={region}
          showsMyLocationButton={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          scrollEnabled={true}
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
    marginTop: 30,
  },
  map: {
    width: width,
    height: 180,
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
