import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import LandingPage from '../components/LandingPage';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';
import HomeScreen from '../components/Homescreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => {


 return (
   <Stack.Navigator 
     initialRouteName= "Home"
     screenOptions={{
       headerStyle: {
         backgroundColor: '#0288D1',
       },
       headerTintColor: '#fff',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
     }}
   >
     <Stack.Screen
       name="LandingPage"
       component={LandingPage}
       options={{ headerShown: false }}
     />
     <Stack.Screen 
       name="Login" 
       component={LoginScreen}
       options={{
         title: 'Login',
         headerShown: true
       }}
     />
     <Stack.Screen 
       name="SignUp"
       options={{
         title: 'Sign Up',
         headerShown: true
       }}
     >
     
     </Stack.Screen>
     <Stack.Screen
       name="Home"
       component={HomeScreen}
       options={{ headerShown: false }}
     />
     
     
   </Stack.Navigator>
   
 );
};

export default AppNavigator;