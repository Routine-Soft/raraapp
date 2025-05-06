// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar se está verificando o token
  const [authenticated, setAuthenticated] = useState(false); // Estado se o usuário está logado
  const router = useRouter();

  useEffect(() => {
    async function verifyToken() {
      const token = await AsyncStorage.getItem('token'); // Tenta buscar o token salvo

      if (!token) {
        // Se não existir token, redireciona pro login
        console.log('Token não existe')
        setAuthenticated(false);
        setIsLoading(false);
        // router.replace('/'); // aqui
        return;
      }

      try {
        const decoded: any = jwtDecode(token); // Decodifica o token sem precisar da secretKey
        const now = Date.now() / 1000; // Tempo atual em segundos

        if (decoded.exp && decoded.exp < now) {
          // Se expirou, remove e redireciona
          console.log('Token expirou')
          await AsyncStorage.removeItem('token');
          setAuthenticated(false);
          // router.replace('/');
        } else {
          // Token válido
          console.log('Token válido')
          setAuthenticated(true);
        }
      } catch (error) {
        // Erro ao decodificar: remove token e redireciona
        console.log('Erro ao decodificar Token')
        await AsyncStorage.removeItem('token');
        setAuthenticated(false);
        // router.replace('/');
      }

      setIsLoading(false); // Finaliza o carregamento
    }

    verifyToken();
  }, []);

  return { authenticated, isLoading };
}
