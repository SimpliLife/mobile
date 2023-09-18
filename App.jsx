import * as React from 'react';
import styles from "./styles"
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryPage from './pages/CategoryPage';
import SymptomPage from './pages/SymptomPage';
import PraDiagnosePage from './pages/PraDiagnosePage';
import PraDiagnosedPage from './pages/PraDiagnosedPage';
import MedFacilityPage from './pages/MedFacilityPage';
import SearchLocationPage from './pages/SearchLocationPage';
import ChatPage from './pages/ChatPage';
import { Image, StatusBar } from 'react-native';
import * as Location from 'expo-location';
import ProviderContext from './context/ProviderContext';


const Stack = createNativeStackNavigator();
const HeaderBackground = () => (
  <Image
    source={require('./assets/top.png')}
    style={styles.headerBattery}
  />
);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

function App() {
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };



  React.useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        barStyle="light-content"
      />
      <ProviderContext >
        <Stack.Navigator screenOptions={{
          headerTitleStyle: {
            fontSize: 14
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerTintColor: "#F7F7F8",
          headerBackground: () => <HeaderBackground />,
        }}>
          <Stack.Screen options={{ title: 'DiagnoAkses' }} name="CategoryPage" component={CategoryPage} />
          <Stack.Screen options={{ title: 'DiagnoAkses' }} name="SymptomPage" component={SymptomPage} />
          <Stack.Screen options={{ title: 'DiagnoAkses' }} name="PraDiagnosePage" component={PraDiagnosePage} />
          <Stack.Screen options={{ title: 'DiagnoAkses' }} name="PraDiagnosedPage" component={PraDiagnosedPage} />
          <Stack.Screen options={{ title: 'DiagnoAkses' }} name="MedFacilityPage" component={MedFacilityPage} />
          <Stack.Screen options={{ title: 'DiagnoAkses' }} name="SearchLocationPage" component={SearchLocationPage} />
          <Stack.Screen options={{ title: 'DiagnoAkses' }} name="ChatPage" component={ChatPage} />
        </Stack.Navigator>
      </ProviderContext >
    </NavigationContainer>
  );
}

export default App;
