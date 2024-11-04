import React from "react";
import { StyleSheet, View, Text } from "react-native";

const User = () => {
  return (
    <View style={styles.container}>
      <Text>Tela user</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7EEE9",
  },
});

export default User;
