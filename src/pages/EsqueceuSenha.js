import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import RMButton from '../components/RMButton';
import { colors, fontSizes, globalStyles } from '../styles/styles';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleSendCode = () => {
    console.log('Código enviado para:', email);
  };

  const handleVerifyCode = () => {
    console.log('Code entered:', code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite seu e-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        placeholderTextColor= {colors.branco}
        value={email}
        onChangeText={setEmail}
      />
      <RMButton
        titulo="Enviar Código"
        action={handleSendCode}
        customButtonStyle={styles.button}
      />
      <Text style={styles.label}>Digite o código recebido</Text>
      <View style={styles.codeContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => {
              let newCode = code.split('');
              newCode[index] = text;
              setCode(newCode.join(''));
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.begeBG,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: fontSizes.medio,
    color: colors.vermelho,
    marginVertical: 10,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: colors.vermelho,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  codeInput: {
    width: 40,
    height: 40,
    backgroundColor: colors.vermelho,
    color: colors.branco,
    fontSize: fontSizes.medio,
    borderRadius: 10,
    textAlign: 'center',
    marginHorizontal: 5,
  },
});

