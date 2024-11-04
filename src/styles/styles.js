import { StyleSheet } from "react-native";

export const colors = {
  vermelho: "#770602",
  begeBG: "#F7EEE9",
  branco: "#FFFFFF",
  cinza: "#898A8D"
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
    color: colors.branco,
  },
});
