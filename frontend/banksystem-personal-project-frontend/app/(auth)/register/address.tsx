import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

export default function AddressStep() {
  const { id, owner, phoneNumber, email } = useLocalSearchParams();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handleNext = () => {
    if (!address || !city) {
      alert("Please fill in both address and city");
      return;
    }

    router.push({
      pathname: "/(auth)/register/password",
      params: {
        id: id as string,
        owner: owner as string,
        phoneNumber: phoneNumber as string,
        email: email as string,
        address,
        city,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Ionicons
            name="home-outline"
            size={80}
            color="#ff2d55"
            style={styles.icon}
          />

          <Text style={styles.title}>Address Details</Text>

          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />

          <TextInput
            placeholder="City"
            value={city}
            onChangeText={setCity}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderColor: "#ff2d55",
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007aff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
