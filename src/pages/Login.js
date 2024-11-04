import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import RMButton from "../components/RMButton";
import RMTextInput from "../components/RMTextInput";
import RMLogo from "../components/RMLogo";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../styles/styles";
import { useAuth } from "../context/AuthContext";

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [senha, setSenha] = useState(null);
  const [erroUsuario, setErroUsuario] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordInvisible, setPasswordInvisible] = useState(true);

  const { setToken, setUser } = useAuth();

  function login() {
    if (loading) {
      return;
    }

    setErroUsuario(false);
    setErroSenha(false);

    if (!usuario) {
      setErroUsuario(true);
    }

    if (!senha) {
      setErroSenha(true);
    }

    if (!senha || !usuario) {
      return;
    }
    console.log("teste");

    setUser({ usuario, senha });
    setToken("sygfdytsfdygsfdhgsfdufsdgfsdhgsfdghfsdhgfshdg");

    setLoading(true);

    navigation.replace("Home");
  }

  function informaUsuario(value) {
    if (!value) {
      setErroUsuario(true);
    } else {
      setErroUsuario(false);
    }

    setUsuario(value);
  }

  function informaSenha(value) {
    if (!value) {
      setErroSenha(true);
    } else {
      setErroSenha(false);
    }

    setSenha(value);
  }

  function mostrarOcultarSenha() {
    setPasswordInvisible(!passwordInvisible);
  }

  return (
    <View style={styles.container}>
      <RMLogo customStyle={{ marginBottom: 10 }} width={303} height={295} />
      <RMTextInput
        value={usuario}
        onChangeText={informaUsuario}
        placeholder="Digite seu usuário"
      />
      {erroUsuario ? <Text>Usuário é obrigatorio</Text> : <></>}
      <RMTextInput
        value={senha}
        onChangeText={informaSenha}
        placeholder="Digite sua senha"
        secureTextEntry={passwordInvisible}
      >
        <TouchableOpacity onPress={mostrarOcultarSenha}>
          {passwordInvisible ? (
            <FontAwesome name="eye" size={24} />
          ) : (
            <FontAwesome name="eye-slash" size={24} />
          )}
        </TouchableOpacity>
      </RMTextInput>
      {erroSenha && <Text>Senha é obrigatória</Text>}
      <RMButton titulo="Acessar" action={login} />

      <View style={styles.containerSenha}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EsqueceuSenha")}
          style={styles.botaoSenha}
        >
          <Text style={styles.botaoTextoSenha}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerCadastro}>
        <Text style={styles.botaoTextoCadastro}>
          Ainda não possui um cadastro?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Cadastro")}
          style={styles.botaoCadastro}
        >
          <Text style={[styles.botaoTextoCadastro, { fontWeight: "bold" }]}>
            Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.begeBG,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  botaoTextoSenha: {
    fontSize: 16,
    color: colors.cinza,
  },
  botaoSenha: {
    borderBottomWidth: 0.8,
    borderBottomColor: colors.cinza,
    width: "50%",
  },
  containerSenha: {
    width: "80%",
    alignItems: "flex-end",
  },
  containerCadastro: {
    width: "80%",
    flexDirection: "row",
    gap: 10,
    marginTop: 30,
  },
  botaoTextoCadastro: {
    fontSize: 16,
  },
  botaoCadastro1: {
    borderWidth: 1,
    borderColor: colors.vermelho,
    backgroundColor: colors.begeBG,
  },
  textoBotaoCadastro1: {
    color: colors.vermelho,
  },
});
