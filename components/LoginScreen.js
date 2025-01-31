import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Handle login
  const handleLogin = () => {
    console.log('Login button pressed'); 

if (!email || !password) {
  Alert.alert('Error', 'Email and Password are required');
  return;
}

// Simulate a successful login
Alert.alert('Login Successful');

// Navigate directly to Home screen after login
navigation.reset({
  index: 0,
  routes: [{ name: 'Home' }],
});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

  <TextInput
    style={styles.input}
    placeholder="Email"
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
    autoCapitalize="none"
    placeholderTextColor="#aaa"
  />

  <TextInput
    style={styles.input}
    placeholder="Password"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    placeholderTextColor="#aaa"
  />

  <TouchableOpacity style={styles.button} onPress={handleLogin}>
    <Text style={styles.buttonText}>Login</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
    <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
  </TouchableOpacity>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#FF4081",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  linkText: {
    color: "#0288D1",
    marginTop: 15,
  },
});

export default LoginScreen;
