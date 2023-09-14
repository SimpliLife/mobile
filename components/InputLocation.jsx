import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

function InputLocation({ navigation }) {
  const [text, onChangeText] = useState('Example Text');
  return (
    <View style={{ paddingHorizontal: 7, paddingTop: 18, paddingBottom: 14 }}>
      <Text style={{ fontWeight: "600", fontSize: 15, paddingLeft: 5 }}>Lokasi Anda Saat Ini:</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("SearchLocationPage")}
        style={{
          height: 40,
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
        <Text style={{ fontWeight: "600" }}>{text}</Text>
        <Image
          source={require('../assets/fig/pencil.png')}
          style={{ width: 15, height: 15 }}
        />
      </TouchableOpacity>
    </View>
  )
}

export default InputLocation