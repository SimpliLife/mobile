import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import { StyleSheet, View, FlatList } from 'react-native';
import CardFaskes from "../components/CardFaskes"
import InputLocation from "../components/InputLocation"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Page({ navigation }) {
  const [data, setData] = useState([])

  const fetchFaskes = async () => {
    try {
      let { data } = await axios.get("https://simplilife-d59aa106cc03.herokuapp.com/api/facilities/city?city=Kota%20Bandung")
      return data.facilities
    } catch (error) {
      console.log(error);
    }
  }

  const calculateDistance = async () => {
    try {
      let fetchFaskesData = await fetchFaskes()
      const location = await AsyncStorage.getItem('location');
      if (location) {
        const locationCoords = JSON.parse(location);
        const { lat: locationLat, lng: locationLng } = locationCoords;

        if (fetchFaskesData) {
          fetchFaskesData.forEach(el => {
            const { lat: dataLat, lng: dataLng } = el;

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

            el.distance = calculatedDistance
          })

          // Sort the data based on distance (ascending)
          fetchFaskesData.sort((a, b) => a.distance - b.distance);
          console.log(fetchFaskesData);
          setData(fetchFaskesData)
        }
        setData(fetchFaskesData)
      }
    } catch (error) {
      console.error('Error calculating distance:', error);
    }
  };

  useEffect(() => {
    calculateDistance();
  }, []);

  return (
    <View style={styles.container}>
      <MapComponent />
      <FlatList
        ListHeaderComponent={<InputLocation navigation={navigation} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={data}
        keyExtractor={(el, i) => i.toString()}
        renderItem={(el) => <CardFaskes data={el.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default Page;
