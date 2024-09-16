import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [lado1, setLado1] = useState('');
  const [lado2, setLado2] = useState('');
  const [lado3, setLado3] = useState('');
  const [lado4, setLado4] = useState('');
  const [alerta, setAlerta] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);


  const handleFormas = async () => {
    try {
      setError(null); // Reset error
      const response = await fetch(
        `http://172.16.7.2:3000/formas?lado1=${lado1}&lado2=${lado2}&lado3=${lado3}&lado4=${lado4}`
      );
      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error);
        setResult(null);
        setAlerta(null);
      }
    } catch (err) {
      setError('Erro de rede ou servidor!');
      setResult(null);
      setAlerta(null);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formas - Calcular a área</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Primeiro Lado"
        value={lado1}
        onChangeText={setLado1}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Segundo Lado"
        value={lado2}
        onChangeText={setLado2}
      />
       <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Terceiro Lado"
        value={lado3}
        onChangeText={setLado3}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Quarto Lado"
        value={lado4}
        onChangeText={setLado4}
      />
      {alerta !== null && <Text style={styles.alerta}>Alerta: {alerta}</Text>}

      <Button title="Calcular" onPress={handleFormas} />

      {result !== null && <Text style={styles.result}>Resultado: {result}</Text>}
      {error && <Text style={styles.error}>Erro: {error}</Text>}
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  alerta: {
 
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});