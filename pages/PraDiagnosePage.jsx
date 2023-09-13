import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BannerSymptom from '../components/BannerSymptom';
import ButtonPraDiagnose from '../components/ButtonPraDiagnose'
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
      let { data } = await axios.get(`http://localhost:3000/api/symptoms/${id}`);
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
      <BannerSymptom icon={icon} category={category} title={symptom} />
      <View style={styles.groupingContent}>
        <Text style={styles.header}>Pertanyaan : </Text>
        <View style={styles.questionCard}>
          <Text style={styles.text}>{question}</Text>
        </View>
        <ButtonPraDiagnose key="yes" text="Ya" action={pushAnswer} />
        <ButtonPraDiagnose key="no" text="Tidak" action={pushAnswer} />
        {
          listAnswer.length ? <ButtonPraDiagnose key="back" action={popAnswer} text="Kembali ke pilihan gejala" /> : <></>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPraDiagnose: { flex: 1, alignItems: 'center' },
  groupingContent: { flex: 1, width: 350, flexDirection: "column", gap: 8, marginTop: 4 },
  header: { textAlign: "left", fontWeight: "600", padding: 8 },
  questionCard: { borderRadius: 12, backgroundColor: "#F8F8F8", padding: 12 },
  text: { fontSize: 12.5, textAlign: "left", fontWeight: "600", lineHeight: 20, paddingVertical: 6 }
});

export default Page;
