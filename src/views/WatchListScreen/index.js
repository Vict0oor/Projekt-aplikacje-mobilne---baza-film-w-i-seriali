import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../UserContext.js';
import { SERVER_ADDRESS, PHOTO_SERVER_ADDRESS } from '../../../config';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";

const WatchListScreen = ({ navigation }) => {
  const [lists, setAllLists] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const { user } = useContext(UserContext);
  const [renderedItems, setRenderedItems] = useState([]);

  const handlePress = async (item) => {
    navigation.navigate('FilmDetails', { item });
  };

  const fetchData = async (endpoint, setData) => {
    try {
      const response = await axios.get(`${SERVER_ADDRESS}/${endpoint}`);
      const data = await response.data;

      setData(data);
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
    }
  };

  const refreshData = () => {
    fetchData(`listy?uzytkownikID=${user.id}`, setAllLists);
    fetchData('filmy', setMovies);
    fetchData('seriale', setSeries);
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshData();
    }, [])
  );

  useEffect(() => {
    const allItems = [...movies, ...series];
    const filteredItems = allItems.filter((item) =>
      lists.some((list) => list.pozycjeID.includes(item.id))
    );
    setRenderedItems(filteredItems);
  }, [lists, movies, series]);


  const removeItem = async (index) => {
    try {
      const itemIdToRemove = renderedItems[index].id;

      await axios.put(`${SERVER_ADDRESS}/listy/${user.id}`, {
        uzytkownikID: user.id,
        pozycjeID: lists
          .filter(list => list.id === user.id)
          .map(list => list.pozycjeID.filter(id => id !== itemIdToRemove))[0],
      });

      console.log("Usunięto element z serwera.");
    } catch (error) {
      console.error("Błąd podczas usuwania elementu:", error);
    }

    const updatedItems = renderedItems.filter((_, i) => i !== index);
    setRenderedItems(updatedItems);
  };


  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.movieItem}>
        <Image source={{ uri: PHOTO_SERVER_ADDRESS + item.sciezka }} style={styles.poster} />
        <View style={styles.movieInfo}>
          <View style={styles.movieTile}>
            <Text style={styles.movieTitle}>{item.tytul}</Text>
          </View>
          <View>
          <View style={styles.line}/>
          <Text style={styles.typeText}>{item.typ}</Text> 
          <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeButton}>
              <FontAwesomeIcon icon={faTimes} style={styles.removeIcon} />
            </TouchableOpacity>
        </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Twoja lista </Text>
      <Text style={styles.counter}>Liczba produkcji do obejrzenia: {renderedItems.length}</Text>
      <FlatList
        data={renderedItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 16,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#F1CC08',
    textShadowColor: '#000',
    textShadowRadius: 6,
  },
  counter: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  movieList: {
    flexGrow: 1,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1, 
    borderColor: '#F1CC08', 
    borderRadius: 10, 
    overflow: 'hidden',
    backgroundColor: '#292929',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 0,
    marginRight: 16,
  },
  movieInfo: {
    flex: 1,
  },
  movieTile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#F1CC08',
  },
  movieTitle: {
    color: '#F1CC08',
    fontSize: 18,
    flexWrap: 'wrap',
  },
  removeButton: {
    backgroundColor: '#F1CC08',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: 30,
    height: 30,
    marginLeft: 180,
    marginTop: 30,
  },
  removeIcon: {
    color: 'black',
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
  },
});

export default WatchListScreen;