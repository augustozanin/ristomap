import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from '../styles/styles';
import Map from '../components/Map';
import RMButton from "../components/RMButton";
import TopBar from "../components/TopBar";

const Map_Page = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Map />
      <TopBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.begeBG,
  },
  

});

export default Map_Page;
