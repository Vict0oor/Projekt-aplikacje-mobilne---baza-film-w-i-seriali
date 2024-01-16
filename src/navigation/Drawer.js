import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Image, StyleSheet } from 'react-native';
import MainScreen from '../views/MainScreen';
import List from '../views/List';
import WatchListScreen from "../views/WatchListScreen";
import CinemaScreen from "../views/CinemaScreen";
import UserScreen from "../views/UserScreen";
import SettingsScreen from "../views/SettingsScreen";
import InfoScreen from "../views/InfoScreen";

const optionScreen = {
  headerShown: false,
  tabBarShowLabel: false
}

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerStyle: styles.drawer,
    }}>
     <Drawer.Screen 
        name="Main" 
        component={MainScreen} 
        options={{
          ...optionScreen,
          drawerLabelStyle: { color: '#F1CC08' },
          drawerItemStyle: styles.draweritem,
          drawerLabel: 'Strona główna',
          
          drawerIcon: () => (
            <Image source={require('../../assets/icons/home.png')} />
          ),
        
        }}
      />
       <Drawer.Screen 
        name="Search" 
        component={List} 
        options={{
          ...optionScreen,
          drawerLabelStyle: { color: '#F1CC08' },
          drawerItemStyle: styles.draweritem,
          drawerLabel: 'Wyszukiwarka',
          drawerIcon: () => (
            <Image source={require('../../assets/icons/search.png')}/>
          ),
        }}
      />
            <Drawer.Screen 
        name="Favourite" 
        component={WatchListScreen} 
        options={{
          ...optionScreen,
          drawerLabelStyle: { color: '#F1CC08' },
          drawerItemStyle: styles.draweritem,
          drawerLabel: 'Lista do obejrzenia',
          drawerIcon: () => (
            <Image source={require('../../assets/icons/favourite.png')}/>
          ),
        }}
      />
            <Drawer.Screen 
        name="Profile" 
        component={UserScreen} 
        options={{
          ...optionScreen,
          drawerLabelStyle: { color: '#F1CC08' },
          drawerItemStyle: styles.draweritem,
          drawerLabel: 'Profil',
          drawerIcon: () => (
            <Image source={require('../../assets/icons/profile.png')}/>
          ),
        
        }}
      />
            <Drawer.Screen 
        name="FindCinema" 
        component={CinemaScreen} 
        options={{
          ...optionScreen,
          drawerLabelStyle: { color: '#F1CC08' },
          drawerItemStyle: styles.draweritem,
          drawerLabel: 'Znajdź kino',
          drawerIcon: () => (
            <Image source={require('../../assets/icons/cinema.png')}/>
          ),
        
        }}
      />
               <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          ...optionScreen,
          drawerLabelStyle: { color: '#F1CC08' },
          drawerItemStyle: styles.draweritem,
          drawerLabel: 'Ustawienia',
          drawerIcon: () => (
            <Image source={require('../../assets/icons/setting.png')}/>
          ),
        }}
      />
               <Drawer.Screen 
        name="Info" 
        component={InfoScreen} 
        options={{
          ...optionScreen,
          drawerLabelStyle: { color: '#F1CC08' },
          drawerItemStyle: styles.draweritem,
          drawerLabel: 'O nas',
          drawerIcon: () => (
            <Image source={require('../../assets/icons/info.png')}/>
          ), 
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#F1CC08',
    
  },
  draweritem: {
    marginTop: 10,
    backgroundColor: '#1E1E1E',
     width: 300, 
     marginLeft:-5,
     activeBackgroundColor: '#FFFFFF',
  },
});