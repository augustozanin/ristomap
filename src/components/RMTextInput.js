import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

export default function RMTextInput({ children, ...rest }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.caixaTexto} {...rest} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  caixaTexto: {
    paddingLeft: 10,
    width: "90%",
    height: 50,
    fontSize: 20,
  },
});
