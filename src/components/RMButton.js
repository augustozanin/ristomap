import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors, fontSizes, globalStyles } from "../styles/styles";

export default function RMButton({
  titulo,
  action,
  customButtonStyle,
  customTextStyle,
}) {
  return (
    <TouchableOpacity
      style={[globalStyles.botao, customButtonStyle]}
      onPress={action}
    >
      <Text style={[styles.botaoTexto, customTextStyle]}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    width: "80%",
    height: 39,
    backgroundColor: colors.vermelho,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTexto: {
    fontSize: fontSizes.medio,
    color: "#FFFFFF",
  },
});
