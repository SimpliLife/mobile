import { ImageBackground, Text, Image } from 'react-native';
import styles from '../styles';

export default function (props) {
  let { category, icon, title } = props
  let uri = `https://raw.githubusercontent.com/SimpliLife/asset/main/icons/gejala/white/${icon}`
  return (
    <ImageBackground source={{ uri: "https://raw.githubusercontent.com/SimpliLife/asset/main/images/bg-banner.png" }} style={styles.symptomB} imageStyle={{ borderRadius: 12 }}>
      <Image source={{ uri }} style={styles.symptompBImage} />
      <Text style={styles.symptompBTitle}>{category}</Text>
      <Text style={styles.symptompBText}>{title}</Text>
    </ImageBackground>
  );
}