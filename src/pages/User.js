import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { colors, fontSizes, globalStyles } from '../styles/styles';
import imagemusuario from "../assets/images/imagemusuario.png";
import RMButton from "../components/RMButton";


const User = () => {
  return (
    <View style={styles.container}>

      <View style={styles.profileContainer}>
      <Image
        source={imagemusuario}
        style = {styles.profilePicture}/>
      <Text style={styles.username}> Username </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <RMButton
          titulo="Avaliações"
          action={() => {}} 
          customButtonStyle={styles.buttonStyle}
        />
        <RMButton
          titulo="Editar Perfil"
          action={() => {}} 
          customButtonStyle={styles.buttonStyle}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.begeBG,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 40,
  },

  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  buttonsContainer: {
    width: "80%",
    alignItems: "center",
  },
  
  buttonStyle: {
    marginVertical: 10,
  },
});

export default User;
