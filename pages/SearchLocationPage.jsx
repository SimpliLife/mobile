import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import { StyleSheet, View, FlatList, Text } from 'react-native';

function Page({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>HELLO WORLD</Text>
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