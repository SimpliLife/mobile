import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions, Platform, TextInput, TouchableOpacity, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

function Page({ navigation }) {
  const [data, setData] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  const fetchLocation = async () => {
    try {
      let { data } = await axios.get("https://simplilife-d59aa106cc03.herokuapp.com/api/loc")
      setData(data.locations)
      setDataFilter(data.locations)
      return data.locations
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchLocation()
  }, [])
  const [filterOpen, setfilterOpen] = useState(false);
  const [filterValue, setfilterValue] = useState('all');
  const [filter, setfilter] = useState([
    { label: "All", value: "all" },
    { label: "Povinsi", value: "province" },
    { label: "Kabupaten / Kota", value: "city" },
  ]);
  const [text, onChangeText] = useState('Tulis disini..');

  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data, "data");
  };
  return (
    <View style={styles.container}>
      <Text style={{ width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90, textAlign: "left", fontWeight: "600", paddingVertical: 2 }}>Cari lokasimu </Text>
      <View style={{ flexDirection: "row", zIndex: 20, gap: 5, paddingBottom: 10 }}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Controller
          name="filter"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.dropdownfilter}>
              <DropDownPicker
                style={styles.dropdown}
                open={filterOpen}
                value={filterValue} //filterValue
                items={filter}
                setOpen={setfilterOpen}
                setValue={setfilterValue}
                setItems={setfilter}
                placeholder="Select filter"
                placeholderStyle={styles.placeholderStyles}
                onChangeValue={onChange}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
          )}
        />
        <TouchableOpacity activeOpacity={0.8} style={{ height: 50, width: 50, backgroundColor: "#118AC4", borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
          <Image source={require("../assets/fig/search.png")} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>


      <FlatList
        keyExtractor={(item) => item.id}
        data={dataFilter}
        renderItem={(({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.textStyleHead}>{item.name}</Text>
            <Text style={styles.textStyle}>{item.type == 'City' ? 'Kota / Kabupaten' : 'Provinsi'}</Text>
          </View>
        ))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: "#F4F4F4",
    padding: 20,
    marginVertical: 5,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    width: Platform.OS == 'web' ? 400 * 0.90 : Dimensions.get('window').width * 0.90,
  },
  dropdown: {
    borderColor: "#B7B7B7",
    zIndex: 20,
    height: 50,
    width: Platform.OS == 'web' ? 400 * 0.90 / 3 : Dimensions.get('window').width * 0.90 / 3,
  },
  dropdownfilter: {
    width: Platform.OS == 'web' ? 400 * 0.90 / 3 : Dimensions.get('window').width * 0.90 / 3,
    zIndex: 20
  },
  input: {
    borderColor: "#B7B7B7",
    borderWidth: 1,
    height: 50,
    width: Platform.OS == 'web' ? 400 * 0.90 / 1.8 : Dimensions.get('window').width * 0.90 / 2,
    paddingLeft: 8,
    borderRadius: 8,
  },
  textStyle: {
    fontSize: 12,
    color: 'black',
    letterSpacing: 1,
  },
  textStyleHead: {
    fontSize: 12,
    color: 'black',
    letterSpacing: 1,
    fontWeight: '600'
  }
});


export default Page