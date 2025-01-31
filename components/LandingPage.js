import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Homescreen from './Homescreen';

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/200" }}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to Our Notes App</Text>
      <Text style={styles.subtitle}>Manage your notes easily, anywhere, anytime.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0288D1",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF4081",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default LandingPage;
