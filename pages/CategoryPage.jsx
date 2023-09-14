import { View, FlatList } from 'react-native';
import BannerDiagnoAkses from '../components/BannerDiagnoAkses'
import CategoryCard from '../components/CategoryCard'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Page({ navigation }) {
  const [categories, setCategories] = useState([])
  const fetchCategory = async () => {
    try {
      let { data } = await axios.get("http://localhost:3000/api/categories")
      setCategories(data.categories)
      return data
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <BannerDiagnoAkses />
      <FlatList
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