import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const LoginOrRegisterScreen = () => {
  return (
    <View style={styles.slide}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Logar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default LoginOrRegisterScreen;
