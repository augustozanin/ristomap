import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { colors, fontSizes } from '../styles/styles';

export default function RMButtonPost({...rest}) {
  return (
      <TouchableOpacity style={styles.botao}  {...rest} >
        <Text style={styles.botaoTexto}>+</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    botao: {
      width: "16%",
      height: "8%",
      backgroundColor: '#ffff',
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      position: "absolute",
      bottom: 20, // Distância da borda inferior
      right: 20,  // Distância da borda direita
    },
    botaoTexto: {
      fontSize: fontSizes.grande,
      color: colors.vermelho,
    },
  });