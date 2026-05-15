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

export default function ContactStep() {
  const { id, owner } = useLocalSearchParams();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (!phoneNumber || phoneNumber.length < 9) {
      alert("Please enter a valid phone number");
      return;
    }
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    router.push({
      pathname: "/(auth)/register/address",
      params: {
        id: id as string,
        owner: owner as string,
        phoneNumber,
        email,
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
            name="call-outline"
            size={80}
            color="#ff9500"
            style={styles.icon}
          />

          <Text style={styles.title}>Contact Info</Text>

          <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            maxLength={15}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
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
    backgroundColor: "#fff9e6",
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
    borderColor: "#ff9500",
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
