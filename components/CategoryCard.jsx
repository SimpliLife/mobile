import { Image, View, StyleSheet, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';

function Compoent({ data, navigation }) {
  let category = data.item
  let uri = `https://raw.githubusercontent.com/SimpliLife/asset/main/icons/gejala/color/${category.icon}`
  return (
    <TouchableOpacity activeOpacity={.95} style={styles.card} onPress={() => navigation({
      category
    })}>
      <View style={styles.section}>
        <Image
          style={styles.image}
          source={{ uri }} />
        <Image
          style={styles.question}
          source={{
            uri: "https://raw.githubusercontent.com/SimpliLife/asset/main/icons/question.png"
          }} />
      </View>
      <View style={styles.section}>
        <Text style={{ flexGrow: 6, flexDirection: 'row', alignSelf: "flex-end", fontSize: 12, fontWeight: "600" }}>{category.category}</Text>
        <View style={{ height: 15, width: 15, alignSelf: "flex-end", marginBottom: 2 }}>
          <Image
            style={styles.arrow}
            source={{
              uri: "https://raw.githubusercontent.com/SimpliLife/asset/main/icons/arrow.png"
            }} />
        </View>
      </View>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  card: {
    width: Platform.OS == 'web' ? 400 * 0.42 : Dimensions.get('window').width * 0.42,
    height: 111,
    margin: 8,
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    padding: 10,
    gap: 2
  },
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
});

export default Compoent;