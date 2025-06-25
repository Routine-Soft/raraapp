import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_URL = 'https://rara.cestsegtrabalho.com.br'

  const handleSubmit = async () => {
    if (!email) return Alert.alert('Erro', 'Informe seu e-mail');
    try {
      await axios.post('https://rara.cestsegtrabalho.com.br/user/forgot-password', { email });
      Alert.alert('Sucesso', 'Verifique seu e-mail para redefinir sua senha.');
    } catch (err: any) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao enviar');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/user/login`, {email, password}, {
        headers: { 'Content-Type': 'application/json' },
      });

      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

      console.log('todos os dados do user: ' + JSON.stringify(response.data.user))
      console.log('Token: ' + response.data.token)

      // Alert.alert('Sucesso', 'Login realizado com sucesso!');
      router.replace('/home'); // Redireciona para a tela principal
    } catch (error: any) {
      Alert.alert('Erro: ', error.response.data.message);
      console.log('Erro: ', error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagem */}
      <Image
        source={require('@/assets/images/logopequena.jpg')} // Corrigido o uso de require
        style={styles.image}
      />
      <Text style={styles.title}>Fazer login</Text>

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>
      <Text style={styles.forgotPassword} onPress={() => router.push('/resetpassword')}>
      Esqueci minha senha
      </Text>


      <Text style={styles.signupText}>
        Não tem conta? <Text style={styles.signupLink} onPress={() => router.push('/criarusuario')}>Criar Conta</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  signupText: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 16,
  },
  forgotPassword: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 16,
  },
  signupLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  image: {
    width: 500,
    height: 200,
    borderRadius: 12,
    marginBottom: 20, // Espaçamento abaixo da imagem
  },
});
