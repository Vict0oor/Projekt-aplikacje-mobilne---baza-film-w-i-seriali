import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SERVER_ADDRESS, PHOTO_SERVER_ADDRESS } from '../../../config';

const MainScreen = ({ navigation }) => {
  const [allSeries, setallSeries] = useState([]);
  const [allFilms, setAllFilms] = useState([]);

  useEffect(() => {
    fetchData('seriale', setallSeries);
    fetchData('filmy', setAllFilms);
  }, []);

const fetchData = async (endpoint, setData) => {
  try {
    const response = await fetch(`${SERVER_ADDRESS}/${endpoint}`);
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
  }
};

  const renderItem = ({ item, index }) => {
    const handlePress = () => {
      navigation.navigate('FilmDetails', { item });
    };

    return (
      <TouchableOpacity style={styles.filmCard} onPress={handlePress}>
        <Image source={{ uri: `${PHOTO_SERVER_ADDRESS}${item.sciezka}` }} style={styles.filmImage} />
        <Text style={styles.filmNumber}>{index + 1}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({ item}) => {
    const handlePress = () => {
      navigation.navigate('FilmDetails', { item });
    };

    return (
      <TouchableOpacity style={styles.filmCard} onPress={handlePress}>
        <Image source={{ uri: `${PHOTO_SERVER_ADDRESS}${item.sciezka}` }} style={styles.filmImage} />
      </TouchableOpacity>
    );
  };

  const sortedFilms = allFilms.sort((a, b) => a.ranking - b.ranking);
  const sortedSeries = allSeries.sort((a, b) => a.ranking - b.ranking);
  const premieres = allFilms.filter((film) => film.nowy === 'Tak').concat(
    allSeries.filter((series) => series.nowy === 'Tak')
  );


  const top10Films = sortedFilms.slice(0, 10);
  const top10Series = sortedSeries.slice(0, 10);
  return (
    <ScrollView style={styles.container} vertical={true}>
      <Text style={styles.categoryTitle}>Top 10 Filmów</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={top10Films}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <Text style={styles.categoryTitle}>Top 10 Seriali</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={top10Series}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <Text style={styles.categoryTitle}>Premiery</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={premieres}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem2}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F1CC08',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  filmCard: {
    width: 150,
    height: 200,
    backgroundColor: '#f1cb08',
    margin: 10,
    marginLeft: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  filmImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  listContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    padding: 10,
    height: 250,
    borderColor: '#F1CC08',
    borderWidth: 2,
    marginLeft: -10,
    marginRight: -10,
  },
  filmNumber: {
    fontSize: 96,
    top: -105,
    left: -70,
    fontWeight: '500',
    fontFamily: 'Roboto',
    color: '#1e1e1e',
    textShadowColor: '#F1CC08',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: 'center',
    letterSpacing: 0,
  },
});

export default MainScreen;
