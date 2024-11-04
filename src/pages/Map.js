import React from "react";
import { StyleSheet, View, Text } from "react-native";

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
    backgroundColor: "#F7EEE9",
  },
});

export default Map;
