import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import home from "../assets/images/home.png";
import location from "../assets/images/location.png";
import search from "../assets/images/search.png";
import user from "../assets/images/user.png";
import { colors, fontSizes, globalStyles } from '../styles/styles';


function TopBar({navigation}) {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
        style={styles.botaoIcone}
        onPress={() => navigation.navigate("Home")}>
          <Image
            source={home} 
            style={styles.icone}
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
        style={styles.botaoIcone}
        onPress={() => navigation.navigate("Map_Page")}>
          <Image
            source={location} 
            style={styles.icone}
          />
        </TouchableOpacity>


        <TouchableOpacity style=
        {styles.botaoIcone}
        onPress={() => navigation.navigate("User")}>
          <Image
            source={user} 
            style={styles.icone_user}
          />
        </TouchableOpacity>


        <TouchableOpacity style={styles.botaoIcone}>   
          <Image
            source={search} 
            style={styles.icone}
          />
        </TouchableOpacity>


      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      alignSelf: "center",
      backgroundColor: colors.vermelho, 
      paddingVertical: 5,
      paddingHorizontal: 80,
      borderRadius: 15,
      width: "90%",
      height: "7%",
      position: 'absolute', 
      top: 0, 
      zIndex: 1, 
      marginTop: "5%"
    },
    botaoIcone: {
      padding: 10,
    },
    icone: {
      width: 25,
      height: 24,
    },
    icone_user: {
      width: 30,
      height: 24,
    },
  });
  
  export default TopBar;
  