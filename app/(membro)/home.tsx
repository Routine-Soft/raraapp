import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Para navegação
import { useAuth } from '../hooks/useAuth';
import { BackHandler } from 'react-native'
import { useEffect } from 'react'
import { MaterialIcons, Feather } from '@expo/vector-icons'; // Ícone de logout
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NovaPagina() {
  const router = useRouter(); // Inicializar o router para navegação
  const {authenticated, isLoading} = useAuth() // Usa o hook para verificar se está logado

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      router.replace('/'); // Redireciona para tela de login
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
    }
  };
  
  if (isLoading) {
    // Enquanto verifica o token, mostra loading
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2cab77" />
      </View>
    );
  }

  if (!authenticated) {
    // Caso não esteja autenticado, nem mostra a tela
    return null;
  }

  return (
    <View style={styles.container}>

      <View style={styles.topRow}>
          {/*Colocar o EditUser aqui*/}
          <TouchableOpacity onPress={() => router.push('/hidden/edituser')}>
              <Feather name="edit" size={28} color="#fff" />
            </TouchableOpacity>

          {/* Botão admin */}
          <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/loginadmin')}>
            <Text style={styles.adminButtonText}>Logar como Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/(midialocal)/createAndUpdate')}>
            <Text style={styles.adminButtonText}>TEste</Text>
          </TouchableOpacity>

          {/* Botão de Logout*/}
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons name="logout" size={28} color="#fff" />
          </TouchableOpacity>
      </View>

      {/* Imagem */}
      <Image
        source={require('@/assets/images/logopequena.jpg')} // Corrigido o uso de require
        style={styles.image}
      />

      {/* Dizeres aleatórios */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Bem-vindo à nova página!</Text>
        <Text style={styles.text}>Aqui você pode explorar novas funcionalidades.</Text>
        <Text style={styles.text}>Sinta-se à vontade para testar!</Text>
      </View>
    </View>
  );
}

// Estilos da página
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Cor de fundo
    alignItems: 'center',
    justifyContent: 'flex-start', // Começar do topo
    paddingTop: Platform.OS === 'ios' ? 50 : 30, // Padding para evitar sobreposição no iOS/Android
  },
  adminButton: {
    backgroundColor: '#2cab77', // Cor verde
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombras no Android
  },
  adminButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginBottom: 20, // Espaçamento abaixo da imagem
  },
  textContainer: {
    paddingHorizontal: 20, // Espaçamento lateral para os textos
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10, // Espaçamento entre os textos
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
});
