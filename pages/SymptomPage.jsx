import { View, Text, Button } from 'react-native';

function Page({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to MedFacility"
        onPress={() => navigation.navigate('MedFacilityPage')}
      />
    </View>
  );
}

export default Page;