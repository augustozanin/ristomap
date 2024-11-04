import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors, fontSizes, globalStyles } from '../styles/styles';


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
    backgroundColor: colors.begeBG,
  },
});

export default User;
