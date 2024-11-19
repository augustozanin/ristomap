import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import TopBar from "../components/TopBar";
import Post from "../components/Post";
import { useAuth } from "../context/AuthContext";
import { colors, fontSizes, globalStyles } from '../styles/styles';
import RMButtonPost from "../components/RMButtonPost";

export default function Home({ navigation }) {
  const { user, token } = useAuth();

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation}/>
      <Post
        profilePicture="https://example.com/profile1.jpg"
        username="Luciana Lima"
        postImage="https://example.com/post1.jpg"
        description="Hoje fui no restaurante Pioneiro"
      />
      <Text>Home</Text>
      <Text>Seu usuário {user.usuario}</Text>
      <Text>Sua senha {user.senha}</Text>
      <Text>{token}</Text>
      <Button title="Logout" onPress={() => navigation.replace("Login")} />
      <RMButtonPost/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.begeBG,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
