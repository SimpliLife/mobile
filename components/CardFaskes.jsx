import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, Button, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Component({ data }) {
  const [distance, setDistance] = useState(null);
  const [distanceUnit, setDistanceUnit] = useState('meters'); // Default distance unit

  useEffect(() => {
    calculateDistance();
  }, []);

  const calculateDistance = async () => {
    try {
      const location = await AsyncStorage.getItem('location');
      if (location) {
        const locationCoords = JSON.parse(location);
        const { lat: locationLat, lng: locationLng } = locationCoords;
        const { lat: dataLat, lng: dataLng } = data;

        const radlat1 = Math.PI * locationLat / 180;
        const radlat2 = Math.PI * dataLat / 180;
        const theta = locationLng - dataLng;
        const radtheta = Math.PI * theta / 180;
        let calculatedDistance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        calculatedDistance = Math.acos(calculatedDistance);
        calculatedDistance = calculatedDistance * 180 / Math.PI;
        calculatedDistance = calculatedDistance * 60 * 1.1515; // Distance in miles
        calculatedDistance = calculatedDistance * 1.609344; // Distance in kilometers
        calculatedDistance = calculatedDistance * 1000; // Distance in meters

        setDistance(calculatedDistance);
        setDistanceUnit('kilometers'); // Set the default unit to meters
      }
    } catch (error) {
      console.error('Error calculating distance:', error);
    }
  };

  const getDistanceString = () => {
    if (distanceUnit === 'kilometers') {
      return `${(distance / 1000).toFixed(2)} KM dari lokasi Anda`;
    } else if (distanceUnit === 'miles') {
      return `Jarak: ${(distance / 1609.344).toFixed(2)} miles`;
    } else {
      return `Jarak: ${distance.toFixed(2)} meters`;
    }
  };

  return (
    <View style={{
      backgroundColor: "white",
      width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90,
      height: 150,
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'row',
      padding: 12,
      gap: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0.6,
      },
      borderRadius: 12,
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 3,
      marginVertical: 10,
      marginHorizontal: 6
    }}>
      <TouchableOpacity>
        <Image
          source={require('../assets/fig/top.png')}
          style={{ width: 150, height: 130, objectFit: "cover", borderRadius: 20 }}
        />
      </TouchableOpacity>

      <View style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "space-between",
      }}>
        <TouchableOpacity>
          <Text style={{ fontWeight: "600" }}>
            {data.facility}
          </Text>
          <Text>{data.address}</Text>
          {distance !== null && <Text>{getDistanceString()}</Text>}
        </TouchableOpacity>
        <TouchableOpacity>
          <Image />
          <Text style={{ fontWeight: "600" }}
            onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`)}
          >Buka di Google Maps</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Component;
