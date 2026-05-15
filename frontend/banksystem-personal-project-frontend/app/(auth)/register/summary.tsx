import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

export default function SummaryScreen() {
  const { id, owner, phoneNumber, email, address, city } =
    useLocalSearchParams();
  const [isAccountNumber, setIsAccountNumber] = useState("");

  const fetchAccountNumber = async (id: string) => {
    try {
      const response = await fetch(
        `http://192.168.1.184:8080/accounts/${id}/number`,
      );

      if (response.ok) {
        const accountNumber = await response.text(); // כי זה מחרוזת פשוטה
        setIsAccountNumber(accountNumber);
        return accountNumber;
      } else {
        console.error("Failed to fetch account number");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAccountNumber(id as string);
    }
  }, [id]);

  const handleFinish = () => {
    router.replace("/(auth)/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="checkmark-circle-outline" size={100} color="#27ae60" />

      <Text style={styles.title}>Account Created Successfully!</Text>

      <View style={styles.detailBox}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{id}</Text>

        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{owner}</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{phoneNumber}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>
          {address}, {city}
        </Text>

        <Text style={styles.label}>Account Number:</Text>
        <Text style={styles.value}>{isAccountNumber}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0fff4",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginVertical: 20,
    textAlign: "center",
  },
  detailBox: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontSize: 16,
    color: "#2980b9",
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
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
