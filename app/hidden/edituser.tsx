import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import AuthGuard from '../../hooks/AuthGuard';


interface EditarUsuarioProps {
  userId: string;
  token: string;
}

const EditarUsuario: React.FC<EditarUsuarioProps> = ({ userId, token }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    password: '',
    gender: '',
    birthdate: '',
    igreja: '',
    endereco: '',
    status: '',
    token: '',
    resetPasswordToken: '',
    resetPasswordExpires: '',
    batizado: '',
    admin: '',
  });

  const [loading, setLoading] = useState(true);
  const [listaIgrejas, setListaIgrejas] = useState([]);
  
  const API_URL = 'https://api.comunhaorara.com'

  // GET IGrejas
  const getIGrejas = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const response = await axios.get(`${API_URL}/igreja/getall`, {
        headers: {
            Authorization: token,
        },
      })
      const igrejas = response.data

      const nomesDasIgrejas = igrejas.map((igreja: { name: any; }) => igreja.name)
      setListaIgrejas(nomesDasIgrejas); // salva os nomes no estado
      console.log('Igrejas buscadas com sucesso')
    } catch (error) {
      console.log('Erro ao buscar igrejas')
    }
  }
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        if (!userStr) return;
        const user = JSON.parse(userStr);
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get(`${API_URL}/user/get/${user._id}`, {
          headers: {
            Authorization: token,
          },
        });
        setFormData({
            ...response.data,
            password: '',
        });
      } catch (error: any) {
        console.error(error.response?.data || error.message);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    getIGrejas();
  }, [userId, token]);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
    const userStr = await AsyncStorage.getItem('user');
    if (!userStr) return;
    const user = JSON.parse(userStr);
      const token = await AsyncStorage.getItem('token')
      const response = await axios.patch(
        `${API_URL}/user/patch/${user._id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
      console.log(response.data);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível atualizar o usuário');
    }
  };

  return (
    <AuthGuard>
        <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Usuário</Text>

      <>
    <Text style={styles.subtitle}>Nome</Text>
    <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#aaa"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
    />
    <Text style={styles.subtitle}>Whatsapp</Text>
    <TextInput
        style={styles.input}
        placeholder="WhatsApp"
        placeholderTextColor="#aaa"

        value={formData.whatsapp}
        onChangeText={(text) => handleChange('whatsapp', text)}
    />

    <Text style={styles.subtitle}>Email</Text>
    <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
    />

    <Text style={styles.subtitle}>Senha</Text>
    <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
    />

    <Text style={styles.subtitle}>Gênero</Text>
    <View style={styles.pickerWrapper}>
        <Picker
        selectedValue={formData.gender}
        onValueChange={(value) => handleChange('gender', value)}
        dropdownIconColor="#fff"
        style={styles.picker}
        >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Homem" value="Homem" />
        <Picker.Item label="Mulher" value="Mulher" />
        </Picker>
    </View>

    <Text style={styles.subtitle}>Data de Nascimento</Text>
    <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        placeholderTextColor="#aaa"
        value={formData.birthdate}
        onChangeText={(text) => handleChange('birthdate', text)}
    />

    {/* <Text style={styles.subtitle}>Igreja</Text>
    <View style={styles.pickerWrapper}>
        <Picker
        selectedValue={formData.igreja}
        onValueChange={(value) => handleChange('igreja', value)}
        dropdownIconColor="#fff"
        style={styles.picker}
        >
        <Picker.Item label="Selecione" value="" />
        {listaIgrejas.map((nome, index) => (
          <Picker.Item key={index} label={nome} value={nome} />
        ))}
        </Picker>
    </View> */}

    <Text style={styles.subtitle}>Endereço</Text>
    <TextInput
        style={styles.input}
        placeholder="Endereço"
        placeholderTextColor="#aaa"
        value={formData.endereco}
        onChangeText={(text) => handleChange('endereco', text)}
    />

    <Text style={styles.subtitle}>Status</Text>
    <View style={styles.pickerWrapper}>
        <Picker
        selectedValue={formData.status}
        onValueChange={(value) => handleChange('status', value)}
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

    {/* <TextInput
        style={styles.input}
        placeholder="Token"
        value={formData.token}
        onChangeText={(text) => handleChange('token', text)}
    />

    <TextInput
        style={styles.input}
        placeholder="Reset Password Token"
        value={formData.resetPasswordToken}
        onChangeText={(text) => handleChange('resetPasswordToken', text)}
    />

    <TextInput
        style={styles.input}
        placeholder="Reset Password Expires"
        value={formData.resetPasswordExpires}
        onChangeText={(text) => handleChange('resetPasswordExpires', text)}
    /> */}

    <Text style={styles.subtitle}>Batizado?</Text>
    <View style={styles.pickerWrapper}>
        <Picker
        selectedValue={formData.batizado}
        onValueChange={(value) => handleChange('batizado', value)}
        dropdownIconColor="#fff"
        style={styles.picker}
        >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Sim" value="Sim" />
        <Picker.Item label="Não" value="Não" />
        </Picker>
    </View>

    {/* <TextInput
        style={styles.input}
        placeholder="Admin"
        value={formData.admin}
        onChangeText={(text) => handleChange('admin', text)}
    /> */}
</>
        <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>
    </ScrollView>
    </AuthGuard>
  );
};

export default EditarUsuario;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
    flexGrow: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
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
  button: {
    backgroundColor: "#2cab77",
    padding: 15,
    borderRadius: 8,
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  }
});
