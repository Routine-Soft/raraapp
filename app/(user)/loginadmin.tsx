import { useState } from 'react';
import { View, Image, StyleSheet, Platform, TouchableOpacity, Text, Alert, TextInput, Modal, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router'; // Importar useRouter para navegação
import AuthGuard from '../../hooks/AuthGuard';

// Tipagem do login
type LoginInfo = {
  username: string;
  password: string;
}

// Array de usuários para validação
const logins: LoginInfo[] = [
  {username: "supervisorcg", password: "a1a1"},
  {username: "liderlocalcg", password: "a2a2"},
  {username: "facilitadores", password: "a3a3"},
  {username: "lideravancai", password: "a4a4"},
  {username: "midialocal", password: "a5a5"},
  {username: "lidergeral", password: "a6a6"},
]

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter(); // Inicializar o router

  // Função chamada ao pressionar o botão
  const handlePixButtonPress = () => {
    Alert.alert("Clique pra copiar a chave", "CNPJ 0000.000.00-55 ");
  };

  const validarLogin = () => {
    const usuarioValido = logins.some(
      (login) => login.username === username && login.password === password
    );
  
    if (usuarioValido) {
      // Mapa de rotas associando usuários às suas respectivas páginas
      const rotas: { [key: string]: string } = {
        supervisorcg: "/(supervisorcg)", // Rota para supervisorcg
        liderlocalcg: "/(liderlocalcg)", // Rota para lider local
        facilitadores: "/(facilitadores)", // Rota para facilitadores
        lideravancai: "/(avancai)", // Rota para liderança avançai
        midialocal: "/(midialocal)", // Rota para liderança avançai
        lidergeral: "/(presidente)", // Rota para liderança avançai
      };
  
      // Buscar a rota correspondente ao usuário
      const rota: any = rotas[username];
  
      if (rota) {
        Alert.alert("Sucesso", "Login realizado com sucesso");
        setModalVisible(false); // Fecha o modal
        router.push(rota); // Redireciona para a rota correspondente
      } else {
        Alert.alert("Erro", "Rota não configurada para este usuário.");
      }
    } else {
      Alert.alert("Erro", "Usuário ou senha inválidos");
    }
  };
  

  return (
    <AuthGuard>
      <View style={styles.container}>
      <View>
      <Image
                source={require('@/assets/images/icon.png')}
                style={styles.reactLogo}
              />
      </View>

      <Text style={styles.titleText}>Painel Administrativo Rara App</Text>
      <Text style={styles.subtitleText}>Aviso importante!</Text>
      <Text style={styles.descriptionText}>Área restrita a pessoas autorizadas!</Text>
      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => setModalVisible(true)} // Abre o modal
      >
        <Text style={styles.adminText}>Supervisores Christian Group</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => setModalVisible(true)} // Abre o modal
      >
        <Text style={styles.adminText}>Liderança Local Christian Group</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => setModalVisible(true)} // Abre o modal
      >
        <Text style={styles.adminText}>Facilitadores</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => setModalVisible(true)} // Abre o modal
      >
        <Text style={styles.adminText}>Liderança Avançai</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => setModalVisible(true)} // Abre o modal
      >
        <Text style={styles.adminText}>Midia Local</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => setModalVisible(true)} // Abre o modal
      >
        <Text style={styles.adminText}>Liderança Geral</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Fecha o modal ao pressionar "voltar"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bem vindo!</Text>

            <TextInput
              style={styles.input}
              placeholder="Usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={styles.buttonContainer}>
              <Button title="Entrar" onPress={validarLogin} />
              <Button
                title="Cancelar"
                onPress={() => setModalVisible(false)} // Fecha o modal
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </AuthGuard>
  );
}

// Estilos dos componentes e do botão
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "#000",
  },
  reactLogo: {
    height: 278,
    width: 420,
    bottom: 0,
    left: -5,
    right: 0,
    position: 'absolute',
  },
  titleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 20,
  },
  subtitleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  descriptionText: {
    color: "#fff",
    fontWeight: "medium",
    fontSize: 17,
    textAlign: "center",
  },
  adminButton: {
    backgroundColor: "#2cab77",
    padding: 15,
    borderRadius: 8,
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    
  },
  adminText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
