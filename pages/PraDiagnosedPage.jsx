import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BannerSymptom from '../components/BannerSymptom'
import ButtonBlue from '../components/ButtonBlue';
import InputLocation from "../components/InputLocation"


function Page({ navigation }) {
  const route = useRoute();
  const { id, symptom, category, icon, result } = route.params;
  let textPanjang = ""
  const moveMedFacility = () => {
    navigation.navigate('MedFacilityPage');
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', flexDirection: "column" }}>
      <View style={{ width: 370 }}>
        <InputLocation navigation={navigation} />
      </View>
      <BannerSymptom icon={icon} category={category} title={symptom} />
      <View style={{ width: 350, flexDirection: "column", gap: 8, marginTop: 4 }}>
        <View style={{ borderRadius: 12, backgroundColor: "#EBF3FF", padding: 12 }}>
          <Text style={{ fontSize: 12.5, textAlign: "left", fontWeight: "600", lineHeight: 20, paddingVertical: 6 }}>
            {result}
          </Text>
        </View>
        {
          textPanjang.length > 0 && <View style={{ width: 350, display: "flex", minHeight: 30, borderRadius: 8, backgroundColor: "#F8F8F8" }}>
            <Text>{textPanjang}</Text>
          </View>
        }
      </View >
      <View style={{ flex: 1, gap: 16, paddingVertical: 18 }}>
        <ButtonBlue color="#118AC4" text="Lihat Fasilitas Terdekat" action={moveMedFacility} />
        <ButtonBlue color="#43AFE9" text="Konsultasi Online Dengan Dokter" action={moveMedFacility} />
      </View>
    </View >
  );
}



export default Page;