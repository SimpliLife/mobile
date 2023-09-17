import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, Button, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Component({ data }) {
  let jarak = () => {
    let location = AsyncStorage.getItem('location')
  }

  return (
    <View style={{
      backgroundColor: "white",
      width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90, height: 150, borderRadius: 12, display: 'flex', flexDirection: 'row', padding: 12, gap: 12, shadowColor: "#000",
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
        backgroundColor: "white", flex: 1, justifyContent: "space-between",

      }}>
        <TouchableOpacity>
          <Text style={{ fontWeight: "600" }}>
            {data.facility}
          </Text>
          <Text>{data.address}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image />
          {/** Klik disini untuk diarahkan ke Google Maps, url in data.gmap_url */}
          <Button title="Lihat di Google Maps" onPress={() => Linking.openURL(data.gmap_url)} />
        </TouchableOpacity>

      </View>

    </View>

  )
}
export default Component