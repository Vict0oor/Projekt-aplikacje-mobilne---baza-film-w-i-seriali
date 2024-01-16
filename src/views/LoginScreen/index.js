import React, { useContext, useCallback, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import { SERVER_ADDRESS} from '../../../config';
import { UserContext } from '../../UserContext.js';

SplashScreen.preventAutoHideAsync();

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);
  const [isLoaded] = useFonts({
    "ks-regular": require("../../../assets/fonts/KaushanScript-Regular.ttf"),
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  const fetchUserFromServer = async (username, password) => {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/uzytkownik`);
      const data = await response.json();

      const user = data.find((u) => u.login === username && u.haslo === password);

      return user;
    } catch (error) {
      console.error("Błąd podczas pobierania danych z serwera:", error);
      throw error;
    }
  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  }

  const handleLoginPress = async () => {
    try {
      const user = await fetchUserFromServer(username, password);

      if (user) {
        setUser(user);
        setUsername('');
        setPassword('');
        navigation.navigate('MainScreen');
      } else {
        alert("Nieprawidłowy login lub hasło");
      }
    } catch (error) {
      alert("Wystąpił błąd. Spróbuj ponownie.");
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container} onLayout={handleOnLayout}>
      <View style={styles.circle} />
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Movies</Text>
      <TextInput
        style={[styles.input, { marginBottom: 34 }]}
        placeholder="USERNAME"
        placeholderTextColor="rgba(186, 186, 186, 0.5)"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={[styles.input, { marginBottom: 46 }]}
        placeholder="PASSWORD"
        placeholderTextColor="rgba(186, 186, 186, 0.5)"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Stwórz konto</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
  logo: {
    bottom: 584,
    position: 'absolute',
    width: 205,
    height: 190,
    flexShrink: 0,
    borderRadius: 93,
    backgroundColor: 'transparent',
  },
  circle: {
    position: 'absolute',
    bottom: 567,
    width: 389,
    height: 378,
    flexShrink: 0,
    borderRadius: 389,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'rgba(35, 35, 35, 0.50)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    top: -5,
    flexShrink: 0,
    color: '#F1CC08',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontFamily: "ks-regular",
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  input: {
    top: 105,
    width: 282,
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
    top: 105,
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
  buttonText: {
    textAlign: 'center',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
  },
});

export default LoginScreen;
