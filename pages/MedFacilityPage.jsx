import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import { StyleSheet, Text, View, Dimensions, Button, Platform, Image, TouchableOpacity, FlatList } from 'react-native';
import CardFaskes from "../components/CardFaskes"

function Page({ navigation }) {
  const [data, setData] = useState([
    {}, {}, {}, {}
  ])
  return (
    <View style={styles.container}>
      <MapComponent />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={data}
        keyExtractor={(el) => el.id}
        renderItem={(el) => <CardFaskes />}
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