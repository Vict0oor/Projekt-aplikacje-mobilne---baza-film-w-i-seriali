import React,{useContext} from 'react';
import { View, Text, Image, StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {PHOTO_SERVER_ADDRESS } from '../../../config';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { UserContext } from '../../UserContext.js';
import { SERVER_ADDRESS } from '../../../config';

const FilmDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

 const handleReviewPress = async () => {
  navigation.navigate('ReviewsScreen',{ movieID:item.id});
 };

 const handleAddPress = async () => {
  try {
    const response = await axios.get(`${SERVER_ADDRESS}/listy?uzytkownikID=${user.id}`);
    const data = await response.data;

    const userId = user.id;
    const userLists = data.filter(list => list.id === userId);
    const existingItemIds = userLists.length > 0 ? userLists[0].pozycjeID : [];

    if (!existingItemIds.includes(item.id)) {
      await axios.put(`${SERVER_ADDRESS}/listy/${userId}`, {
        uzytkownikID: userId,
        pozycjeID: [...existingItemIds, item.id],
      });

      console.log("Dodano element do listy na serwerze.");
    } 

  } catch (error) {
    console.error("Błąd podczas dodawania elementu:", error);
  }
};


  return (
    <ScrollView style={styles.container} vertical={true}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Image source={{uri: `${PHOTO_SERVER_ADDRESS}${item.sciezka}`}} style={styles.filmImage} />
     
      <LinearGradient
        colors={['transparent', 'rgba(30, 30, 30, 1)', 'rgba(30, 30, 30, 1)']}
        style={styles.gradient}
      >
      </LinearGradient>
      <View style={styles.basicInfo}>
      <Text style={{color:'#F1CC08',  fontSize: 20, fontFamily: 'sans-serif-medium'}}>{item.typ}</Text>
      <Text style={{color:'#FFFFFF',  fontSize: 24, fontFamily: 'sans-serif-medium'}}>{item.tytul}</Text>
      <Text style={{color:'#F1CC08',  fontSize: 15, fontFamily: 'sans-serif-medium'}}>Rok: {item.rok}     Ocena: {item.ocena}     {item.czas}</Text>
      </View>
      <View style={styles.specificInfo}>
        <View style={styles.textContainer}>
        <Text style={styles.whiteText}>Gatunek: </Text>
        <Text style={styles.yellowText}>{item.gatunek}</Text>
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.whiteText}>Produkcja: </Text>
        <Text style={styles.yellowText}>{item.produkcja}</Text>
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.whiteText}>Premiera: </Text>
        <Text style={styles.yellowText}>{item.premiera}</Text>
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.whiteText}>Reżyseria: </Text>
        <Text style={styles.yellowText}>{item.rezyseria}</Text>
        </View>
        <View style={{marginLeft: 3}}>
        <Text style={styles.whiteText}>Opis: </Text>
        <Text style={styles.yellowText}>{item.opis}</Text>
       </View>
       <View style={{paddingTop:20}}>
        <Text style={styles.whiteText}>Obsada: </Text>
        <Text style={styles.yellowText}>{item.obsada}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttons}>
        <Text style={styles.blackText} onPress={handleReviewPress} >Zobacz opinie innych</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={() => handleAddPress()}>
      <View style={styles.buttonContainer}>
      <Text style={styles.blackText}>Chcę obejrzeć  </Text>
      <Image source={require('../../../assets/icons/eye.png')}/>
      </View>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  filmImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    height: 600,
    width: 400
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  basicInfo: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    top: -70
  },
  specificInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center', 
    top: -10
  },
  textContainer: {
    padding: 5,
    flexDirection: 'row',
  },
  whiteText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  yellowText: {
    color: '#F1CC08',
    fontSize: 15,
  },
  blackText: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  buttons: {
    marginTop:30,
    marginBottom:30,
    backgroundColor: '#F1CC08',
    width: 250,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 10, 
  },
});

export default FilmDetailsScreen;
