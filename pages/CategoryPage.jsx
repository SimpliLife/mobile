import { View, Button } from 'react-native';

function Page({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Symptom Page"
        onPress={() => navigation.navigate('SymptomPage')}
      />
    </View>
  );
}

export default Page;