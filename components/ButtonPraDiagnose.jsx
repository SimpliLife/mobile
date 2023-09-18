import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function ({ text, action }) {
  return (
    <TouchableOpacity onPress={() => action(text)} activeOpacity={0.7} style={styles.buttonPraDiagnose}>
      <View style={styles.buttonColorPradiagnose}></View>
      <Text style={styles.textButtonPraDiagnose}>{text}</Text>
    </TouchableOpacity>
  );
}