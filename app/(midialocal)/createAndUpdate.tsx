import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

type Midia = {
  _id: string;
  data: string;
  hora: string;
  titulo: string;
  texto: string;
  igreja: string;
};

const CreateAndUpdate: React.FC = () => {
  const [midias, setMidias] = useState<Midia[]>([]);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [igreja, setIgreja] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const richText = useRef<RichEditor>(null);

  useEffect(() => {
    fetchMidias();
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

  const handleSubmit = async () => {
    if (!data || !hora || !titulo || !texto) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const userObj = await AsyncStorage.getItem('user')
      if (!userObj) return;
      const user = JSON.parse(userObj)
      const igreja = user.igreja
      
      if (editandoId) {
        // Atualizar mídia existente
        await axios.patch(`https://rara.cestsegtrabalho.com.br/midiaLocal/patch/${editandoId}`, 
          { data, hora, titulo, texto, igreja: igreja },
          { headers: { 'Content-Type': 'application/json', Authorization: token } }
        );
        Alert.alert('Mídia atualizada com sucesso!');
      } else {
        // Criar nova mídia
        await axios.post('https://rara.cestsegtrabalho.com.br/midiaLocal/post',
          { data, hora, titulo, texto, igreja: igreja },
          { headers: { 'Content-Type': 'application/json', Authorization: token } }
        );
        Alert.alert('Mídia criada com sucesso!');
      }

      setData('');
      setHora('');
      setTitulo('');
      setTexto('');
      setIgreja('')
      setEditandoId(null);
      fetchMidias();
    } catch (error) {
      console.error('Erro ao salvar mídia:', error);
    }
  };

  const handleEditar = (midia: Midia) => {
    setEditandoId(midia._id);
    setData(midia.data);
    setHora(midia.hora);
    setTitulo(midia.titulo);
    setTexto(midia.texto); // isso já muda o valor que vai pro editor
    setIgreja(midia.igreja)
  };

  const handleDeletar = async (id: string) => {
    Alert.alert('Confirmação', 'Deseja deletar esta mídia?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(`https://rara.cestsegtrabalho.com.br/midiaLocal/delete/${id}`, {
              headers: { 'Content-Type': 'application/json', Authorization: token },
            });
            Alert.alert('Mídia deletada com sucesso!');
            fetchMidias();
          } catch (error) {
            console.error('Erro ao deletar mídia:', error);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{editandoId ? 'Editar Mídia' : 'Criar Nova Mídia'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Data (ex: 25/04/2025)"
        placeholderTextColor="#888"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (ex: 19:30)"
        placeholderTextColor="#888"
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#888"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Texto"
        placeholderTextColor="#888"
        value={texto}
        onChangeText={setTexto}
        multiline
      />
      {/* Editor de Texto Rico
      <RichEditor
        ref={richText}
        initialContentHTML={texto ? texto : '<p></p>'}

        onChange={(html) => setTexto(html)}
        style={styles.richEditor}
        placeholder="Digite o texto formatado aqui..."
      />
      <RichToolbar
        editor={richText}
        actions={[actions.setBold, actions.setItalic, actions.insertLink, actions.setUnderline, actions.insertBulletsList, actions.insertOrderedList]}
        style={styles.richToolbar}
      /> */}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{editandoId ? 'Atualizar' : 'Criar'}</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Mídias Cadastradas</Text>

      {midias.map((midia) => (
        <View key={midia._id} style={styles.midiaItem}>
          <Text style={styles.midiaTitle}>{midia.titulo}</Text>
          <Text style={styles.midiaTitle}>{midia.texto}</Text>
          <Text style={styles.midiaTitle}>{midia.data}</Text>
          <Text style={styles.midiaTitle}>{midia.hora}</Text>
          <Text style={styles.midiaTitle}>{midia.igreja}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEditar(midia)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletar(midia._id)}>
              <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CreateAndUpdate;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    color: '#2cab77',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    color: '#fff',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2cab77',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  midiaItem: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  midiaTitle: {
    color: '#2cab77',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
  richEditor: {
    minHeight: 200,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#333',
    padding: 10,
  },
  richToolbar: {
    backgroundColor: '#222',
    marginBottom: 20,
    borderRadius: 8,
  },
});
