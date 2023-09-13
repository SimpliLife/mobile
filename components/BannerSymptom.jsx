import { ImageBackground, StyleSheet, Text, Image } from 'react-native';
import GradientImg from "../assets/fig/bg-banner.png"
function Compoent(props) {
  let { category, icon, title } = props
  let uri = `https://raw.githubusercontent.com/SimpliLife/asset/main/icons/gejala/white/${icon}`

  return (
    <ImageBackground source={GradientImg} style={styles.banner} imageStyle={{ borderRadius: 12 }}>
      <Image source={{ uri }} style={{ width: 30, height: 30 }} />
      <Text style={styles.title}>{category}</Text>
      <Text style={styles.text}>{title}</Text>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  banner: {
    width: 350,
    height: 98,
    margin: "auto",
    marginVertical: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 12,
    shadowOpacity: 0.4,
    shadowRadius: 2.4,
    elevation: 3,
    padding: 10,
    gap: 8
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Helvetica Neue',
    color: '#EFEFEF',
    fontWeight: 'bold',
    fontSize: 14
  },
  text: {
    fontFamily: 'Helvetica Neue',
    color: '#EFEFEF',
    fontSize: 12,
    textAlign: 'justify',
  },
});

export default Compoent;