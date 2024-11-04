import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function Post({ profilePicture, username, postImage, description }) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image source={{ uri: postImage }} style={styles.postImage} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 120,
    marginVertical: 20,
    marginHorizontal: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 8,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
});

export default Post;
