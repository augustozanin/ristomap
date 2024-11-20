import { StyleSheet, Text, View, Alert } from 'react-native'
import { colors, fontSizes, globalStyles } from '../styles/styles';
import React, { useState } from 'react'
import TopBar from '../components/TopBar';
import RMTextInput from '../components/RMTextInput';
import RMButton from '../components/RMButton';
import { useAuth } from "../context/AuthContext";
import { supabase } from '../services/supabase';

export default function CriaPost({ navigation }) {
  const { user } = useAuth();
  const [titulo, setTitulo] = useState(null)
  const [descricao, setDescricao] = useState(null)

  const [erroTitulo, setErroTitulo] = useState(false)
  const [erroDescricao, setErroDescricao] = useState(false)

  const [loading, setLoading] = useState(false);

  async function registraPost() {
    if (loading) {
      return;
    }

    setErroTitulo(false)
    setErroDescricao(false)

    if (!titulo) {
      setErroTitulo(true)
    }

    if (!descricao) {
      setErroDescricao(true)
    }

    if (!titulo || !descricao) {
      return
    }

    setLoading(true);

    try {    
      console.log('Opa vamos tentar cadastrar um POST!!! dados a seguir ')
      console.log(user.usuario,titulo,descricao)
      // inserindo post no supabase
      const { data, error } = await supabase.from('post').insert([
        { user_username: user.usuario, title: titulo, description: descricao },
      ]);

      if (error) {
        Alert.alert('Erro', error.message);
      } else {
        //ir pra home apos criar conta
        setUser({ username: usuario, email });

        Alert.alert('Sucesso', 'Post criado!');
        navigation.replace('Home'); 
      }

    } catch (error) {
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <RMTextInput
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Titulo: "
      />

      <RMTextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição: "
      />

      <RMButton titulo="Postar" action={registraPost} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.begeBG,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})