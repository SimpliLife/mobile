import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

import styles from '../styles';
import MainContext from '../context/MainContext';

function Page({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const { data, setData } = useContext(MainContext);
  const [dataLoc, setDataLoc] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  const fetchLocation = async () => {
    try {
      let response = await axios.get("https://simplilife-d59aa106cc03.herokuapp.com/api/loc")
      let result = response.data
      setDataLoc(result.locations)
      setDataFilter(result.locations)
      return result.locations
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchLocation()
    setIsLoading(false)
  }, [])

  const isChoosen = (obj) => {
    let temp = { ...data }
    if (obj) {
      temp.value = obj.name
      temp.filter = obj.type
    } else {
      temp.value = temp.location
      temp.filter = "loc"
    }
    setData({ ...temp })
    navigation.goBack()
  }

  const [filterOpen, setfilterOpen] = useState(false);
  const [filterValue, setfilterValue] = useState('all');
  const [filter, setfilter] = useState([
    { label: "All", value: "all" },
    { label: "Povinsi", value: "province" },
    { label: "Kabupaten / Kota", value: "city" },
  ]);
  const [text, onChangeText] = useState('');

  const { control } = useForm();
  useEffect(() => {
    let dataLocations = [...dataLoc]
    if (dataLoc.length) {
      if (filterValue == 'province') {
        dataLocations = dataLocations.filter(el => el.type == 'Province')
      } else if (filterValue == 'city') {
        dataLocations = dataLocations.filter(el => el.type == 'City')
      }
    }
    if (text.length) {
      dataLocations = dataLocations.filter(el => el.name.toLowerCase().includes(text.toLowerCase()))
    }
    setDataFilter(dataLocations)
  }, [filterValue, text])
  return (
    <View style={styles.searchContainer}>
      <Text style={styles.cariLokasiMu}>Cari lokasimu </Text>
      <View style={styles.searchZindex}>
        <TextInput placeholder='Tulis disini..' style={styles.searchInput} onChangeText={onChangeText} value={text} />
        <Controller
          name="filter"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.searchDropdownfilter}>
              <DropDownPicker
                style={styles.searchDropDown}
                open={filterOpen}
                value={filterValue} //filterValue
                items={filter}
                setOpen={setfilterOpen}
                setValue={setfilterValue}
                setItems={setfilter}
                placeholder="Select filter"
                onChangeValue={onChange}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
          )}
        />
      </View>


      <FlatList
        ListHeaderComponent={
          (
            <TouchableOpacity onPress={() => isChoosen()} activeOpacity={0.8} style={{ ...styles.searchItemContainer, backgroundColor: '#d9f2f7' }}>
              <Text style={styles.searchTextStyleHead}>Gunakan lokasi saat ini</Text>
              <Text style={styles.searchTextStyle}>GPS</Text>
            </TouchableOpacity>
          )
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={dataFilter}
        renderItem={(({ item }) => (
          <TouchableOpacity onPress={() => isChoosen(item)} key={item.id} activeOpacity={0.8} style={styles.searchItemContainer}>
            <Text style={styles.textStyleHead}>{item.name}</Text>
            <Text style={styles.textStyle}>{item.type == 'City' ? 'Kota / Kabupaten' : 'Provinsi'}</Text>
          </TouchableOpacity>
        ))}
      />
    </View>
  );
}

export default Page