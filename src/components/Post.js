import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import starfull from '../assets/images/starfull.png'
import { colors } from '../styles/styles';

function Post({ profilePicture, username, postImage, description, title, rating }) {
  return (
    <View style={styles.containerPost}>

      <View style={styles.userInfo}>
        <Image source={profilePicture} style={styles.profilePicture} />
        <Text style={styles.username}>{username}</Text>
      </View>

      <Image source={postImage} style={styles.postImage} />

      <View style={styles.containerTextos}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.containerRating}>
        <Text style={styles.ratingText}>Avaliação: {rating}</Text>
        <Image style={styles.imagemRating} source={starfull} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: "100%",
  },
  containerPost: {
    width: '100%', // Ocupar toda a largura
    backgroundColor: '#fff',
    marginBottom: 20, // Espaçamento entre os posts
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 5,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: colors.vermelho
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postImage: {
    width: '100%', // Garante que a largura ocupe toda a tela
    height: 270, // Altura fixa (ajuste conforme necessário)
    resizeMode: 'cover', // Garante que a imagem se ajuste sem distorcer
    marginTop: 0, // Remove margens extras
    marginHorizontal: 0, // Remove espaçamento lateral
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
  containerRating: {
    flexDirection: "row",
    marginHorizontal: "2%"
  },
  imagemRating: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginHorizontal: 5
  },
  containerTextos: {
    marginHorizontal: "2%"
  }
});

export default Post;
