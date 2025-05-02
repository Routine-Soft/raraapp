import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import AuthGuard from '../hooks/AuthGuard';

const API_URL = 'http://192.168.247.100:8080';

type User = {
  _id: string,
  name: string;
  whatsapp: string;
  email: string;
  gender: string;
  birthdate: string;
  endereco: string;
  igreja: string;
  status: string;
  batizado: string;
  admin: boolean;
  createdAt: string; // Data de cadastro
};

export default function UserListScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Buscar lista de usuários
  const fetchUsers = async () => {
    const token = await AsyncStorage.getItem('token'); // ou SecureStore se estiver usando
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/user/getall/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}` // Aqui é o formato correto
        }
      });

      // Ordenar a lista pelo campo `createdAt` (mais recente primeiro)
      const sortedData = response.data.sort(
        (a: User, b: User) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setUsers(sortedData);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      Alert.alert('Erro', 'Erro ao buscar usuários');
    } finally {
      setLoading(false);
    }
  };

  // Agrupar os dados para relatório mensal e anual
  const groupByMonthAndYear = () => {
    const monthlyReport: { [key: string]: any } = {};
    const yearlyReport: { [key: string]: any } = {};

    users.forEach((user) => {
      const createdAt = new Date(user.createdAt);
      const monthYear = `${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`; // Ex: "1-2025"
      const year = `${createdAt.getFullYear()}`;

      // // Relatório mensal
      // if (!monthlyReport[monthYear]) {
      //   monthlyReport[monthYear] = { accepted: 0, reconciled: 0, changedChurch: 0, baptized: 0, notBaptized: 0 };
      // }
      // if (user.status === 'Aceitou') monthlyReport[monthYear].accepted += 1;
      // if (user.status === 'Reconciliado') monthlyReport[monthYear].reconciled += 1;
      // if (user.igreja !== 'Deseja trocar de Igreja') monthlyReport[monthYear].changedChurch += 1;
      // if (user.batizado === 'Sim') monthlyReport[monthYear].baptized += 1;
      // else monthlyReport[monthYear].notBaptized += 1;

      // Relatório anual
      if (!yearlyReport[year]) {
        yearlyReport[year] = { accepted: 0, reconciled: 0, changedChurch: 0, baptized: 0, notBaptized: 0 };
      }
      if (user.status === 'Aceitou') yearlyReport[year].accepted += 1;
      if (user.status === 'Reconciliado') yearlyReport[year].reconciled += 1;
      if (user.status === 'Deseja trocar de Igreja') yearlyReport[year].changedChurch += 1;
      if (user.batizado === 'Sim') yearlyReport[year].baptized += 1;
      else yearlyReport[year].notBaptized += 1;
    });

    return { monthlyReport, yearlyReport };
  };

  const { monthlyReport, yearlyReport } = groupByMonthAndYear();

  // Abrir WhatsApp com número clicável
  const openWhatsApp = (whatsappNumber: string) => {
    const url = `https://wa.me/${whatsappNumber}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp');
    });
  };

  return (
    <AuthGuard>
      <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Usuários Cadastrados</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={fetchUsers}>
        <Text style={styles.refreshButtonText}>Atualizar</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : (
        <>
          {/* Relatório Mensal */}
          {/* <Text style={styles.reportTitle}>Relatório Mensal</Text>
          {Object.keys(monthlyReport).map((monthYear) => {
            const report = monthlyReport[monthYear];
            return (
              <View key={monthYear} style={styles.reportCard}>
                <Text>{`Mês-Ano: ${monthYear}`}</Text>
                <Text>{`Aceitaram: ${report.accepted}`}</Text>
                <Text>{`Reconciliado: ${report.reconciled}`}</Text>
                <Text>{`Trocaram de Igreja: ${report.changedChurch}`}</Text>
                <Text>{`Batizados: ${report.baptized}`}</Text>
                <Text>{`Não Batizados: ${report.notBaptized}`}</Text>
                <Text>{`Total: ${report.accepted + report.reconciled + report.changedChurch}`}</Text>
              </View>
            );
          })} */}

          {/* Relatório Anual */}
          <Text style={styles.reportTitle}>Relatório Anual</Text>
          {Object.keys(yearlyReport).map((year) => {
            const report = yearlyReport[year];
            return (
              <View key={year} style={styles.reportCard}>
                <Text>{`Ano: ${year}`}</Text>
                <Text>{`Aceitaram: ${report.accepted}`}</Text>
                <Text>{`Reconciliado: ${report.reconciled}`}</Text>
                <Text>{`Troca de Igreja: ${report.changedChurch}`}</Text>
                <Text>{`Batizados: ${report.baptized}`}</Text>
                <Text>{`Não Batizados: ${report.notBaptized}`}</Text>
                <Text>{`Total convite da graça: ${report.accepted + report.reconciled + report.changedChurch}`}</Text>
              </View>
            );
          })}

          {/* Lista de Usuários */}
          {users.map((item) => (
            <View key={item._id} style={styles.card}>
              <Text style={styles.cardText}>Data de Cadastro: {new Date(item.createdAt).toLocaleDateString()}</Text>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>Status: {item.status}</Text>
              <Text style={styles.cardText}>Batizado: {item.batizado ? 'Sim' : 'Não'}</Text>
              <Text
                style={[styles.cardText, styles.clickableText]}
                onPress={() => openWhatsApp(item.whatsapp)}
              >
                WhatsApp: {item.whatsapp}
              </Text>
              <Text style={styles.cardText}>Email: {item.email}</Text>
              <Text style={styles.cardText}>Gênero: {item.gender}</Text>
              <Text style={styles.cardText}>Data de Nascimento: {item.birthdate}</Text>
              <Text style={styles.cardText}>Igreja: {item.igreja}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 16,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF',
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
  card: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    color: '#FFF'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardText: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 4,
  },
  clickableText: {
    color: '#FFF',
    textDecorationLine: 'underline',
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 16,
  },
  reportCard: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    color: '#FFF'
  },
});
