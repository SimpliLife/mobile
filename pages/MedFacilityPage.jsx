import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import { StyleSheet, View, FlatList } from 'react-native';
import CardFaskes from "../components/CardFaskes"
import InputLocation from "../components/InputLocation"
import axios from 'axios';

function Page({ navigation }) {
  const [data, setData] = useState([])

  const fetchFaskes = async () => {
    try {
      let { data } = await axios.get("https://simplilife-d59aa106cc03.herokuapp.com/api/facilities/city?city=Kota%20Bandung")
      setData(data.facilities)
      return data.facilities
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchFaskes()
  }, [])
  
  return (
    <View style={styles.container}>
      <MapComponent />
      <FlatList
        ListHeaderComponent={<InputLocation navigation={navigation} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={data}
        keyExtractor={(el, i) => i}
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

export default Page