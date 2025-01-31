import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

if (password !== confirmPassword) {
  Alert.alert('Error', 'Passwords do not match!');
  return;
}

// Simply navigate to Home screen after successful signup
Alert.alert('Success', 'Account created successfully!');

// Navigate to Home screen
navigation.reset({
  index: 0,
  routes: [{ name: 'Home', params: {username} }],
});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

  <TextInput
    style={styles.input}
    placeholder="Username"
    value={username}
    onChangeText={setUsername}
    autoCapitalize="none"
    placeholderTextColor="#aaa"
  />

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

  <TextInput
    style={styles.input}
    placeholder="Confirm Password"
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    secureTextEntry
    placeholderTextColor="#aaa"
  />

  <TouchableOpacity style={styles.button} onPress={handleSignUp}>
    <Text style={styles.buttonText}>Sign Up</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    <Text style={styles.linkText}>Already have an account? Login</Text>
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

export default SignUpScreen;
