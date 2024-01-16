import { useCallback } from 'react';
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const RegisterSuccessScreen = ({navigation}) => {

  const handleBackToLogin= () => {
    navigation.navigate('LoginScreen');
  }

  const [isLoaded] = useFonts({
    "ks-regular": require("../../../assets/fonts/KaushanScript-Regular.ttf"),
  });
  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);
  if (!isLoaded) {
    return null;
  }
  return (
    <KeyboardAvoidingView behavior='padding'
    style={styles.container} onLayout={handleOnLayout}
  >
    <View style={styles.circle} />
    <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
      />
    <Text style={styles.Text1}>Movies</Text>
    <Text style={styles.Text2}>Gratulacje udało ci się stworzyć konto !!!</Text>
    <Image
        source={require('../../../assets/logo.png')}
        style={styles.svgImage}
      />
      <TouchableOpacity style={styles.button} onPress={handleBackToLogin}>
        <Text style={styles.buttonText}>Przejdź do aplikacji</Text>
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
  innerContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    bottom:584,
    position:'absolute',
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
  button: {
    position:'absolute',
    bottom: 249,
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
  Text1: {
    position:'absolute',
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
  Text2: {
    width: 286,
    height: 64,
    flexShrink: 0,
    color: '#F1CC08',
    textAlign: 'center',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  svgImage: {
    marginBottom:32,
    width: 64,
    height: 64,
    flexShrink: 0,
  },
});
export default RegisterSuccessScreen;
