import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FilmDetailsScreen from '../views/FilmDetailsScreen';
import LoginScreen from '../views/LoginScreen';
import DrawerNav from "./Drawer";
import ReviewsScreen from "../views/ReviewsScreen";
import AddReviewScreen from "../views/AddReviewScreen";
import RegisterScreen from "../views/RegisterScreen";
import RegisterSuccessScreen from "../views/RegisterSuccessScreen";
import OtherUserScreen from "../views/OtherUserScreen";
import SetAvatarScreen from "../views/SetAvatarScreen";
import ChangePasswordScreen from "../views/ChangePasswordScreen";
import ChangeUsernameScreen from "../views/ChangeUsernameScreen";
import ChangeEmailScreen from "../views/ChangeEmailScreen";
import { UserProvider } from '../UserContext.js';
import InfoScreen from "../views/InfoScreen";

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Logowanie' }} />
          <Stack.Screen name="MainScreen" component={DrawerNav} />
          <Stack.Screen name="FilmDetails" component={FilmDetailsScreen} options={{ title: 'Szczegóły produkcji' }} />
          <Stack.Screen name="ReviewsScreen" component={ReviewsScreen} options={{ title: 'Recenzje' }} />
          <Stack.Screen name="OtherUserScreen" component={OtherUserScreen} options={{ title: 'Recenzje' }} />
          <Stack.Screen name="AddReviewScreen" component={AddReviewScreen} options={{ title: 'Dodaj recenzję' }} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Rejestracja' }} />
          <Stack.Screen name="RegisterSuccessScreen" component={RegisterSuccessScreen} options={{ title: 'Rejestracja potwierdzona' }} />
          <Stack.Screen name="SetAvatarScreen" component={SetAvatarScreen} options={{ title: 'Ustawianie awatara' }} />
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Zmiana hasła' }} />
          <Stack.Screen name="ChangeUsernameScreen" component={ChangeUsernameScreen} options={{ title: 'Zmiana loginu' }} />
          <Stack.Screen name="ChangeEmailScreen" component={ChangeEmailScreen} options={{ title: 'Zmiana e-mail' }} />
          <Stack.Screen name="InfoScreen" component={InfoScreen} options={{ title: 'O nas' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default StackNav;
