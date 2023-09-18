import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

import styles from '../styles';
import BannerSymptom from '../components/BannerSymptom'
import InputLocation from "../components/InputLocation"

function Page({ navigation }) {
  const route = useRoute();
  const { category, icon, id, Symptoms } = route.params
  const [isLoading, setIsLoading] = useState(true)
  let [title, setTitle] = useState('')
  let [symptoms, setSymptoms] = useState([])

  const fetchSymptom = async () => {
    try {
      let { data } = await axios.get(`https://simplilife-d59aa106cc03.herokuapp.com/api/categories/${id}/symptoms`)
      let text = `Terdapat ${data.Symptoms.length} ${category.toLowerCase()}.`
      setTitle(text)
      setSymptoms(data.Symptoms)
      setIsLoading(false)
      return data
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSymptom()
  }, [])

  return (
    <View style={styles.containerDefault}>
      <InputLocation navigation={navigation} />
      <BannerSymptom icon={icon} category={category} title={title} />
      <Text style={styles.textSymptom}>Pilihan Gejala : </Text>
      <View style={styles.containerLoading}>
        {
          isLoading ? <Image source={{ uri: "https://media.tenor.com/PfFDd3eNE_gAAAAC/loading-load.gif" }} style={styles.boxLoading} /> : (
            <FlatList
              contentContainerStyle={{ paddingBottom: 80 }}
              data={symptoms}
              showsVerticalScrollIndicator={false}
              keyExtractor={(el) => el.id}
              renderItem={(el) => {
                const { id, title } = el.item
                return (
                  <TouchableOpacity activeOpacity={.9} style={styles.listSymptom}
                    onPress={() => navigation.navigate('PraDiagnosePage', { id, symptom: title, category, icon })}>
                    <View style={styles.circle}></View>
                    <Text style={styles.symptomText}>{title}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          )
        }
      </View>


    </View >
  );
}

export default Page;