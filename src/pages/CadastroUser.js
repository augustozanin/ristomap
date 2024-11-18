import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import RMButton from "../components/RMButton";
import RMTextInput from "../components/RMTextInput";
import RMLogo from "../components/RMLogo";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../styles/styles";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../context/supabase";
import bcrypt from 'react-native-bcrypt';

export default function CadastroUser({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [senha, setSenha] = useState(null);
  const [email, setEmail] = useState(null);
  const [confirmaSenha, setConfirmaSenha] = useState(null);

  const [erroUsuario, setErroUsuario] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroConfirmaSenha, setErroConfirmaSenha] = useState(false);

  const [loading, setLoading] = useState(false);
  const [passwordInvisible, setPasswordInvisible] = useState(true);

  const { setToken, setUser } = useAuth();

  async function cadastrar() {
    if (loading) {
      return;
    }

    setErroUsuario(false);
    setErroSenha(false);
    setErroEmail (false);
    setErroConfirmaSenha(false);

    if (!usuario) {
      setErroUsuario(true);
    }

    if (!senha || typeof senha !== 'string') {
      setErroSenha(true);
    }

    if (!email) {
      setErroEmail(true);
    }

    if (!confirmaSenha){
      setErroConfirmaSenha(true);
    }

    if (senha !== confirmaSenha) {
      setErroConfirmaSenha(true);
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (!usuario || !senha || !confirmaSenha || !email) {
    return;
    }

    setLoading(true);

    try {
      // hash senha
      if (typeof senha !== 'string') {
        throw new Error('Senha inválida.');
      }      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(senha, salt);
      
      // inserindo supabase
      const { data, error } = await supabase.from('users').insert([
        { username: usuario, email, password: hashedPassword },
      ]);

      if (error) {
        Alert.alert('Erro', error.message);
      } else {
        //ir pra home apos criar conta
        setUser({ username: usuario, email });
        setToken('placeholder_token'); 

        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.replace('Home'); 
      }

    } catch (error) {
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  function mostrarOcultarSenha() {
    setPasswordInvisible(!passwordInvisible);
  }

  return (
    <View style={styles.container}>
      <RMLogo customStyle={{ marginBottom: 10 }} width={303} height={295} /> 

      <RMTextInput
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Digite seu usuário"
      />
      {erroUsuario ? <Text>Usuário é obrigatorio</Text> : <></>}

      <RMTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
      />
      {erroEmail ? <Text>email é obrigatorio</Text> : <></>}

      <RMTextInput
        value={senha}
        onChangeText={(value) => setSenha (value)}
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

      <RMTextInput
        value={confirmaSenha}
        onChangeText={(value) => setConfirmaSenha (value)}
        placeholder="Confirme sua senha"
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
      {erroSenha && <Text>Confirmação de senha é obrigatória</Text>}

      <RMButton titulo="Criar Conta" action={cadastrar} />

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