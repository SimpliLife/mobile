import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

import styles from '../styles';
import BannerSymptom from '../components/BannerSymptom';
import ButtonPraDiagnose from '../components/ButtonPraDiagnose'
import InputLocation from "../components/InputLocation"

function recrussion(object, array) {
  if (!array.length) return object;
  if (array.length === 1) {
    return object[array[0]];
  }
  let newObject = object[array[0]];
  array.shift();
  return recrussion(newObject, array);
}

function Page({ navigation }) {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true)
  const [listAnswer, setListAnswer] = useState([]);
  const [data, setData] = useState({});
  const [question, setQuestion] = useState("");
  const { id, symptom, category, icon } = route.params;

  const fetchDetail = async () => {
    try {
      let { data } = await axios.get(`https://simplilife-d59aa106cc03.herokuapp.com/api/symptoms/${id}`);
      setData(data);
      setQuestion(data.firstQuestion);
      setIsLoading(false)
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const pushAnswer = (newAnswer) => {
    setListAnswer([...listAnswer, newAnswer.toLowerCase()]);
  };
  const popAnswer = () => {
    let copy = [...listAnswer];
    copy.pop();
    setListAnswer(copy);
  };

  useEffect(() => {
    fetchDetail()
  }, []);

  useEffect(() => {
    if (listAnswer.length > 0) {
      let result = recrussion(data.q, [...listAnswer]);
      if (typeof result === 'string') {
        setListAnswer([])
        setQuestion(data.firstQuestion)
        navigation.navigate('PraDiagnosedPage', { id, symptom, category, icon, result });
      } else {
        if (result.ya && result.tidak) {
          setQuestion(result.q);
        } else {
          setListAnswer([])
          setQuestion(data.firstQuestion)
          navigation.navigate('PraDiagnosedPage', { id, symptom, category, icon, result: result.q })
        }
      }
    }
  }, [listAnswer]);

  return (
    <View style={styles.viewPraDiagnose}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.bottom30}>
        <InputLocation navigation={navigation} />
        <BannerSymptom icon={icon} category={category} title={symptom} />
        <View style={styles.containerLoading}>
          <Text style={styles.pertanyaanPradiagnose}>Pertanyaan : </Text>
          {
            isLoading ? <Image source={{ uri: "https://media.tenor.com/PfFDd3eNE_gAAAAC/loading-load.gif" }} style={styles.boxLoading} /> : (
              <>
                <View style={styles.questionCard}>
                  <Text style={styles.textPraDiagnose}>{question}</Text>
                </View>
                <ButtonPraDiagnose key="yes" text="Ya" action={pushAnswer} />
                <ButtonPraDiagnose key="no" text="Tidak" action={pushAnswer} />
                {listAnswer.length ? <ButtonPraDiagnose key="back" action={popAnswer} text="Kembali ke pilihan gejala" /> : <></>}
              </>
            )
          }
        </View>
      </ScrollView>
    </View>
  );
}

export default Page;
