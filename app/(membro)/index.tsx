import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router'; // Para navegação

export default function NovaPagina() {
  const router = useRouter(); // Inicializar o router para navegação

  return (
    <View style={styles.container}>
      {/* Botão no topo */}
      <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/loginadmin')}>
        <Text style={styles.adminButtonText}>Logar como Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/loginscreen')}>
        <Text style={styles.adminButtonText}>Logar usuário comum</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/criarusuario')}>
        <Text style={styles.adminButtonText}>Criar conta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/principal')}>
        <Text style={styles.adminButtonText}>Principal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/igreja')}>
        <Text style={styles.adminButtonText}>Criar igreja</Text>
      </TouchableOpacity>

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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20, // Espaçamento abaixo do botão
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombras no Android
  },
  adminButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
});
