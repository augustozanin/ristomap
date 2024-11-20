import { StyleSheet, Text, View, Alert, TouchableOpacity, Image } from 'react-native'
import { colors, fontSizes, globalStyles } from '../styles/styles';
import React, { useState } from 'react'
import TopBar from '../components/TopBar';
import RMTextInput from '../components/RMTextInput';
import RMButton from '../components/RMButton';
import { useAuth } from "../context/AuthContext";
import { supabase } from '../services/supabase';
import startempty from '../assets/images/starempty.png';
import starfull from '../assets/images/starfull.png'
import * as ImagePicker from 'expo-image-picker';



export default function CriaPost({ navigation }) {
  const { user } = useAuth();
  const [titulo, setTitulo] = useState(null)
  const [descricao, setDescricao] = useState(null)
  const [erroTitulo, setErroTitulo] = useState(false)
  const [erroDescricao, setErroDescricao] = useState(false)
  const [erroEstrela, setErroEstrela] = useState(false)
  const [erroImgUrl, setErroImgUrl] = useState(false)
  const [loading, setLoading] = useState(false);

  // Estado para gerenciar as estrelas
  const [estrelas, setEstrelas] = useState([false, false, false, false, false]);

  // Estado para gerenciar a imagem
  const [imagemLocal, setImagemLocal] = useState(null); // Caminho da imagem local
  const [imagemURL, setImagemURL] = useState(null); // URL da imagem no Supabase

  // Função para selecionar a imagem
  const selecionarImagem = async () => {
    try {
      // Solicitar permissões para acessar a galeria
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permissão necessária", "É necessário permitir o acesso à galeria.");
        return;
      }

      // Abrir a galeria para escolher uma imagem
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // Usando o formato correto
        allowsEditing: true, // Permitir edição
        quality: 0.8, 
      });

      console.log(result);

      // Verificar se a seleção foi cancelada
      if (!result.canceled) {
        setImagemLocal(result.assets[0].uri); // Salvar a URI da imagem selecionada
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
    }
  };

  // Função para fazer o upload da imagem no Supabase
  const uploadImagem = async () => {
    if (!imagemLocal) return null;

    const { fileName, uri, type } = imagemLocal;
    const nomeArquivo = `${Date.now()}-${fileName}`; // Nome único para a imagem

    try {
      const { data, error } = await supabase.storage
        .from('imagens-posts') // Certifique-se de que este bucket exista no Supabase
        .upload(nomeArquivo, { uri, name: fileName, type }, { contentType: type });

      if (error) {
        console.error('Erro ao fazer upload da imagem:', error.message);
        return null;
      }

      // Obter a URL pública da imagem
      const { publicUrl } = supabase.storage
        .from('imagens-posts')
        .getPublicUrl(nomeArquivo);

      setImagemURL(publicUrl); // Salvar URL no estado
      return publicUrl;
    } catch (error) {
      console.error('Erro inesperado no upload da imagem:', error);
      return null;
    }
  };

  // Função para atualizar o estado das estrelas
  const pressionaEstrela = (index) => {
    const novaEstrelas = estrelas.map((_, i) => i <= index ? true : false);
    // Se a estrela clicada já estiver cheia, esvazie ela e as posteriores
    if (estrelas[index]) {
      novaEstrelas[index] = false;
    }
    setEstrelas(novaEstrelas);
  };

  async function registraPost() {
    if (loading) {
      return;
    }

    setErroTitulo(false)
    setErroDescricao(false)
    setErroEstrela(false)
    setErroImgUrl(false)

    if (!titulo) {
      setErroTitulo(true)
    }

    if (!descricao) {
      setErroDescricao(true)
    }

    if (estrelas.filter((star) => star).length == 0) {
      setErroEstrela(true)
    }

    // Fazer upload da imagem antes de criar o post
    const imagemUrl = await uploadImagem();

    if (imagemUrl == null) {
      setErroImgUrl(true)
    }

    if (!titulo || !descricao || estrelas.filter((star) => star).length == 0 || !imagemUrl) {
      return
    }

    setLoading(true);


    try {
      estrelasAvaliadas = estrelas.filter((star) => star).length
      console.log('Opa vamos tentar cadastrar um POST!!! dados a seguir ')
      console.log(user.usuario, titulo, descricao, estrelasAvaliadas, imagemUrl)

      // inserindo post no supabase
      const { data, error } = await supabase.from('post').insert([
        {
          user_username: user.usuario, title: titulo, description: descricao, rating: estrelasAvaliadas,
          link_img: imagemUrl
        },
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
      {erroTitulo ? <Text>Titulo é obrigatorio</Text> : <></>}

      <RMTextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição: "
      />
      {erroDescricao ? <Text>Descrição é obrigatoria</Text> : <></>}


      <View style={styles.cotainerEstrelas}>
        <Text>Selecione a quantidade de estrelas</Text>
        <Text>para o estabelecimento</Text>

        <View style={styles.containerAlinhamentoEstrelas}>
          {estrelas.map((filled, index) => (
            <TouchableOpacity key={index} onPress={() => pressionaEstrela(index)}>
              <Image style={styles.imagemEstrela} source={filled ? starfull : startempty} />
            </TouchableOpacity>
          ))}
        </View>
        {erroEstrela ? <Text>Escolha pelo menos uma Estrela !</Text> : <></>}
      </View>

      <View style={styles.cotainerImagem}>
        <TouchableOpacity onPress={selecionarImagem}>
          <Text style={styles.botaoImagem}>Selecione uma imagem</Text>
        </TouchableOpacity>
        {imagemLocal && (
          <Image source={{ uri: imagemLocal.uri }} style={styles.imagemPreview} />
        )}
        {erroImgUrl ? <Text>Escolha uma imagem !</Text> : <></>}
      </View>

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
  cotainerEstrelas: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  imagemEstrela: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginHorizontal: 5
  },
  containerAlinhamentoEstrelas: {
    flexDirection: "row",
    padding: 15,
  },
  cotainerImagem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  botaoImagem: {
    fontSize: fontSizes.medio,
    textDecorationLine: 'underline',
  },
  imagemPreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
})