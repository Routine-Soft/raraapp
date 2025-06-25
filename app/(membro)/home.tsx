import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BackHandler } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AuthGuard from '@/hooks/AuthGuard';

type Midia = {
  _id: string;
  data: string;
  hora: string;
  titulo: string;
  texto: string;
  igreja: string;
};

export default function NovaPagina() {
  const router = useRouter();
  const [midias, setMidias] = useState<Midia[]>([]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    fetchMidias();
    return () => backHandler.remove();
  }, []);

  const fetchMidias = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://rara.cestsegtrabalho.com.br/midiaLocal/get', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      setMidias(response.data);
    } catch (error) {
      console.error('Erro ao buscar mídias:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      router.replace('/');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
    }
  };

  return (
    <AuthGuard>
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => router.push('/hidden/edituser')}>
          <Feather name="edit" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/loginadmin')}>
          <Text style={styles.adminButtonText}>Logar como Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.adminButton} onPress={() => router.push('/(midialocal)/createAndUpdate')}>
          <Text style={styles.adminButtonText}>Criar Mídia</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image source={require('@/assets/images/logopequena.jpg')} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Bem-vindo à nova página!</Text>
        <Text style={styles.text}>Aqui você pode explorar novas funcionalidades.</Text>
        <Text style={styles.text}>Sinta-se à vontade para testar!</Text>
      </View>

      {/* Lista de informativos */}
      <Text style={styles.subTitle}>Informativos:</Text>
      {midias.map((midia) => (
        <View key={midia._id} style={styles.card}>
          <Text style={styles.cardTitle}>{midia.titulo}</Text>
          <Text style={styles.cardText}>{midia.texto}</Text>
          <Text style={styles.cardFooter}>📅 {midia.data} ⏰ {midia.hora}</Text>
          <Text style={styles.cardFooter}>Igreja: {midia.igreja}</Text>
        </View>
      ))}
    </ScrollView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
  },
  adminButton: {
    backgroundColor: '#2cab77',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginHorizontal: 5,
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
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2cab77',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
  },
  cardTitle: {
    color: '#2cab77',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 6,
  },
  cardFooter: {
    color: '#ccc',
    fontSize: 12,
  },
});
