import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, TouchableOpacity, Platform, Dimensions, Linking } from 'react-native';
import MainContext from '../context/MainContext';

export default function ({ data }) {
  const [text, setText] = useState(''); // Default distance unit
  const { latitude, longitude, filter } = useContext(MainContext).data
  const [tlp, setTlp] = useState("")
  let image = {
    "Rumah Sakit": 'https://cdn.systematic.com/media/g0sj1tbg/hospital-building-001-global.jpg',
    "Puskesmas": 'https://puskesmaswanayasa.com/wp-content/uploads/2021/05/ruang-tunggu-rawat-jalan.jpg',
    "Klinik Utama": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3snWATWyvU0yZdseh_dElIaNCtMvDKjoZ5SuQ5duRdA-ikN0h8Q5CQvrOZhAYpUO3ILw&usqp=CAU',
    "Klinik Pratama": 'https://lh3.googleusercontent.com/p/AF1QipPRy3Na98YEjgrRvGxVZx_XPg2tz0sYxpZNUW9c=w1080-h608-p-no-v0',
    "other": "https://indoservice.co.id/wp-content/uploads/2020/12/Pendaftaran-BPJS-Kesehatan-Karyawan.png"
  }

  useEffect(() => {
    formatting()
  }, [])


  const formatting = () => {
    let array = data.telephone.split("-")
    if (array.length == 2) {
      if (array[1].startsWith(array[0])) {
        setTlp(array[1])
      } else {
        setTlp(array.join(""))
      }
    } else {
      setTlp(array[0])
    }
    if (filter == 'loc' && data.facility !== 'Faskes BPJS 001') {
      const radlat1 = Math.PI * latitude / 180;
      const radlat2 = Math.PI * data.lat / 180;
      const theta = longitude - data.lng;
      const radtheta = Math.PI * theta / 180;
      let calculatedDistance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      calculatedDistance = Math.acos(calculatedDistance);
      calculatedDistance = calculatedDistance * 180 / Math.PI;
      calculatedDistance = calculatedDistance * 60 * 1.1515; // Distance in miles
      calculatedDistance = calculatedDistance * 1.609344; // Distance in kilometers
      calculatedDistance = calculatedDistance * 1000; // Distance in meters
      let distance = calculatedDistance
      let output = ''
      if (distance >= 1000) {
        output = `${(distance / 1000).toFixed(2)} KM`;
      } else {
        output = `${Math.trunc(distance)} M`;
      }
      setText(output)
    }
  };

  return (
    <View style={{
      backgroundColor: "white",
      width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90,
      height: 150,
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'row',
      padding: 12,
      gap: 12,
      shadowColor: "#000",
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
          source={{ uri: data.type ? image[data.type] : "https://indoservice.co.id/wp-content/uploads/2020/12/Pendaftaran-BPJS-Kesehatan-Karyawan.png" }}
          style={{ width: 150, height: 130, objectFit: "cover", borderRadius: 20 }}
        />
      </TouchableOpacity>
      <View style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "space-between",
      }}>
        <Text style={{ fontWeight: "600" }}>
          {data.facility}
        </Text>
        <Text>{data.address}</Text>
        {(filter === 'loc' && text.length) ? (
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Image style={{ width: 15, height: 18, objectFit: "contain" }} source={{ uri: 'https://raw.githubusercontent.com/SimpliLife/asset/main/icons/pinlokasi.png' }} />
            <Text>{text}</Text>
          </View>
        ) : <></>}
        {
          Platform.OS == 'web' ? (
            <TouchableOpacity>
              <Text style={{ fontWeight: "600" }}
                onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`)}
              >Buka di Google Maps</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flexDirection: "row", gap: 5 }}>
              {
                tlp.length ? (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${tlp}`)}
                    style={{ flex: 1, flexDirection: "row", gap: 2, backgroundColor: "#176BA5", height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                    <Image source={{ uri: "https://raw.githubusercontent.com/SimpliLife/asset/main/icons/telepon.png" }} style={{ width: 12, height: 12 }} />
                    <Text style={{ color: "white", fontWeight: "600" }}>Telepon</Text>
                  </TouchableOpacity>
                ) : <></>
              }
              <TouchableOpacity
                onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`)}
                style={{ flex: 1, flexDirection: "row", gap: 2, backgroundColor: "#428BCA", height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Image source={{ uri: "https://raw.githubusercontent.com/SimpliLife/asset/main/icons/peta.png" }} style={{ width: 12, height: 12 }} />
                <Text style={{ color: "white", fontWeight: "600" }}>Peta</Text>
              </TouchableOpacity>
            </View>
          )
        }
        {
          data.type === 'other' && (
            <TouchableOpacity
              activeOpacity={.8}
              style={{ flexDirection: "row", gap: 6, backgroundColor: "#284B8D", height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
              <Image source={{ uri: "https://raw.githubusercontent.com/SimpliLife/asset/main/icons/antrian.png" }} style={{ width: 14, height: 14, objectFit: 'contain' }} />
              <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>Ambil Antrian Online</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  )
}