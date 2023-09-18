import React, { useState, useEffect, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import styles from '../styles';
import MainContext from '../context/MainContext';

export default function ({ data }) {
  const { data: dataContext } = useContext(MainContext)
  const [mapRegion, setMapRegion] = useState({
    latitude: -6.217691,
    longitude: 106.92424,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    setMapRegion({
      latitude: dataContext.latitude,
      longitude: dataContext.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <MapView zoomTapEnabled={true} zoomControlEnabled={true} zoomEnabled={true} style={styles.map} region={mapRegion}>
      <Marker coordinate={mapRegion} title="Your Location" pinColor="red" />
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
  )
}