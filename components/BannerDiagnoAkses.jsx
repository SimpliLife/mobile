import { ImageBackground, Text } from 'react-native';
import styles from '../styles';

export default function () {
  return (
    <ImageBackground source={{ uri: "https://raw.githubusercontent.com/SimpliLife/asset/main/images/bg-banner.png" }} style={styles.banner} imageStyle={{ borderRadius: 12 }}>
      <Text style={styles.bannerTitle}>Tentang DiagnoAkses</Text>
      <Text style={styles.bannerText}>DiagnoAkses adalah fitur pra-diagnosa yang memberikan informasi menuju fasilitas kesehatan sesuai dengan kebutuhan kamu.</Text>
    </ImageBackground>
  );
}