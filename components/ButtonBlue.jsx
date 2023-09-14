import { Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';

function ButtonBlue({ text, color, action }) {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={.95}
      style={{ display: "flex", justifyContent: "space-between", backgroundColor: color, borderRadius: 8, padding: 18, flexDirection: "row", width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90, }}>
      <Text style={{ color: '#FFF8F8', fontWeight: "700" }}>{text}</Text>
      <Image source={{ uri: "https://raw.githubusercontent.com/SimpliLife/asset/main/icons/next.png" }} style={{ width: 11, height: 19 }} />
    </TouchableOpacity>
  )
}

export default ButtonBlue