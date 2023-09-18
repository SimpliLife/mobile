import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import MainContext from '../context/MainContext';

export default function ({ navigation }) {
  const { data } = useContext(MainContext)
  return (
    <View style={styles.widthInputLocation}>
      <Text style={styles.location}>Lokasi :</Text>
      <TouchableOpacity style={styles.touchableLocation} onPress={() => navigation.navigate("SearchLocationPage")}>
        <Text >{data.value ? data.value : "Sedang mencari lokasi"}</Text>
        <Image source={{ uri: 'https://raw.githubusercontent.com/SimpliLife/asset/main/icons/pencil.png' }} style={styles.imageEditPencil} />
      </TouchableOpacity>
    </View>
  );
}