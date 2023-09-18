import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Image } from 'react-native';
import axios from 'axios';

import styles from '../styles';
import MainContext from '../context/MainContext';
import MapComponent from '../components/MapComponent';
import CardFaskes from "../components/CardFaskes"
import InputLocation from "../components/InputLocation"

const dummyFaskes = {
  telephone: "021165",
  facility: "Faskes BPJS 001",
  address: "Jl.Letjen Suprapto-Jakarta Pusat",
  lat: -6.16800375357,
  lng: 106.873878367,
  tiketing: true,
  type: 'other'
}

function Page({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [listFaskes, setListFaskes] = useState([])
  const { data } = useContext(MainContext)

  const fetchFaskes = async () => {
    try {
      let temp = {}
      let params = "q"
      if (data.filter == 'loc') {
        temp = {
          lat: data.latitude,
          lng: data.longitude,
          distance: 1000
        }
        params = data.filter
      } else if (data.filter.toLowerCase() == 'city') {
        temp = { city: data.value }
        params = 'city'
      } else if (data.filter.toLowerCase() == 'province') {
        temp = { province: data.value }
        params = 'province'
      }
      let response = await axios.get(`https://simplilife-d59aa106cc03.herokuapp.com/api/facilities/${params}`, {
        params: temp
      })
      let locationFaskes = response.data.facilities || []
      setListFaskes(locationFaskes)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    fetchFaskes();
  }, [data]);

  return (

    <View style={styles.containerDefault}>
      {
        data.filter == "loc" && <MapComponent data={listFaskes} />
      }
      {
        isLoading ? (
          <View style={styles.containerLoading}>
            <Image source={{ uri: "https://media.tenor.com/PfFDd3eNE_gAAAAC/loading-load.gif" }} style={styles.boxLoading} />
          </View>) : (
          <FlatList
            ListHeaderComponent={<>
              <InputLocation navigation={navigation} />
              <CardFaskes data={{ ...dummyFaskes }} />
            </>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={listFaskes}
            keyExtractor={(el, i) => i.toString()}
            renderItem={(el, i) => <CardFaskes data={{ ...el.item }} key={i} />}
          />
        )
      }
    </View>
  );
}


export default Page;
