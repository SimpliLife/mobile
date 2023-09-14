import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import { StyleSheet, View, FlatList } from 'react-native';
import CardFaskes from "../components/CardFaskes"
import InputLocation from "../components/InputLocation"

function Page({ navigation }) {
  const [data, setData] = useState([
    {}, {}, {}, {}
  ])
  return (
    <View style={styles.container}>
      <MapComponent />
      <FlatList
        ListHeaderComponent={<InputLocation navigation={navigation} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={data}
        keyExtractor={(el, i) => i}
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