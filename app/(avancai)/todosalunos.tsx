// app/membresia.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícones do Expo
import axios from 'axios';
import AuthGuard from '../../hooks/AuthGuard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

type AulasConcluidas = {
  reset: string[];
  start: string[];
  cdv: string[];
};

type Usuario = {
  _id: string;
  name: string;
  status: string;
  igreja: string;
  reset: string[];
  start: string[];
  cdv: string[];
};

const Membresia: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchUsuarios = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.247.103:8080/user/getall', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      const todosUsuarios = response.data;

      const filtrados = todosUsuarios.filter((u: Usuario) => u.igreja === 'Comunhão Rara Rio');
      setUsuarios(filtrados);
      setFilteredUsuarios(filtrados);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const toggleExpand = (userId: string) => {
    setExpanded(expanded === userId ? null : userId);
  };

  const handleStatusChange = (text: string, userId: string) => {
    const updatedUsuarios = filteredUsuarios.map(usuario =>
      usuario._id === userId ? { ...usuario, status: text } : usuario
    );
    setUsuarios(updatedUsuarios);
    setFilteredUsuarios(updatedUsuarios);
  };

  const updateStatus = async (userId: string, status: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.patch(`http://192.168.247.103:8080/user/patch/${userId}`, { status }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      fetchUsuarios();
      Alert.alert('Sucesso', 'Status atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o status');
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredUsuarios(usuarios);
    } else {
      const filtrados = usuarios.filter(usuario =>
        usuario.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsuarios(filtrados);
    }
  };

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
        <Text style={styles.titulo}>Alunos & Membresia</Text>

        {/* Campo de busca */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={handleSearch}
          />
        </View>

        {filteredUsuarios.map((usuario) => (
          <View key={usuario._id} style={styles.alunoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.nome}>{usuario.name}</Text>
              <TouchableOpacity onPress={() => toggleExpand(usuario._id)}>
                <Text style={styles.verMais}>{expanded === usuario._id ? 'Fechar' : 'Ver Mais'}</Text>
              </TouchableOpacity>
            </View>

            {expanded === usuario._id && (
              <View style={styles.expandido}>
                {(['reset', 'start', 'cdv'] as (keyof AulasConcluidas)[]).map((modulo) => (
                  <View key={modulo} style={styles.card}>
                    <Text style={styles.modulo}>{modulo.toUpperCase()}</Text>
                    <Text style={styles.numeros}>
                      {usuario[modulo]?.length > 0
                        ? usuario[modulo].join(', ')
                        : 'Nenhuma aula concluída'}
                    </Text>
                  </View>
                ))}

                <Text style={styles.statusLabel}>Trocar para 'Membro' após a conclusão do Avançai e apresentação no Culto da Família</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                    selectedValue={usuario.status}
                    onValueChange={(value) => handleStatusChange(value, usuario._id)}
                    dropdownIconColor="#fff"
                    style={styles.picker}
                    >
                    <Picker.Item label="Selecione" value="" />
                    <Picker.Item label="Visitante" value="Visitante" />
                    <Picker.Item label="Aceitou" value="Aceitou" />
                    <Picker.Item label="Reconciliou" value="Reconciliou" />
                    <Picker.Item label="Deseja trocar de Igreja" value="Deseja trocar de igreja" />
                    <Picker.Item label="Membro" value="Membro" />
                    </Picker>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => updateStatus(usuario._id, usuario.status)}
                >
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </AuthGuard>
  );
};

export default Membresia;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
    paddingBottom: 40,
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
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  alunoContainer: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    color: '#2cab77',
    fontSize: 20,
    fontWeight: 'bold',
  },
  verMais: {
    color: '#2cab77',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  expandido: {
    marginTop: 16,
  },
  card: {
    backgroundColor: '#2cab77',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  modulo: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  numeros: {
    color: '#FFF',
    fontSize: 15,
  },
  statusLabel: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2cab77',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pickerWrapper: {
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
  },
});
