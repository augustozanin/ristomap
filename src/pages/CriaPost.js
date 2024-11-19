import { StyleSheet, Text, View } from 'react-native'
import { colors, fontSizes, globalStyles } from '../styles/styles';
import React from 'react'
import TopBar from '../components/TopBar';

export default function CriaPost({ navigation }) {
  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.begeBG,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})