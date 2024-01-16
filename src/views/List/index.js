import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SERVER_ADDRESS, PHOTO_SERVER_ADDRESS } from '../../../config';

const List = ({ navigation }) => {
  const [allSeries, setAllSeries] = useState([]);
  const [allFilms, setAllFilms] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const [selectedGenerOption, setSelectedGenerOption] = useState('');
  const [mediaTypeOptions] = useState(['Typ', 'Seriale', 'Filmy']);
  const [sortOptions] = useState(['Sortuj', 'Od najnowszego', 'Od najstarszego', 'Od najlepszego', 'Od najgorszego']);
  const [generOptions] = useState(['Gatunek', 'Horror', 'Dramat', 'Komedia', 'Animacja', 'Sci-Fi', 'Kryminał', 'Przygodowy', 'Fantasy', 'Akcja', 'Thriller']);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData('seriale', setAllSeries);
    fetchData('filmy', setAllFilms);
  }, [selectedSortOption, selectedGenerOption, searchText]);

  const fetchData = async (endpoint, setData) => {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${endpoint}`);
      const data = await response.json();

      const sortedData = sortData(data, selectedSortOption);
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sortData = (data, sortOption) => {
    if (sortOption === 'Od najnowszego') {
      return data.sort((a, b) => b.rok - a.rok);
    } else if (sortOption === 'Od najstarszego') {
      return data.sort((a, b) => a.rok - b.rok);
    } else if (sortOption === 'Od najlepszego') {
      return data.sort((a, b) => b.ocena - a.ocena);
    } else if (sortOption === 'Od najgorszego') {
      return data.sort((a, b) => a.ocena - b.ocena);
    }

    return data;
  };

  const filterDataByGenre = (data, genreOption) => {
    if (genreOption === 'Gatunek') {
      return data;
    }
    return data.filter(item => item.gatunek.includes(genreOption));
  };

  const filterDataByTitle = (data, title) => {
    if (!title) {
      return data;
    }
    const lowercasedTitle = title.toLowerCase();
    return data.filter(item => item.tytul.toLowerCase().includes(lowercasedTitle));
  };

  const renderFilteredData = () => {
    const sortedData = sortData(productions, selectedSortOption);
    const filteredData = filterDataByGenre(sortedData, selectedGenerOption);
    return filterDataByTitle(filteredData, searchText);
  };

  const handleSearch = () => {
    const filteredData = renderFilteredData();
    setAllSeries(filteredData);
  };

  const renderItem2 = ({ item }) => {
    const handlePress = () => {
      navigation.navigate('FilmDetails', { item });
    };

    return (
      <View style={styles.filmContainer}>
        <TouchableOpacity style={styles.filmCard} onPress={handlePress}>
          <Image source={{ uri: `${PHOTO_SERVER_ADDRESS}${item.sciezka}` }} style={styles.filmImage} />
        </TouchableOpacity>
        <View style={styles.textcontainer}>
          <Text style={styles.title}>{item.tytul}</Text>
          <Text style={styles.yellowText}>Ocena: {item.ocena}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 60 }}>
            <Text style={styles.yellowText}>Gatunek: </Text>
            <Text style={styles.whiteText}>{item.gatunek}</Text>
          </View>
        </View>
      </View>
    );
  };

  const productions = selectedMediaType === 'Seriale' ? allSeries : allFilms;
  const filteredAndSortedData = renderFilteredData();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Szukaj..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity style={styles.search} onPress={handleSearch}>
            <Image source={require('../../../assets/icons/searchList.png')} style={{ marginLeft: 6, marginTop: 3 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.pickerContainer1}>
          <Picker
            selectedValue={selectedMediaType}
            onValueChange={(itemValue) => setSelectedMediaType(itemValue)}
            mode="dialog"
            style={styles.picker}
            dropdownIconColor="#F1CC08"
          >
            {mediaTypeOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer2}>
          <Picker
            selectedValue={selectedSortOption}
            onValueChange={(itemValue) => setSelectedSortOption(itemValue)}
            mode="dialog"
            style={styles.picker}
            dropdownIconColor="#F1CC08"
          >
            {sortOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} color="#000000" />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer3}>
          <Picker
            selectedValue={selectedGenerOption}
            onValueChange={(itemValue) => setSelectedGenerOption(itemValue)}
            mode="dialog"
            style={styles.picker}
            dropdownIconColor="#F1CC08"
          >
            {generOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} color="#000000" />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredAndSortedData}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem2}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  filmCard: {
    width: 120,
    height: 170,
    backgroundColor: '#f1cb08',
    margin: 10,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  search: {
    width: 50,
    height: 45,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 3,
    marginTop: -45,
  },
  filmImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  listContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    height: 600,
    marginLeft: -10,
    marginRight: -10,
    marginTop: 10,
    borderColor: '#F1CC08',
    borderWidth: 2,
  },
  filmContainer: {
    flex: 1,
    borderColor: '#F1CC08',
    borderBottomWidth: 2,
    alignItems: 'left',
    flexDirection: 'row',
  },
  textcontainer: {
    flex: 1,
    alignItems: 'left',
  },
  whiteText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 15,
    flexWrap: 'wrap',
  },
  yellowText: {
    marginTop: 10,
    color: '#F1CC08',
    fontSize: 15,
    flexWrap: 'wrap',
  },
  input: {
    marginTop: 50,
    width: 330,
    height: 45,
    borderWidth: 1,
    paddingLeft: 55,
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 2,
    backgroundColor: '#444444',
  },
  pickerContainer1: {
    width: 160,
    height: 45,
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: -170,
    backgroundColor: '#444444',
  },
  pickerContainer2: {
    width: 160,
    height: 45,
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 2,
    marginTop: -45,
    marginLeft: 170,
    backgroundColor: '#444444',
  },
  pickerContainer3: {
    width: 160,
    height: 45,
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 2,
    marginTop: 8,
    backgroundColor: '#444444',
  },
  picker: {
    marginTop: -6,
    height: 40,
    width: 150,
    color: '#F1CC08',
  },
});

export default List;
