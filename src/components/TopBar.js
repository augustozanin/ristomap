import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import home from "../assets/images/home.png";
import location from "../assets/images/location.png";
import search from "../assets/images/search.png";
import user from "../assets/images/user.png";

function TopBar({navigation}) {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => navigation.navigate("Home")}>
          <Image
            source={home} 
            style={styles.icon}
          />
        </TouchableOpacity>


        <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => navigation.navigate("Map")}>
          <Image
            source={location} 
            style={styles.icon}
          />
        </TouchableOpacity>


        <TouchableOpacity style=
        {styles.iconButton}
        onPress={() => navigation.navigate("User")}>
          <Image
            source={user} 
            style={styles.icon}
          />
        </TouchableOpacity>


        <TouchableOpacity style={styles.iconButton}>   
          <Image
            source={search} 
            style={styles.icon}
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
      backgroundColor: '#B22222', // Red color
      paddingVertical: 5,
      paddingHorizontal: 50,
      borderRadius: 20
    },
    iconButton: {
      padding: 10,
    },
    icon: {
      width: 24,
      height: 24,
    },
  });
  
  export default TopBar;
  