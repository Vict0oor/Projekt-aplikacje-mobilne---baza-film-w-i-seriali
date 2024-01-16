import React, { useState, useContext} from 'react';
import { View, TouchableOpacity,Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../UserContext.js';
import { SERVER_ADDRESS} from '../../../config';

const ChangePasswordScreen = () => {

  const navigation = useNavigation();
  const {user,setUser} = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleAcceptChange = async () => {

    if (password && newPassword && confirmPassword)
    {
      if(password==user.haslo){
      if(newPassword === confirmPassword)
      {
        if(newPassword.length>7)
        {
          const updateResponse = await fetch(`${SERVER_ADDRESS}/uzytkownik/${user.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              haslo: newPassword,
            }),
          });

          if(updateResponse.ok){
            setUser({
              ...user,
              haslo: newPassword,
            });
            alert("Dane zostały zaaktualizowane!");
            navigation.goBack();
          }
        }
        else
        alert("Nowe hasło jest za krótkie!");
      }
      else
      alert("Hasła nie są takie same!");
      }
      else
      alert("Wpisz poprawne obecne hasło!");
    }
    else
    alert("Wpisz wszystkie dane!");
  };
  const handleGoBack = async () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
       <TextInput
       secureTextEntry={true}
        style={[styles.input, { marginBottom: 34 }]}
        placeholder="AKTUALNE HASŁO"
        placeholderTextColor="rgba(186, 186, 186, 0.5)"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
        <TextInput
        secureTextEntry={true}
        style={[styles.input, { marginBottom: 34 }]}
        placeholder="NOWE HASŁO"
        placeholderTextColor="rgba(186, 186, 186, 0.5)"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
        <TextInput
        secureTextEntry={true}
        style={[styles.input, { marginBottom: 34 }]}
        placeholder="POTWIERDŹ HASŁO"
        placeholderTextColor="rgba(186, 186, 186, 0.5)"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
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
});

export default ChangePasswordScreen;
