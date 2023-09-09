import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryPage from './pages/CategoryPage'
import SymptomPage from './pages/SymptomPage'
import MedFacilityPage from './pages/MedFacilityPage'
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CategoryPage" component={CategoryPage} />
        <Stack.Screen name="SymptomPage" component={SymptomPage} />
        <Stack.Screen name="MedFacilityPage" component={MedFacilityPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;