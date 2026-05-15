import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Haptics from "expo-haptics";

export default function Profile() {
  const [toAccountNumber, setToAccountNumber] = useState("");
  const [fromAccountNumber, setFromAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const getAccounrNumber = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (!user) return Alert.alert("Error", "User not found");

      const response = await fetch(
        `http://192.168.1.184:8080/accounts/${user}/number`,
      );
      if (!response.ok) {
        throw new Error("Account not found");
      }

      const accountNumber = await response.text(); // כי אתה מחזיר טקסט ולא JSON
      console.log("Account number:", accountNumber);

      setFromAccountNumber(accountNumber);
    } catch (error) {
      console.error("Error fetching account number:", error);
      return null;
    }
  };

  useEffect(() => {
    getAccounrNumber();
  }, []);

  const handleTransfer = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (!user) return Alert.alert("Error", "User not found");

      const response = await fetch(
        `http://192.168.1.184:8080/transaction/transfer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromAccountNumber,
            toAccountNumber,
            amount,
          }),
        },
      );

      if (response.ok) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert("Success", "Transfer completed");
        setToAccountNumber("");
        setAmount("");
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        const errorText = await response.text();
        Alert.alert("Error", errorText);
      }
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Error", "Failed to transfer");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.formTitle}>Quick Transfer</Text>
        <TextInput
          placeholder="Recipient ID"
          keyboardType="numeric"
          style={styles.input}
          value={toAccountNumber}
          onChangeText={setToAccountNumber}
        />
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity
          style={styles.transferButton}
          onPress={handleTransfer}
        >
          <Text style={styles.transferText}>Send</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    padding: 24,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    color: "#000000",
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  transferButton: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  transferText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
