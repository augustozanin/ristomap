import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Home({ navigation }) {
  const { user, token } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>Seu usuário {user.usuario}</Text>
      <Text>Sua senha {user.senha}</Text>
      <Text>{token}</Text>
      <Button title="Logout" onPress={() => navigation.replace("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
