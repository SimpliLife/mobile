import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import Geocoding from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Location from 'expo-location';

Geocoding.init('AIzaSyAHz9Xu7mzATRD5zfZXKvKiHeZbGUy865Q');

function InputLocation({ navigation }) {
  const [text, onChangeText] = useState('Example Text');
  const [location, setLocation] = useState(null);
  const [streetName, setStreetName] = useState('');

  // Function to get the user's location
  const getLocation = async () => {
    try {
      let position = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = position.coords;

      // Fetch street name based on coordinates
      const json = await Geocoding.from({ latitude, longitude });
      const addressComponent = json.results[0].formatted_address;

      setStreetName(addressComponent);

      const locationText = `Latitude: ${latitude}, Longitude: ${longitude}`;
      onChangeText(locationText);
      setLocation(locationText);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  useEffect(() => {
    // Refresh location data when the component mounts
    getLocation();
  }, []);

  return (
    <View style={{
      width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90,
      alignSelf: "center",
      paddingTop: 18,
      paddingBottom: 14
    }}>
      <Text style={{ fontWeight: "600", fontSize: 15, paddingLeft: 5 }}>Lokasi Anda Saat Ini:</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("SearchLocationPage")}
        style={{
          marginTop: 8,
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          backgroundColor: "#F6F6F6",
          borderColor: "#F6F6F6",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Text style={{ fontWeight: "600" }}>{streetName ? streetName : "Sedang mencari lokasi"}</Text>
        <Image
          source={require('../assets/fig/pencil.png')}
          style={{ width: 15, height: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default InputLocation;
