import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from './components/AppNavigator';
import * as Notifications from 'expo-notifications';

// Set up notifications handler
Notifications.setNotificationHandler({
 handleNotification: async () => ({
   shouldShowAlert: true,
   shouldPlaySound: false,
   shouldSetBadge: false,
 }),
});

const App = () => {
 return (
   <NavigationContainer>
     <AppNavigator />
   </NavigationContainer>
 );
};

export default App;