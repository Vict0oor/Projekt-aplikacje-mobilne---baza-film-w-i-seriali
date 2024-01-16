import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { PHOTO_SERVER_ADDRESS, SERVER_ADDRESS } from '../../../config';
import { UserContext } from '../../UserContext.js';
import { useNavigation } from '@react-navigation/native';

const SetAvatarScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [camerView, setCameraView] = useState(Camera.Constants.Type.front);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhotoUri(photo.uri);
      setModalVisible(true);
    }
  };

  const avatarID = `avatarID_${user.id}.jpg`;

  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      type: 'image/jpeg',
      name: avatarID,
    });

    fetch(`${PHOTO_SERVER_ADDRESS}:3000/images`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
      .then(response => response.json())
      .then(data => {
        console.log('Zdjęcie zostało wysłane na serwer:', data);
        setModalVisible(false);
      })
      .catch(error => {
        console.error('Błąd podczas wysyłania zdjęcia na serwer:', error);
        setModalVisible(false);
      });

      const updateResponse = await fetch(`${SERVER_ADDRESS}/uzytkownik/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          awatar: `images/${avatarID}` ,
        }),
      });

      if(updateResponse.ok){
        setUser({
          ...user,
          awatar: `images/${avatarID}` ,
        });
      } else {
        setError('Błąd podczas przesyłania danych na serwer');
      }
      navigation.goBack();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const changeCameraView = () => {
    setCameraView(
      camerView === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera ref={(ref) => setCamera(ref)} style={{ flex: 1, aspectRatio: 3 / 4 }}  type={camerView}>
        <View style={styles.container}>

        <View style={styles.buttonscontainer}>
        <TouchableOpacity  style={styles.changebutton} onPress={changeCameraView}>
            <Text style={styles.text}>Zmień aparat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.takebutton} onPress={takePicture}>
            <Text style={styles.text}> Zrób zdjęcie</Text>
          </TouchableOpacity>
          </View>

        </View>
      </Camera>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalcontainer}>
        <Text style={[styles.text,{marginBottom:30, fontSize: 30}]}>To twój nowy awatar?</Text>
          <Image
            source={{ uri: photoUri }}
            style={styles.image}
          />
          <TouchableOpacity onPress={handleConfirm}>
          <Text style={[styles.text,{marginBottom:10, fontSize: 25}]}>Potwierdź</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.text}> Anuluj </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonscontainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor:'black',
    borderWidth:10,
    borderRadius: 20,
    height:100,
    marginLeft:-219,
    marginTop:620
  },

  changebutton:{
  marginLeft:15,
  borderColor:'black',
  borderWidth:5,
  borderRadius: 20,
  backgroundColor:'rgba(0, 0, 0, 0.8)', 
  },
  takebutton:{
    borderColor:'black',
    borderWidth:2,
    marginLeft:15,
    marginRight:15,
    borderWidth:5,
   borderRadius: 20,
   backgroundColor:'rgba(0, 0, 0, 0.8)', 
    },
  text:{
    color:'#F1CC08',
    fontSize:18,
    marginLeft:10,
    marginBottom:5,
    marginRight:10,
    marginTop:5,
},
  image:{
    width: 300, 
    height: 300, 
    marginBottom: 20,
    borderColor:'black',
    borderWidth: 3,
    borderRadius: 200
  },
  modalcontainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#232323'
  }
});
export default SetAvatarScreen;
