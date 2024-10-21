import { StyleSheet } from "react-native";

export const colors = {
  vermelho: "#770602",
  backgroud: "#F7EEE9",
};

export const fontSizes = {
  pequena: 10,
  medio: 16,
  grande: 25,
};

export const globalStyles = StyleSheet.create({
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
