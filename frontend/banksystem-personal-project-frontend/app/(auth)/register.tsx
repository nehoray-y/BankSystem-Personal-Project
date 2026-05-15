import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [id, setId] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://192.168.1.184:8080/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          owner,
          password,
          email,
          phoneNumber,
          address,
          city,
        }),
      });
      if (response.ok) {
        Alert.alert("ההרשמה בוצעה בהצלחה");
        router.push("/(auth)/login");
      } else {
        const errorText = await response.text();
        Alert.alert(errorText || "Error");
      }
    } catch (error) {
      Alert.alert("error");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            placeholder="ID Number"
            keyboardType="numeric"
            maxLength={10}
            clearButtonMode="always"
            style={styles.input}
            value={id}
            onChangeText={setId}
          />

          <TextInput
            placeholder="Full Name"
            maxLength={15}
            keyboardType="default"
            clearButtonMode="always"
            style={styles.input}
            value={owner}
            onChangeText={setOwner}
          />

          <TextInput
            placeholder="Email"
            clearButtonMode="always"
            keyboardType="default"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            clearButtonMode="always"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            placeholder="Phone Number"
            clearButtonMode="always"
            keyboardType="phone-pad"
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <TextInput
            placeholder="address"
            clearButtonMode="always"
            keyboardType="default"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />

          <TextInput
            placeholder="City"
            clearButtonMode="always"
            keyboardType="default"
            style={styles.input}
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.loginLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2c3e50",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  disabledInput: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
  },
  balanceText: {
    color: "#555",
    fontSize: 16,
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#27ae60",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  registerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    color: "#2980b9",
    fontSize: 14,
    marginTop: 10,
  },
});
