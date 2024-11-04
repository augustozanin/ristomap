import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors, fontSizes, globalStyles } from '../styles/styles';

const Map = () => {
  return (
    <View style={styles.container}>
      <Text>Tela mapa</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.begeBG,
  },
});

export default Map;
