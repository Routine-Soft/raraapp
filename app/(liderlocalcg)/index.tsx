import { Image, StyleSheet, Platform, TouchableOpacity, Text, Alert } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router'; // Importar useRouter para navegação
import AuthGuard from '../hooks/AuthGuard';

export default function HomeScreen() {
  const router = useRouter(); // Inicializar o router
  // Função chamada ao pressionar o botão
  const handlePixButtonPress = () => {
    Alert.alert("Clique pra copiar a chave", "CNPJ 0000.000.00-55 ");
  };

  return (
    <AuthGuard>
      <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logopequena.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Lider Local CG</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
    </AuthGuard>
  );
}

// Estilos dos componentes e do botão
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 278,
    width: 420,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    backgroundColor: '#4CAF50', // Cor do botão
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF', // Cor do texto do botão
    fontSize: 16,
    fontWeight: 'bold',
  },
});
