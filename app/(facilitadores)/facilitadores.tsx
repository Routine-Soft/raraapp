// app/login.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import AuthGuard from '../../hooks/AuthGuard';

export default function FacilitadoresScreen() {
  //Expo Routes
  const router = useRouter();

  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cg, setCg] = useState('');
  const [igreja, setIgreja] = useState('');
  const [status, setStatus] = useState('');
  const [batizado, setBatizado] = useState('');
  const [password, setPassword] = useState('123');
  const [ddd, setDdd] = useState('');
  const [selectedDDI, setSelectedDDI] = useState('+55'); // DDI padrão (Brasil)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // API URL
  const API_URL = "https://api.comunhaorara.com"; // Substitua pelo seu IP e porta do servidor

  // Handle the button register
  const handleRegister = async () => {
    const fullPhone = `${selectedDDI}${ddd}${whatsapp}`;

    try {
      console.log("Iniciando o cadastro...");
      const userData = {
        name,
        email,
        whatsapp: fullPhone, // Número completo com DDI e DDD
        birthdate: birthday,
        gender,
        endereco,
        cg,
        igreja,
        status,
        batizado,
        password,
      };

      const response = await fetch(`${API_URL}/user/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log("Usuário cadastrado com sucesso:", data);
      alert('Usuário cadastrado com sucesso');

      // Limpar os inputs
      setName('');
      setEmail('');
      setWhatsapp('');
      setBirthday('');
      setGender('');
      setEndereco('');
      setCg('');
      setIgreja('');
      setStatus('');
      setBatizado('');
      setPassword('');  // Caso queira limpar a senha também
      setDdd('');
      setSelectedDDI('+55');  // Resetar o DDI para o padrão
      setSelectedImage(null);  // Limpar a imagem, caso haja
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <AuthGuard>
      <ScrollView contentContainerStyle={styles.container}>
      {/* Imagem acima do título */}
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.headerImage}
      />
      <Text style={styles.title}>Facilitadores</Text>
      <Text style={styles.subtitle}>Cadastro de Novo Convertido</Text>

      {/* Nome Completo */}
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        placeholder=""
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder=""
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Whatsapp com bandeiras */}
      <Text style={styles.label}>Whatsapp com DDD</Text>
      <View style={styles.whatsappContainer}>
      <RNPickerSelect
          onValueChange={(value) => setSelectedDDI(value)}
          items={[
            { label: '🇧🇷', value: '+55' },
            { label: '🇵🇹', value: '+351' },
          ]}
          style={{
            inputAndroid: styles.picker,
            inputIOS: styles.picker,
          }}
          value={selectedDDI}
          placeholder={{ label: 'Selecione o DDI', value: null }}  // Adiciona um placeholder se desejar
        />

        <TextInput
          placeholder="DDD"
          value={ddd}
          onChangeText={setDdd}
          style={styles.dddInput}
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          placeholder="Número"
          value={whatsapp}
          onChangeText={setWhatsapp}
          style={styles.numberInput}
          keyboardType="numeric"
        />
      </View>

      {/* Data de Nascimento */}
      <Text style={styles.label}>Data de Nascimento (dia/mês/ano)</Text>
      <TextInput
        placeholder=""
        value={birthday}
        onChangeText={setBirthday}
        style={styles.input}
      />

      {/* Gênero */}
      <Text style={styles.label}>Gênero</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Homem" value="Homem" />
        <Picker.Item label="Mulher" value="Mulher" />
      </Picker>

      {/* Endereço */}
      <Text style={styles.label}>Endereço</Text>
      <TextInput
        placeholder=""
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />

      {/* Christian Group
      <Text style={styles.label}>Christian Group</Text>
      <Picker
        selectedValue={cg}
        onValueChange={(itemValue) => setCg(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione" value="" />
      </Picker> */}

      {/* Igreja */}
      <Text style={styles.label}>Igreja</Text>
      <Picker
        selectedValue={igreja}
        onValueChange={(itemValue) => setIgreja(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione" value="" />
      </Picker>

      {/* Status */}
      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Visitante" value="Visitante" />
        <Picker.Item label="Aceitou" value="Aceitou" />
        <Picker.Item label="Reconciliou" value="Reconciliou" />
        <Picker.Item label="Deseja trocar de Igreja" value="Deseja trocar de igreja" />
        <Picker.Item label="Membro" value="Membro" />
      </Picker>

      {/* Batizado */}
      <Text style={styles.label}>Batizado</Text>
      <Picker
        selectedValue={batizado}
        onValueChange={(itemValue) => setBatizado(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Sim" value="Sim" />
        <Picker.Item label="Não" value="Não" />
      </Picker>

      <Button title="Cadastrar" onPress={handleRegister} />
    </ScrollView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    paddingTop: 100,
    paddingBottom: 200,
    backgroundColor: '#000',
    color: '#FFFFFF',
  },
  headerImage: {
    width: '100%',
    height: '20%',
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#FFFFFF',
  },
  input: {
    height: 55,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#FFFFFF',
    backgroundColor: '#444444',
    borderRadius: 10,
  },
  whatsappContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  picker: {
    flex: 5,
    height: 55,

    backgroundColor: '#444444',
    borderRadius: 10,
    color: '#FFFFFF',
    paddingHorizontal: 50,
    justifyContent: 'center',
    textAlign: 'center', // Centraliza o conteúdo
  },
  dddInput: {
    flex: 1,
    height: 55,
    width: 65,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    color: '#FFFFFF',
    backgroundColor: '#444444',
    borderRadius: 10,
  },
  numberInput: {
    flex: 4,
    height: 55,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 8,
    color: '#FFFFFF',
    backgroundColor: '#444444',
    borderRadius: 10,
  },
});
