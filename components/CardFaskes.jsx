import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
function Component() {
  return (
    <View style={{
      backgroundColor: "white",
      width: 360, height: 150, borderRadius: 12, display: 'flex', flexDirection: 'row', padding: 12, gap: 12, shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0.6,
      },
      borderRadius: 12,
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 3,
      marginVertical: 10,
      marginHorizontal: 6
    }}>
      <TouchableOpacity>
        <Image
          source={require('../assets/fig/top.png')}
          style={{ width: 150, height: 130, objectFit: "cover", borderRadius: 20 }}
        />
      </TouchableOpacity>

      <View style={{
        backgroundColor: "white", flex: 1, justifyContent: "space-between",

      }}>
        <TouchableOpacity>
          <Text style={{ fontWeight: "600" }}>RS MITRA KEMAYORAN</Text>
          <Text>Jl. HBR Motik, RT.13/RW.6, Kec. Kemayoran. </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image />
          <Text>500 m</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image />
            <Text>500 m</Text>
          </TouchableOpacity>
          <Text>Peta</Text>
        </View>

      </View>

    </View>

  )
}
export default Component