import React, { useContext, useState,useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SERVER_ADDRESS,PHOTO_SERVER_ADDRESS} from '../../../config';
import { UserContext } from '../../UserContext.js';
import axios from "axios";

const UserScreen = () => {
  const navigation = useNavigation();
  const {user} = useContext(UserContext);
  const [opinions, setOpinions] = useState([]);
  const [productions, setProductions] = useState([]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCameraPress = async () => {
    navigation.navigate('SetAvatarScreen');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_ADDRESS}/opinie?uzytkownikID=${user.id}`);
        const data = await response.data;
        const productionIDs = data.map(productionID => productionID.pozycjaID);

        setOpinions(data);

        const movieResponse = await axios.get(`${SERVER_ADDRESS}/filmy`);
        const watchedMovies = movieResponse.data.filter(production => productionIDs.includes(production.id));
        

        const seriesResponse = await axios.get(`${SERVER_ADDRESS}/seriale`);
        const watchedSeries = seriesResponse.data.filter(production => productionIDs.includes(production.id));

        const watchedProductions = watchedSeries.concat(watchedMovies);
  
        setProductions(watchedProductions);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };

    fetchData();
  }, [user]);

  const renderItem = ({item}) => {
    const handlePress = () => {
      navigation.navigate('FilmDetails', { item });
    };
    const rating = opinions.filter(opinion => opinion.pozycjaID === item.id);
    return (
      <TouchableOpacity style={styles.filmCard} onPress={handlePress}>
        <Image source={{ uri: `${PHOTO_SERVER_ADDRESS}${item.sciezka}` }} style={styles.filmImage} />
        <Text style={styles.ratingText}>{rating[0].ocena}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={styles.container2}>
      <Image source={{uri:`${PHOTO_SERVER_ADDRESS}/${user.awatar}`}} style={styles.userAvatar} />
      <Text style={styles.loginText}>{user.login}</Text>
      <TouchableOpacity onPress={handleCameraPress} style={styles.camera}>
      <Image source={require('../../../assets/icons/camera.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoBack} style={styles.outIcon} >
      <Image  source={require('../../../assets/icons/back.png')} />
      </TouchableOpacity>
      </View>
      <View style={styles.TextContainer}>
        <Text style={styles.headerText}>Liczba obejrzanych produkcji: </Text>
        <Text style={styles.valueText}>{user.liczbaOcenionych}</Text>
        <Text style={styles.headerText}>Średnia twoich ocen: </Text>
        <Text style={styles.valueText}>{parseFloat(user.sredniaOcen).toFixed(1)}</Text>
      </View>
      <Text style={[styles.headerText,{marginBottom:10}]}>Obejrzane (ocenione) produkcje:</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={productions}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#161616',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    top:40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextContainer:{
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText:{
    marginBottom: 10,
    color:'white',
    fontSize: 20
  },

  valueText:{
    marginBottom: 10,
    color: '#F1CC08',
    fontSize: 20
  },
  ratingText:{
    fontSize: 80,
    top: -88,
    left: -50,
    fontWeight: '500',
    fontFamily: 'Roboto',
    color: '#F1CC08',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textAlign: 'center',
    letterSpacing: 0,
  },
  circle: {
    position: 'absolute',
    bottom: 567,
    width: 460,
    height: 450,
    flexShrink: 0,
    borderRadius: 389,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#232323',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    top: 100,
    width: 282,
    height: 55,
    flexShrink: 0,
    borderRadius: 15,
    backgroundColor: '#F1CC08',
    marginBottom: 34,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#F1CC08',
  },
  userAvatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 2
  },
  camera: {
    marginLeft: 300,
    top: -175
  },
 outIcon: {
    marginRight: 300,
    top: -215
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
    marginBottom:50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    padding: 15,
    height: 250,
    minWidth: 390,
    borderColor: '#F1CC08',
    borderWidth: 2,
    marginLeft: -10,
    marginRight: -10,
  },
});

export default UserScreen;
