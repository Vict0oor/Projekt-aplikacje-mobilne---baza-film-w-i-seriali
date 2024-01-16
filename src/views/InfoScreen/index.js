import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Nazwa aplikacji: Movies</Text>
      <Text style={styles.infoText}>Wersja: 1.0.0</Text>
      <Text style={styles.infoText}>Opis:</Text>
      <Text style={styles.whiteText}>Aplikacja została stworzona w ramach projektu z przedmiotu "Aplikacje mobilne". Pozwala na przeglądanie filmów i serial, ich ocenianie oraz posiada wszystkie niezbędne funkcję aplikacji związanej z bazą produkcji filmowych.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#161616',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    color: '#F1CC08',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'justify',
    marginTop: 15,
  },
  whiteText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 1,
  },
});

export default InfoScreen;
