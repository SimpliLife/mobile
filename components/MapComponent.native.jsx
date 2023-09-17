import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MapComponent({ data }) {
  const [mapRegion, setMapRegion] = useState({
    latitude: -6.217691,
    longitude: 106.92424,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    let location = await AsyncStorage.getItem('location');
    location = JSON.parse(location);

    setMapRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
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
        {/* User's Location Marker */}
        <Marker
          coordinate={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude
          }}
          title="Your Location"
          pinColor="red" // Change the pin color for the user's location
        />

        {/* Facility Location Markers */}
        {data.map((facility, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: facility.lat,
              longitude: facility.lng
            }}
            title={facility.facility} // Replace with the appropriate property from your facility data
            pinColor="blue" // Change the pin color for facility locations
          />
        ))}
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

export default MapComponent;
