import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import styleGlobal from "../styles"
export default function ({ data, navigation }) {
  let category = data.item
  let uri = `https://raw.githubusercontent.com/SimpliLife/asset/main/icons/gejala/color/${category.icon}`
  return (
    <TouchableOpacity activeOpacity={.95} style={styleGlobal.card} onPress={() => navigation({ category })}>
      <View style={styles.section}>
        <Image style={styles.image} source={{ uri }} />
        <Image style={styles.question} source={{ uri: "https://raw.githubusercontent.com/SimpliLife/asset/main/icons/question.png" }} />
      </View>
      <View style={styles.section}>
        <Text style={styles.textCategory}>{category.category}</Text>
        <View style={styles.imageView}>
          <Image style={styles.arrow} source={{ uri: "https://raw.githubusercontent.com/SimpliLife/asset/main/icons/arrow.png" }} />
        </View>
      </View>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 36,
    height: 36,
    objectFit: "contain"
  },
  question: {
    width: 12,
    height: 12,
    objectFit: "contain",
  },
  arrow: {
    width: 14,
    height: 14,
    alignSelf: "flex-end",
    objectFit: "contain",
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
  textCategory: { flexGrow: 6, flexDirection: 'row', alignSelf: "flex-end", fontSize: 12, fontWeight: "600" },
  imageView: { height: 15, width: 15, alignSelf: "flex-end", marginBottom: 2 }
});