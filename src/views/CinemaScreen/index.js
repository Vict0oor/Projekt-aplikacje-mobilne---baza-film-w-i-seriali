import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios'; 
import * as Location from 'expo-location';
import { SERVER_ADDRESS } from '../../../config';

export default function CinemaScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.05,
  });

  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    fetchData('kina', setCinemas);
    getLocation();
  }, []);

  const fetchData = async (endpoint, setData) => {
    try {
      const response = await axios.get(`${SERVER_ADDRESS}/${endpoint}`);
      const data = await response.data;

      setData(data || []);
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
    }
  };

  const handleSearch = () => {
    const found = cinemas.find((kino) => kino.nazwa.toLowerCase() === searchText.toLowerCase());
    if (found) {
      setSelectedCinema(found);
      setMapRegion({
        latitude: found.lokalizacja.szerokoscG,
        longitude: found.lokalizacja.dlugoscG,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
  };

  const handleMapClick = () => {
    if (userLocation) {
      setSelectedCinema(null);
      setMapRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    } else {
      alert( "Brak dostępu do lokalizacji.Aby korzystać z tej funkcji, udziel dostępu do lokalizacji.");
    }
  };

  const handleDirections = () => {
    if (selectedCinema && userLocation) {

      const { szerokoscG, dlugoscG } = selectedCinema.lokalizacja;
      const start = `${userLocation.latitude},${userLocation.longitude}`;
      const end = `${szerokoscG},${dlugoscG}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${start}&destination=${end}&travelmode=driving`;

      Linking.openURL(url);
    }
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Odmowa dostępu do lokalizacji');
        alert("Brak dostępu do lokalizacji. Aby korzystać z tej funkcji, udziel dostępu do lokalizacji");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      console.error('Błąd pobierania lokalizacji', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
    
      <MapView
        style={{ flex: 1 }}
        region={mapRegion}
        onRegionChangeComplete={(region) => setMapRegion(region)}
        onPress={handleMapClick}
      >
        {cinemas.map((kino) => (
          <Marker
            key={kino.id}
            coordinate={{
              latitude: kino.lokalizacja.szerokoscG,
              longitude: kino.lokalizacja.dlugoscG,
            }}
            title={kino.nazwa}
            onPress={() => {
              setSelectedCinema(kino);
              setMapRegion({
                latitude: kino.lokalizacja.szerokoscG,
                longitude: kino.lokalizacja.dlugoscG,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              });
            }}
          />
        ))}

        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Twoja lokalizacja"
            pinColor="blue"
          />
        )}
      </MapView>

      {selectedCinema && (
        <View  style={[styles.input]}>
          <View>
          <Text style={[styles.printText]}>{selectedCinema.nazwa}</Text>
          <Text style={[styles.printText]}>Lokalizacja: {selectedCinema.lokalizacja.szerokoscG}, {selectedCinema.lokalizacja.dlugoscG}</Text>
          </View>
          <TouchableOpacity onPress={handleDirections} style={styles.buttons}>
          <Text style={styles.buttonText}>Zobacz trasę</Text>
          </TouchableOpacity>
        </View>
      )}
       <TextInput
       style={[styles.input]}
        placeholder="Wpisz nazwę kina"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.buttons}>
        <Text style={styles.buttonText}>Szukaj</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: '#F1CC08',
    widh:100,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 3
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  printText: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    color: 'black',
    borderColor: 'black',
    borderWidth: 3,
    paddingVertical: 7,
    paddingHorizontal: 12,
  }
});