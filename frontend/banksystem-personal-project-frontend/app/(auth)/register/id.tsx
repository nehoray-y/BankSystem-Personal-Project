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
import { router } from "expo-router";

export default function IDStep() {
  const [id, setId] = useState("");

  const handleNext = () => {
    if (id.length !== 9 && id.length !== 10) {
      alert("Please enter a valid ID number");
      return;
    }

    // נעביר את ה-ID דרך query או Context — נתחיל פשוט עם query
    router.push({
      pathname: "/(auth)/register/name",
      params: { id },
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
            name="card-outline"
            size={80}
            color="#007aff"
            style={styles.icon}
          />

          <Text style={styles.title}>Enter Your ID</Text>

          <TextInput
            placeholder="ID Number"
            keyboardType="numeric"
            maxLength={10}
            value={id}
            onChangeText={setId}
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
    backgroundColor: "#e5f0ff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
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
    borderColor: "#007aff",
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
