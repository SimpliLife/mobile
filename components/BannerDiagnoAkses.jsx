import { ImageBackground, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import GradientImg from "../assets/fig/bg-banner.png"
function Compoent() {
  return (
    <ImageBackground source={GradientImg} style={styles.banner} imageStyle={{ borderRadius: 12 }}>
      <Text style={styles.title}>Tentang DiagnoAkses</Text>
      <Text style={styles.text}>DiagnoAkses adalah fitur pra-diagnosa yang memberikan informasi menuju fasilitas kesehatan sesuai dengan kebutuhan kamu.</Text>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  banner: {
    alignSelf: "center",
    width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90,
    margin: "auto",
    marginTop: 16,
    shadowColor: "#000",
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 12,
    shadowOpacity: 0.4,
    shadowRadius: 2.4,
    elevation: 3,
    padding: 12,
    gap: 8
  },
  title: {
    color: '#EFEFEF',
    fontWeight: 'bold',
    fontSize: 14
  },
  text: {
    color: '#EFEFEF',
    fontSize: 12,
    textAlign: 'justify',
  },
});

export default Compoent;