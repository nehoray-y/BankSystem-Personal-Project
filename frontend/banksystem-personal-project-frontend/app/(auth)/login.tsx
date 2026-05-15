import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.184:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idNumber: id,
          password,
        }),
      });
      if (response.ok) {
        await AsyncStorage.setItem("user", id);
        const test = await AsyncStorage.getItem("user");
        console.log("נשמר:", test);

        const data = await response.text();
        router.replace("/(tabs)");
      } else {
        const errorText = await response.text();
        Alert.alert(errorText || "Error");
      }
    } catch (error) {
      Alert.alert("error");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>BankSystem</Text>

        <TextInput
          placeholder="ID Number"
          keyboardType="phone-pad"
          style={styles.input}
          value={id}
          onChangeText={setId}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/register/id")}>
          <Text style={styles.registerText}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
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
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#2e86de",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    color: "#2e86de",
    marginTop: 10,
    fontSize: 14,
  },
});
