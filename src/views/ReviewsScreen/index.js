import React, { useState, useEffect, useContext} from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { SERVER_ADDRESS, PHOTO_SERVER_ADDRESS} from '../../../config';
import { UserContext } from '../../UserContext.js';

const ReviewsScreen = ({ route, navigation }) => {
  const { movieID } = route.params;
  const [reviews, setReviews] = useState([]);
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const {user} = useContext(UserContext);
  navigation = useNavigation();

  const handleAddReviewPress = () => {
    if (!userHasReviewed) {
   navigation.navigate('AddReviewScreen', {movieID});
    }
    else
    {
      alert("Już oceniłeś tę produkcję. Zapraszamy do ocenienia innych! ");
    }
  };

  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const response = await fetch(`${SERVER_ADDRESS}/opinie?pozycjaID=${movieID}`);
        if (response.ok) {
          const reviews = await response.json();
          setReviews(reviews);

          const userReview = reviews.find((review) => review.uzytkownikID === user.id);
          setUserHasReviewed(!!userReview);

        } else {
          console.error('Błąd podczas pobierania danych o opiniach');
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych o opiniach', error);
      }
    };
    fetchOpinions();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const goToUserProfile = (userID) => {
    navigation.navigate('OtherUserScreen',{userID});
  }

  const renderHeader = () => (
    <>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} style={styles.backIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleAddReviewPress}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>Dodaj własną ocenę</Text>
      </TouchableOpacity>
      <Text style={styles.reviewsHeaderText}>RECENZJE UŻYTKOWNIKÓW</Text>
      {reviews.length === 0 && (
        <Text style={styles.reviewsHeaderText}>Brak recenzji dla tej pozycji. Bądź pierwszy!!!</Text>
      )}
      <View style={styles.separator} />
    </>
  );

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.userContainer}>
        <TouchableOpacity onPress={() => goToUserProfile(item.uzytkownikID)}>
        <Image source={{uri: `${PHOTO_SERVER_ADDRESS}/${item.awatar}`}} style={styles.userAvatar} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.reviewTitle}>{item.tytul}</Text>
            <Text style={styles.username}>{item.login}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{item.ocena}</Text>
            <FontAwesomeIcon icon={faStar} style={styles.starIcon} />
          </View>
        </View>
      </View>
      <Text style={styles.reviewContent}>{item.opis}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View>
            <View style={styles.separator} />
            <View style={styles.separator} />
          </View>
        )}
        contentContainerStyle={styles.reviewList}
        stickyHeaderIndices={[-1]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 15,
  },
  backIcon: {
    color: '#F1CC08',
  },
  addButton: {
    backgroundColor: '#F1CC08',
    padding: 10,
    borderRadius: 8,
    marginBottom: 70,
    alignSelf: 'center',
    width: '80%',
  },
  addButtonText: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewsHeaderText: {
    marginBottom: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  reviewList: {
    flexGrow: 1,
  },
  reviewItem: {
    padding: 16,
    backgroundColor: '#0f0f0f',
    borderRadius: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  reviewTitle: {
    color: 'white',
    fontSize: 18,
  },
  username: {
    marginTop: 10,
    color: '#F1CC08',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 16,
  },
  ratingContainer: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  rating: {
    color: '#F1CC08',
    fontSize: 36,
    top: 8, 
  },
  starIcon: {
    color: '#F1CC08',
    fontSize: 16,
    marginLeft: 4,
  },
  reviewContent: {
    color: 'white',
    marginTop: 8,
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#F1CC08',
    marginVertical: 5,
  },
});

export default ReviewsScreen;