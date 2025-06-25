import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AuthGuard from '@/hooks/AuthGuard';

type AulasConcluidas = {
  reset: string[];
  start: string[];
  cdv: string[];
};

const AlunoAvancai: React.FC = () => {
  const router = useRouter();
  const [aulas, setAulas] = useState<AulasConcluidas>({
    reset: [],
    start: [],
    cdv: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAulas = async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token')
        if (!userStr) return;

        const user = JSON.parse(userStr);
        const response = await axios.get(`https://rara.cestsegtrabalho.com.br/user/get/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        });
        const userData = response.data;

        setAulas({
          reset: userData.reset || [],
          start: userData.start || [],
          cdv: userData.cdv || [],
        });
      } catch (err) {
        console.error('Erro ao buscar aulas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAulas();
  }, []);

  useEffect(() => {
    const back = BackHandler.addEventListener('hardwareBackPress', () => {
      router.back();
      return true;
    });

    return () => back.remove();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2cab77" />
      </View>
    );
  }

  return (
    <AuthGuard>
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Aulas Concluídas</Text>

      {(['reset', 'start', 'cdv'] as (keyof AulasConcluidas)[]).map((modulo) => (
        <View key={modulo} style={styles.card}>
          <Text style={styles.modulo}>{modulo.toUpperCase()}</Text>
          <Text style={styles.numeros}>
            {aulas[modulo].length > 0 ? aulas[modulo].join(', ') : 'Nenhuma aula concluída'}
          </Text>
        </View>
      ))}
    </ScrollView>
    </AuthGuard>
  );
};

export default AlunoAvancai;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#2cab77',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  modulo: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  numeros: {
    color: '#FFF',
    fontSize: 16,
  },
});
