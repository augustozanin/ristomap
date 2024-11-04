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
        onPress={() => navigation.navigate("Map")}>
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
            style={styles.icone}
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
      backgroundColor: colors.vermelho, 
      paddingVertical: 5,
      paddingHorizontal: 50,
      borderRadius: 20
    },
    botaoIcone: {
      padding: 10,
    },
    icone: {
      width: 24,
      height: 24,
    },
  });
  
  export default TopBar;
  