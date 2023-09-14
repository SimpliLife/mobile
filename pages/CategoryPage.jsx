import { View, FlatList, Platform } from 'react-native';
import BannerDiagnoAkses from '../components/BannerDiagnoAkses'
import CategoryCard from '../components/CategoryCard'
import InputLocation from "../components/InputLocation"
import { useEffect, useState } from 'react';
import axios from 'axios';

function Page({ navigation }) {
  const [categories, setCategories] = useState([])
  const fetchCategory = async () => {
    try {
      let { data } = await axios.get("https://simplilife-d59aa106cc03.herokuapp.com/api/categories")
      setCategories(data.categories)
      return data
    } catch (error) {
      console.log(error.name);
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <FlatList
        ListHeaderComponent={<View style={{ justifyContent: "center" }}>
          <BannerDiagnoAkses />
          <InputLocation navigation={navigation} />
        </View>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={categories}
        keyExtractor={(el) => el.id}
        numColumns={2}
        renderItem={(el) => <CategoryCard key={el.id} data={el} navigation={(data) => navigation.navigate('SymptomPage', { ...data })} />}
      />
    </View>
  );
}

export default Page;