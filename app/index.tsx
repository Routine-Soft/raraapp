import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Imagem */}
      <Image
        source={require('@/assets/images/icon.png')} // Coloque a imagem desejada
        style={styles.image}
      />
      <Text style={styles.title}>Comunhão Rara</Text>

      <Text style={styles.subtitle}>
        Bem-vindo ao aplicativo da Comunhão Rara. Todas as informações da igreja na palma da sua mão.
      </Text>

      {/* Botão para Login */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Fazer login</Text>
      </TouchableOpacity>

      {/* Botão para Criar Usuário */}
      <Text style={styles.signupText}>
        Não tem cadastro ainda?{' '}
        <Text style={styles.signupLink} onPress={() => router.push('/criarusuario')}>
          Criar conta
        </Text>
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    marginHorizontal: 20,
  },
  button: {
    width: '80%',
    height: 48,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  signupText: {
    color: '#ccc',
    fontSize: 14,
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
