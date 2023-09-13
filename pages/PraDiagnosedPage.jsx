import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BannerSymptom from '../components/BannerSymptom'


function Page({ navigation }) {
  const route = useRoute();
  const { id, symptom, category, icon, result } = route.params;
  console.log(route.params);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <BannerSymptom icon={icon} category={category} title={symptom} />
      <View style={{ flex: 1, width: 350, flexDirection: "column", gap: 8, marginTop: 4 }}>
        <View style={{ borderRadius: 12, backgroundColor: "#EBF3FF", padding: 12 }}>
          <Text style={{ fontSize: 12.5, textAlign: "left", fontWeight: "600", lineHeight: 20, paddingVertical: 6 }}>
            {result}
          </Text>
        </View>
      </View >
    </View >
  );
}

export default Page;