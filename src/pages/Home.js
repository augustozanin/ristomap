import { StyleSheet, Text, View, Button, FlatList} from "react-native";
import React, {useState, useEffect} from "react";
import TopBar from "../components/TopBar";
import Post from "../components/Post";
import { useAuth } from "../context/AuthContext";
import { colors, fontSizes, globalStyles } from '../styles/styles';
import RMButtonPost from "../components/RMButtonPost";
import imagemusuario from "../assets/images/imagemusuario.png"
import restaurantepioneiro from '../assets/images/restaurantepioneiro.png'
import { supabase } from '../services/supabase';

export default function Home({ navigation }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('post')
      .select('user_username, link_img, description, title, rating')

  
    if (error) {
      console.error("Erro ao buscar os posts:", error);
      return [];
    }
    return data;
  };

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation}/>
       <FlatList
       contentContainerStyle={{ flexGrow: 1 }} 
       style={styles.flatList}
        data={posts}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item }) => (
          <Post
            profilePicture={require('../assets/images/imagemusuario.png')} 
            username={item.user_username}
            postImage={{ uri: item.link_img }} 
            description={item.description}
            title={item.title}
            rating={item.rating}
          />
        )}
      />
      <Button title="Logout" onPress={() => navigation.replace("Login")} />
      <RMButtonPost onPress={() => navigation.navigate("CriaPost")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.begeBG,
    flex: 1,
    marginTop: "10%",
    paddingTop: 100, // Adiciona espaço para a TopBar (ajuste conforme necessário)
  },
  flatList: {
    flex: 1, // Permite que o FlatList ocupe todo o espaço disponível
    width: '100%', // Garante que os itens preencham a largura da tela
  }
});
