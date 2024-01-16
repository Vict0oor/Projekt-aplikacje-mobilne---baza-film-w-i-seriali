import React, { useContext,useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {SERVER_ADDRESS} from '../../../config';
import { UserContext } from '../../UserContext.js';
import { useNavigation } from '@react-navigation/native';

const AddReviewScreen = ({route}) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { movieID } = route.params;
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();
  
  const handleAddReview = async () => {
    if (rating && title && content) {
      try {
        const response = await fetch(`${SERVER_ADDRESS}/opinie`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pozycjaID: movieID,
            tytul: title,
            opis: content,
            ocena: rating,
            uzytkownikID: user.id,
            awatar: user.awatar,
            login: user.login,
          }),
        });
  
        if (response.ok) {
          const updateResponse = await fetch(`${SERVER_ADDRESS}/uzytkownik/${user.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              liczbaOcenionych: user.liczbaOcenionych + 1,
              sredniaOcen: (user.sredniaOcen * user.liczbaOcenionych + rating) / (user.liczbaOcenionych + 1),
            }),
          });
    
          if(updateResponse.ok){
          setUser({
            ...user,
            liczbaOcenionych: user.liczbaOcenionych + 1,
            sredniaOcen:
              (user.sredniaOcen * user.liczbaOcenionych + rating) / (user.liczbaOcenionych + 1),
          });
        }
          alert('Dziękujemy za twoją opinię ;)');
          navigation.goBack();
          navigation.goBack();
        } else {
          setError('Błąd podczas przesyłania danych na serwer');
        }
      } catch (error) {
        setError('Błąd podczas przesyłania danych na serwer');
      }
    } else {
      alert('Uzupełnij dane poprawnie');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          style={styles.starWrapper}
        >
          <FontAwesomeIcon
            icon={faStar}
            style={[
              styles.starIcon,
              i <= rating ? styles.selectedStar : null,
              i > rating ? styles.emptyStar : null,
            ]}
            size={22}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.label}>Ocena</Text>
        <View style={styles.starContainer}>
          {renderStars()}
          <Text style={styles.ratingCounter}>{rating}</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tytuł</Text>
        <TextInput
          style={styles.input}
          placeholder="Wprowadź tytuł"
          maxLength={50}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Treść</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Wprowadź treść recenzji"
          multiline
          maxLength={1000}
          value={content}
          onChangeText={(text) => setContent(text)}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Anuluj</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddReview} style={styles.addButton}>
          <Text style={styles.buttonText}>Dodaj</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  ratingContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 18,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  starWrapper: {
    marginHorizontal: 2,
  },
  starIcon: {
    color: '#F1CC08',
    marginBottom: 5,
  },
  selectedStar: {
    color: '#F1CC08',
  },
  emptyStar: {
    color: 'grey', 
  },
  ratingCounter: {
    color: '#F1CC08',
    fontSize: 40,
    marginLeft: 35,
    marginRight: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: 'white',
    fontSize: 16,
    padding: 10,
    height: 65,
    borderRadius: 8,
    marginTop: 15,
  },
  textArea: {
    backgroundColor: '#1E1E1E',
    color: 'white',
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    height: 350,
    textAlignVertical: 'top',
    marginTop: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    fontWeight: 'bold',
    backgroundColor: '#F1CC08',
    borderRadius: 15,
    padding: 15,
    marginLeft: 25,
    marginRight: 20,
  },
  addButton: {
    flex: 1,
    fontWeight: 'bold',
    backgroundColor: '#F1CC08',
    borderRadius: 15,
    padding: 15,
    marginLeft: 20,
    marginRight: 25,
  },
  buttonText: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default AddReviewScreen;