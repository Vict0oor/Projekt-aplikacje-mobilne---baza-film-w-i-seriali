import React, { useState, useContext,useEffect} from 'react';
import { View, TouchableOpacity,Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../UserContext.js';
import { SERVER_ADDRESS} from '../../../config';
import axios from 'axios';
const ChangeUsernameScreen = () => {

  const navigation = useNavigation();
  const {user,setUser} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
       const response = await axios.get(`${SERVER_ADDRESS}/uzytkownik`);

       setUsers(response.data);

      } catch (error) {
        console.error('Błąd podczas pobierania danych o użytkownikach', error);
      }
    };
    fetchUsers();
  }, []);


  const handleAcceptChange = async () => {

    if (username)
    {
      if (users.some(user => user.login === username)) {
        alert("Taka nazwa jest już zajęta");
      }
      else{
          const updateResponse = await fetch(`${SERVER_ADDRESS}/uzytkownik/${user.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login: username,
            }),
          });

          if(updateResponse.ok){
            setUser({
              ...user,
              login: username,
            });
            alert("Dane zostały zaaktualizowane!");
            navigation.goBack();
          }
        }
    }
    else
    alert("Wpisz wszystkie dane!");
  };
  const handleGoBack = async () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.username}>
      <Text style={{color:'#F1CC08', fontSize:25}}>{user.login}</Text>
      </View>
        <TextInput
        style={[styles.input, { marginBottom: 34 }]}
        placeholder="NOWA NAZWA"
        placeholderTextColor="rgba(186, 186, 186, 0.5)"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <View style={styles.buttoncontainer}>
       <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Anuluj</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginLeft: 46 }]} onPress={handleAcceptChange}>
        <Text style={styles.buttonText}>Zmień</Text>
      </TouchableOpacity>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    justifyContent: 'center',
    alignItems:'center',
    
  },
  buttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 300,
    height: 55,
    flexShrink: 0,
    borderRadius: 15,
    backgroundColor: 'rgba(186, 186, 186, 0.10)',
    paddingLeft: 15,
    color: '#fff',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  button: {
    width: 130,
    height: 55,
    flexShrink: 0,
    borderRadius: 15,
    backgroundColor: '#F1CC08',
    marginBottom: 34,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  username: {
    width: 300,
    height: 55,
    backgroundColor: 'rgba(186, 186, 186, 0.10)',
    marginBottom:50,
    borderRadius:15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChangeUsernameScreen;
