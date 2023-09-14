import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function MapComponent() {
  const [mapRegion, setMapRegion] = useState({
    latitude: -6.217691,
    longitude: 106.92424,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    // setMapRegion({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });
    setMapRegion({
      latitude: -6.217691,
      longitude: 106.92424,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  }

  useEffect(() => {
    userLocation();
  }, []);
  return (
    <>
      <MapView
        zoomTapEnabled={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        style={styles.map}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='Marker' />
      </MapView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Platform.OS === 'ios' ? 320 : 200,
  },
});

export default MapComponent