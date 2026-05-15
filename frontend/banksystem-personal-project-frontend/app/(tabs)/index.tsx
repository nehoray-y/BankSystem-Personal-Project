import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import HomeHeader from "@/components/HomeHeader";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const [owner, setOwner] = useState("");
  const [balance, setBalance] = useState<number | null>(null);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBalance = async () => {
    try {
      const userId = await AsyncStorage.getItem("user");
      if (!userId) return;

      const response = await fetch(
        `http://192.168.1.184:8080/users/with-account-by-id/${userId}`,
      );
      const data = await response.json();
      setBalance(data.accountSummaryDTO.balance);
      setOwner(data.userSummaryDTO.fullName);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/(auth)/login");
  };

  const onRefresh = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsRefreshing(true);
    await fetchBalance();
    setIsRefreshing(false);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f0f9ff" }}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <HomeHeader
        name={owner}
        balance={balance || 0.0}
        onLogout={handleLogout}
      />
      <View style={{ height: 400 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    paddingBottom: 100, // מאפשר למשוך ל-refresh
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
    marginTop: 40,
    marginBottom: 10,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#000000",
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 30,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 32,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  logoutButton: {
    marginTop: "auto",
    backgroundColor: "#ff0000",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
