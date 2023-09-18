import { Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';

export default function ({ text, color, action }) {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={.95}
      style={{ ...styles.buttonBlue, backgroundColor: color }}>
      <Text style={styles.buttonBlueText}>{text}</Text>
      <Image style={styles.buttonBlueImage} source={{ uri: "https://raw.githubusercontent.com/SimpliLife/asset/main/icons/next.png" }} />
    </TouchableOpacity>
  )
}