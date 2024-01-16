import { useEffect, useState, useCallback } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SERVER_ADDRESS,PHOTO_SERVER_ADDRESS} from '../../../config';
import axios from "axios";

SplashScreen.preventAutoHideAsync();

const RegisterScreen = ({ navigation }) => {
  const [isLoaded] = useFonts({
    "ks-regular": require("../../../assets/fonts/KaushanScript-Regular.ttf"),
  });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${SERVER_ADDRESS}/uzytkownik`);
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        } else {
          console.error('Błąd podczas pobierania danych o użytkownikach');
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych o użytkownikach', error);
      }
    };
    fetchUsers();
  }, []);

  const handleRegisterSuccess = async () => {
    if (username && email && password && confirmPassword && password === confirmPassword) {
      if (users.some(user => user.login === username)) {
        setError('Taki login już istnieje');
      } else if (users.some(user => user.email === email)) {
        setError('Taki e-mail jest niedostępny');
      } else if (password.length < 8) {
        setError('Hasło za krótkie');
      } else if (email.length < 5) {
        setError('E-mail niepoprawny');
      } else {
        try {
          const response = await fetch(`${SERVER_ADDRESS}/uzytkownik`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login: username,
              haslo: password,
              email,
              awatar: "images/avatar.png",
              liczbaOcenionych: 0,
              sredniaOcen: 0,
            }),
          });
  
          if (response.ok) {
            const userData = await response.json();
            const userId = userData.id;
            navigation.navigate('RegisterSuccessScreen');
            createNewList(userId);
          } else {
            setError('Błąd podczas przesyłania danych na serwer');
          }
        } catch (error) {
          setError('Błąd podczas przesyłania danych na serwer');
        }
      }
    } else {
      setError('Dane niepoprawne!!!');
    }
  };

  const createNewList = async (userId) => {
    try {
      const newList = {
        uzytkownikID: userId,
        pozycjeID: [],
      };
  
      await axios.post(`${SERVER_ADDRESS}/listy`, newList);
      console.log("Utworzono nową listę");
    } catch (error) {
      console.error("Błąd podczas tworzenia nowej listy:", error);
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container} onLayout={handleOnLayout}>
      <View style={styles.circle} />
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Movies</Text>
      <TextInput
        style={[styles.input, { marginBottom: 34, marginTop: 75 }]}
        placeholder="USERNAME"
        placeholderTextColor="rgba(186, 186, 186, 0.5)"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={[styles.input, { marginBottom: 46 }]}
        placeholder="EMAIL"
        placeholderTextColor="rgba(186, 186, 186, 0.5)"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        style={[styles.input, { marginBottom: 34 }]}
        placeholder="PASSWORD"
        placeholderTextColor="rgba(186, 186, 186, 0.5)"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        secureTextEntry={true}
        style={[styles.input, { marginBottom: 46 }]}
        placeholder="CONFIRM PASSWORD"
        placeholderTextColor="rgba(186, 186, 186, 0.5)"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegisterSuccess}>
        <Text style={styles.buttonText}>Stwórz konto</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
    position: 'absolute',
    bottom: 575,
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
  errorText: {
    position: 'absolute',
    bottom: 10,
    flexShrink: 0,
    color: 'red',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});

export default RegisterScreen;
