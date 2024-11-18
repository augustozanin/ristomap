import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../styles/styles";
import RMButton from "../components/RMButton";
import RMLogo from "../components/RMLogo";

const Escolher_Cadastro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <RMLogo customStyle={{ marginBottom: 40 }} width={210} height={200} />
      <Text> Qual será seu tipo de conta? </Text>

      <RMButton
        titulo="Usuário"
        action={() => navigation.navigate("CadastroUser")}
        customButtonStyle={styles.customButtonLeft} 
      />

      <RMButton
        titulo="Restaurante"
        action={() => navigation.navigate("CadastroRestaurante")}
        customButtonStyle={styles.customButtonRight} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.begeBG,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  customButtonLeft: {
    alignItems: "center",
    marginVertical: 10,
  },
  customButtonRight: {
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Escolher_Cadastro;
