import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import RMButton from "../components/RMButton";
import RMTextInput from "../components/RMTextInput";
import RMLogo from "../components/RMLogo";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../styles/styles";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordInvisible, setPasswordInvisible] = useState(true);
  const [user, setUser] = useState(null);

  async function login() {
    if (loading) {
      return;
    }

    setErroEmail(false);
    setErroSenha(false);

    if (!email) {
      setErroEmail(true);
    }

    if (!senha) {
      setErroSenha(true);
    }

    if (!senha || !email) {
      return;
    }

    setLoading(true);

    try {
      // login supabase email e senha
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
    });
    console.log("Resposta do Supabase:", { data, error });

      if (error) {
        Alert.alert("Erro", "Erro ao tentar fazer login: " + error.message);
        return;
      }

  const userId = data.user?.id; // Verifique o ID do usuário retornado
  if (!userId) {
    Alert.alert("Erro", "Usuário não encontrado ou não autenticado.");
    return;
  }

    const { data: userData, error: userError } = await supabase
    .from('user')
    .select('username')
    .eq('email', email)
    .single();  // Espera um único registro
    if (userError) {
      Alert.alert("Erro", "Erro ao buscar informações do usuário: " + userError.message);
      return;
    }

    console.log("user_metadata:", data.user.user_metadata);

// Verificar se o usuário tem um nome de usuário válido
const username = userData?.username;
if (!username) {
  Alert.alert("Erro", "Dados de usuário inválidos.");
  return;
}

      // Login bem-sucedido
      setUser({ username, email });
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      navigation.replace("Map_Page");
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      Alert.alert("Erro", "Ocorreu um erro ao tentar logar.");
    } finally {
      setLoading(false);
    }
  }

  function informaEmail(value) {
    if (!value) {
      setErroEmail(true);
    } else {
      setErroEmail(false);
    }

    setEmail(value);
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
        value={email}
        onChangeText={informaEmail}
        placeholder="Digite seu email"
      />
      {erroEmail ? <Text>Email é obrigatorio</Text> : <></>}
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
          onPress={() => navigation.navigate("EscolherCadastro")}
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
