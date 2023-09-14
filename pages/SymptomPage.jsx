import { View, Text, TouchableOpacity, FlatList, Platform, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BannerSymptom from '../components/BannerSymptom'
import InputLocation from "../components/InputLocation"
import { useEffect, useState } from 'react';
import axios from 'axios';

function Page({ navigation }) {
  const route = useRoute();
  const { category, icon } = route.params.category;
  let [title, setTitle] = useState('')
  const [data, setData] = useState({
    Symptoms: []
  })

  const fetchSymptom = async () => {
    try {
      let { data } = await axios.get("https://simplilife-d59aa106cc03.herokuapp.com/api/categories/1/symptoms")
      let text = `Terdapat ${data.Symptoms.length} ${category.toLowerCase()}.`
      setTitle(text)
      setData(data)
      return data
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSymptom()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <InputLocation navigation={navigation} />
      <BannerSymptom icon={icon} category={category} title={title} />
      <Text style={{ width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90, textAlign: "left", fontWeight: "600", padding: 8, paddingTop: 2 }}>Pilihan Gejala : </Text>
      <FlatList
        contentContainerStyle={{ paddingBottom: 80 }}
        data={data.Symptoms}
        showsVerticalScrollIndicator={false}
        keyExtractor={(el) => el.id}
        renderItem={(el) => {
          const { id, title } = el.item
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('PraDiagnosePage', { id, symptom: title, category, icon })}
              activeOpacity={.9} style={{ width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90, padding: 14, flex: 1, flexDirection: "row", gap: 8, alignItems: "center", borderRadius: 12, backgroundColor: "#F8F8F8", margin: 6 }}>
              <View style={{ backgroundColor: "#C6D7EF", width: 22, height: 22, borderRadius: 100, }}>
              </View>
              <Text style={{ color: "black", fontSize: 12 }}>{title}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View >
  );
}

export default Page;