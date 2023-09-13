import { View, Text, TouchableOpacity } from 'react-native';

function Compoent({ text, action }) {
  return (
    <TouchableOpacity
      onPress={() => action(text)}
      activeOpacity={0.7}
      style={{
        marginVertical: 6,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        backgroundColor: "#F8F8F8"
      }}
    >
      <View style={{ backgroundColor: "#C6D7EF", width: 22, height: 22, borderRadius: 100 }}></View>
      <Text style={{ textAlign: "left", color: "black", fontSize: 12, flexGrow: 1, margin: 6 }}>{text}</Text>
    </TouchableOpacity>
  );
}

export default Compoent;