import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import styles from '../styles';
import BannerSymptom from '../components/BannerSymptom'
import ButtonBlue from '../components/ButtonBlue';
import InputLocation from "../components/InputLocation"

function Page({ navigation }) {
  const route = useRoute();
  const { symptom, category, icon, result } = route.params;
  let [text, setText] = useState("")
  let [textTindakan, setTextTindakan] = useState("")

  const apa = () => {
    if (result.includes('KEMUNGKINAN PENYEBAB DAN TINDAKAN')) {
      let temp = result.split("KEMUNGKINAN PENYEBAB DAN TINDAKAN")
      let resultTemp = temp[temp.length - 1]
      setText('KEMUNGKINAN PENYEBAB DAN TINDAKAN')
      setTextTindakan(resultTemp)
    } else {
      let resultTemp = result.split("TINDAKAN")
      if (resultTemp.length > 1) {
        setText(resultTemp[0].trimEnd())
        setTextTindakan(`${resultTemp[1].trimStart().trimEnd()}`)
      } else {
        setText(resultTemp[0])
      }
    }
  }

  useEffect(() => {
    apa()
  }, [])
  const moveMedFacility = () => {
    navigation.navigate('MedFacilityPage');
  }
  const moveChat = () => {
    navigation.navigate('ChatPage');
  }
  return (
    <View style={styles.containerPraDiagnosed}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputLocation navigation={navigation} />
        <BannerSymptom icon={icon} category={category} title={symptom} />
        <View style={styles.grouping}>
          <View style={styles.boxPraDiagnosed}>
            <Text style={styles.fontBox}>{text}</Text>
          </View>
          {
            textTindakan.length > 0 && (
              <View style={styles.boxTindakan}>
                <Text style={styles.textHeadTindakan}>TINDAKAN</Text>
                <Text style={styles.textTindakan}>{textTindakan}</Text>
              </View>
            )
          }
        </View >
        <View style={styles.groupButton}>
          <ButtonBlue color="#118AC4" text="Lihat Fasilitas Kesehatan" action={moveMedFacility} />
          <ButtonBlue color="#43AFE9" text="Konsultasi Online Dengan Dokter" action={moveChat} />
        </View>
      </ScrollView>
    </View >
  );
}



export default Page;