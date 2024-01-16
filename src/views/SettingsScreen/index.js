import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {

  const navigation = useNavigation();
  
  const handleGoBack = async () => {
    navigation.goBack();
  };
  const handleChangePassword = async () => {
    navigation.navigate('ChangePasswordScreen');
  };
  const handleChangeEmail = async () => {
    navigation.navigate('ChangeEmailScreen');
  };
  const handleChangeLogin = async () => {
    navigation.navigate('ChangeUsernameScreen');
  };

  const handleInfo = async () => {
    navigation.navigate('InfoScreen');
  };

  const handleLogout = async () => {
    navigation.pop(2);
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.outIcon} onPress={handleGoBack} >
      <Image source={require('../../../assets/icons/back.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Zmień hasło</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
        <Text style={styles.buttonText}>Zmień adres e-mail</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleChangeLogin}>
        <Text style={styles.buttonText}>Zmień nazwę użytkownika</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleInfo}>
        <Text style={styles.buttonText}>Informacje o aplikacji</Text>
      </TouchableOpacity>

      <View style={styles.countryContainer}>
        <Text style={styles.countryText}>Kraj</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Image source={require('../../../assets/icons/Poland.png')} style={styles.icon} />
        <Text style={[styles.buttonTextCountry]}>Polska</Text>
        
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Wyloguj</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
  },
  button: {
    height: 59,
    flexShrink: 0,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row', 
  },
  buttonText: {
    position:'absolute',
    left:13,
    color: '#F1CC08',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'left', 
    marginLeft: 10,
    marginRight:25 
  },

  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, 
  },
  countryText: {
    marginTop:40,
    color: '#F1CC08',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',

    marginLeft: 20
  },

  icon: {
    position:'absolute',
    width: 60,
    height: 40,
    left:20,
  },
  buttonTextCountry: {
    position:'absolute',
    color: '#F1CC08',
    fontSize: 20,
    fontStyle: 'normal',
    textAlign: 'left',
    fontWeight: '500' 
  },
  outIcon: {
  marginBottom:90,
  marginLeft:10
  },
});

export default SettingsScreen;
