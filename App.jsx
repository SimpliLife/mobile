import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryPage from './pages/CategoryPage'
import SymptomPage from './pages/SymptomPage'
import PraDiagnosePage from './pages/PraDiagnosePage'
import PraDiagnosedPage from './pages/PraDiagnosedPage'
import MedFacilityPage from './pages/MedFacilityPage'
import { Image, StatusBar, StyleSheet } from 'react-native';
const Stack = createNativeStackNavigator();

const HeaderBackground = () => (
  <Image
    source={require('./assets/fig/top.png')}
    style={styles.headerBackgroundImage}
  />
);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF'
  },
};


function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        backgroundColor="white"
        barStyle="light-content"
      />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerBackgroundImage: {
    flex: 1,
    resizeMode: 'cover', // You can use 'contain' or other values as well
  },
});

export default App;