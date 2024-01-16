import React, { useState, useContext} from 'react';
import { View, TouchableOpacity,Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../UserContext.js';
import { SERVER_ADDRESS} from '../../../config';

const ChangeEmailScreen = () => {

  const navigation = useNavigation();
  const {user,setUser} = useContext(UserContext);
  const [e_mail, setEmail] = useState('');

  const handleAcceptChange = async () => {

    if (e_mail)
    {
      if (e_mail.length<7) {
        alert("To nie wygląda jak e-mail");
      }
      else{
          const updateResponse = await fetch(`${SERVER_ADDRESS}/uzytkownik/${user.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: e_mail,
            }),
          });

          if(updateResponse.ok){
            setUser({
              ...user,
              email: e_mail,
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
      <Text style={{color:'#F1CC08', fontSize:20}}>{user.email}</Text>
      </View>
        <TextInput
        style={[styles.input, { marginBottom: 34 }]}
        placeholder="NOWY E-MAIL"
        placeholderTextColor="rgba(186, 186, 186, 0.5)"
        value={e_mail}
        onChangeText={(text) => setEmail(text)}
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

export default ChangeEmailScreen;
