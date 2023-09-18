import { useContext, useEffect, useState } from 'react';
import { View, FlatList, Image } from 'react-native';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';
import axios from 'axios';

import styles from '../styles';
import MainContext from '../context/MainContext';
import BannerDiagnoAkses from '../components/BannerDiagnoAkses'
import CategoryCard from '../components/CategoryCard'
import InputLocation from "../components/InputLocation"

Geocoder.init("....")

function Page({ navigation }) {
  const { data, setData } = useContext(MainContext)
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchCategory = async () => {
    try {
      let response = await axios.get("https://simplilife-d59aa106cc03.herokuapp.com/api/categories")
      setCategories(response.data.categories)
      setIsLoading(false)
      return response.data
    } catch (error) {
      console.log(error.name);
    }
  }
  const moveToSymptom = async (data) => {
    navigation.navigate('SymptomPage', { ...data })
  }

  // Function to get the user's location
  const getLocation = async () => {
    try {
      let position = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = position.coords;
      // Fetch street name based on coordinates
      const json = await Geocoder.from({ latitude, longitude });
      const addressComponent = json.results[0].formatted_address;
      let temp = { ...data }
      temp.location = addressComponent
      temp.latitude = latitude
      temp.longitude = longitude
      temp.filter = "loc"
      temp.value = addressComponent
      setData(temp)
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };


  useEffect(() => {
    if (data.filter == "loc") {
      getLocation()
    }
    fetchCategory()
  }, [])

  return (
    <View style={styles.containerDefault}>
      {
        isLoading ? (
          <>
            <View style={{ marginBottom: 20 }}>
              <BannerDiagnoAkses />
              <InputLocation navigation={navigation} />
            </View>

            <View style={styles.containerLoading}>
              <Image source={{ uri: "https://media.tenor.com/PfFDd3eNE_gAAAAC/loading-load.gif" }} style={styles.boxLoading} />
            </View>
          </>
        ) : (
          <FlatList
            ListHeaderComponent={<View style={styles.categoryHeader}>
              <BannerDiagnoAkses />
              <InputLocation navigation={navigation} />
            </View>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={categories}
            keyExtractor={(el) => el.id}
            numColumns={2}
            renderItem={(el) => <CategoryCard key={el.id} data={el} navigation={() => moveToSymptom(el.item)} />}
          />
        )
      }

    </View>
  );
}

export default Page;