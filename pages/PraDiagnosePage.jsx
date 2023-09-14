import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BannerSymptom from '../components/BannerSymptom';
import ButtonPraDiagnose from '../components/ButtonPraDiagnose'
import InputLocation from "../components/InputLocation"
import { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [listAnswer, setListAnswer] = useState([]);
  const [data, setData] = useState({});
  const [question, setQuestion] = useState("");
  const { id, symptom, category, icon } = route.params;

  const fetchDetail = async () => {
    try {
      let { data } = await axios.get(`https://simplilife-d59aa106cc03.herokuapp.com/api/symptoms/${id}`);
      setData(data);
      setQuestion(data.firstQuestion);
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
        if (result) {
          setQuestion(result.q);
        }
      }
    }
  }, [listAnswer]);

  return (
    <View style={styles.viewPraDiagnose}>

      <InputLocation navigation={navigation} />

      <BannerSymptom icon={icon} category={category} title={symptom} />
      <Text style={{ width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90, textAlign: "left", fontWeight: "600", padding: 8, paddingTop: 2 }}>Pertanyaan : </Text>
      <View style={styles.questionCard}>
        <Text style={styles.text}>{question}</Text>
      </View>
      <ButtonPraDiagnose key="yes" text="Ya" action={pushAnswer} />
      <ButtonPraDiagnose key="no" text="Tidak" action={pushAnswer} />
      {
        listAnswer.length ? <ButtonPraDiagnose key="back" action={popAnswer} text="Kembali ke pilihan gejala" /> : <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  viewPraDiagnose: { alignItems: 'center' },
  header: { textAlign: "left", fontWeight: "600", padding: 8, paddingTop: 4 },
  questionCard: {
    width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90,
    borderRadius: 12, backgroundColor: "#F8F8F8", padding: 12, marginBottom: 10
  },
  text: { fontSize: 12.5, textAlign: "left", fontWeight: "600", lineHeight: 20, paddingVertical: 6 }
});

export default Page;
