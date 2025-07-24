import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, Alert, ScrollView, StyleSheet,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGuard from '../../hooks/AuthGuard';

export default function IgrejasPage() {
  const [igrejas, setIgrejas] = useState([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    pastor1: '',
    pastor2: '',
    pais: '',
    estado: '',
    endereço: '',
    cep: '',
    totalMembros: '',
  });

  useEffect(() => {
    fetchIgrejas();
  }, []);

  // API URL
  const API_URL = "https://api.comunhaorara.com"; // Substitua pelo seu IP e porta do servidor

  const fetchIgrejas = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const res = await axios.get(`${API_URL}/igreja/getall`, {
        headers: { Authorization: token },
      });
      setIgrejas(res.data);
    } catch (error) {
      console.error('Erro ao buscar igrejas:', error);
    }
  };

  const iniciarEdicao = (igreja: any) => {
    setEditandoId(igreja._id);
    setFormData({
      name: igreja.name || '',
      pastor1: igreja.pastor1 || '',
      pastor2: igreja.pastor2 || '',
      pais: igreja.pais || '',
      estado: igreja.estado || '',
      endereço: igreja.endereço || '',
      cep: igreja.cep || '',
      totalMembros: igreja.totalMembros?.toString() || '0',
    });
  };

  const salvarEdicao = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      await axios.patch(`${API_URL}/igreja/editar/${editandoId}`, {
        ...formData,
        totalMembros: parseInt(formData.totalMembros),
      }, {
        headers: { Authorization: token },
      });
      setEditandoId(null);
      fetchIgrejas();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao editar igreja');
    }
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData({
      name: '',
      pastor1: '',
      pastor2: '',
      pais: '',
      estado: '',
      endereço: '',
      cep: '',
      totalMembros: '',
    });
  };

  const deletarIgreja = (id: string) => {
    Alert.alert('Confirmar', 'Deseja realmente apagar esta igreja?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token')
            await axios.delete(`${API_URL}/igreja/deletar/${id}`, {
              headers: { Authorization: token },
            });
            fetchIgrejas();
          } catch (error) {
            Alert.alert('Erro', 'Erro ao deletar igreja');
          }
        },
      },
    ]);
  };

  return (
    <AuthGuard>
      <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={fetchIgrejas}>
        <Text style={styles.refreshButtonText}>Atualizar</Text>
      </TouchableOpacity>
      {igrejas.map((igreja: any) => (
        <View key={igreja._id} style={styles.card}>
          {editandoId === igreja._id ? (
            <>
              <TextInput
                placeholder="Nome"
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
              <TextInput
                placeholder="País"
                style={styles.input}
                value={formData.pais}
                onChangeText={(text) => setFormData({ ...formData, pais: text })}
              />
              <TextInput
                placeholder="Estado"
                style={styles.input}
                value={formData.estado}
                onChangeText={(text) => setFormData({ ...formData, estado: text })}
              />
              <TextInput
                placeholder="Endereço"
                style={styles.input}
                value={formData.endereço}
                onChangeText={(text) => setFormData({ ...formData, endereço: text })}
              />
              <TextInput
                placeholder="CEP"
                style={styles.input}
                value={formData.cep}
                onChangeText={(text) => setFormData({ ...formData, cep: text })}
              />
              <TextInput
                placeholder="Pastor 1"
                style={styles.input}
                value={formData.pastor1}
                onChangeText={(text) => setFormData({ ...formData, pastor1: text })}
              />
              <TextInput
                placeholder="Pastor 2"
                style={styles.input}
                value={formData.pastor2}
                onChangeText={(text) => setFormData({ ...formData, pastor2: text })}
              />
              <TextInput
                placeholder="Total de Membros"
                style={styles.input}
                keyboardType="numeric"
                value={formData.totalMembros}
                onChangeText={(text) => setFormData({ ...formData, totalMembros: text })}
              />
              <View style={styles.botoes}>
                <Button title="Salvar" onPress={salvarEdicao} />
                <View style={{ width: 10 }} />
                <Button title="Cancelar" color="gray" onPress={cancelarEdicao} />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.nome}>{igreja.name}</Text>
              <Text>{igreja.estado} - {igreja.pais}</Text>
              <Text>Endereço: {igreja.endereço}</Text>
              <Text>CEP: {igreja.cep}</Text>
              <Text>Pastores: {igreja.pastor1} / {igreja.pastor2}</Text>
              <Text>Membros: {igreja.totalMembros}</Text>
              <View style={styles.botoes}>
                <Button title="Editar" onPress={() => iniciarEdicao(igreja)} />
                <View style={{ width: 10 }} />
                <Button title="Apagar" color="red" onPress={() => deletarIgreja(igreja._id)} />
              </View>
            </>
          )}
        </View>
      ))}
    </ScrollView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  botoes: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  refreshButton: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  refreshButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
