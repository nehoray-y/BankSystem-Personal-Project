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
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

export default function PasswordStep() {
  const { id, owner, phoneNumber, email, address, city } =
    useLocalSearchParams();
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!password || password.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.184:8080/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idNumber: id,
          fullName: owner,
          email,
          phone: phoneNumber,
          address,
          city,
          password,
        }),
      });

      if (response.ok) {
        const createdAccount = await response.text(); // נקבל את פרטי החשבון מהשרת
        router.push({
          pathname: "/(auth)/register/summary",
          params: {
            id,
            owner,
            phoneNumber,
            email,
            address,
            city,
          },
        });
      } else {
        const errorText = await response.text();
        Alert.alert(errorText || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Network error");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Ionicons
            name="lock-closed-outline"
            size={80}
            color="#5856d6"
            style={styles.icon}
          />

          <Text style={styles.title}>Set a Password</Text>

          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Finish Registration</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f0ff",
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
    borderColor: "#5856d6",
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
