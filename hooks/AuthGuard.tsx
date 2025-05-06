import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from './useAuth';
import { useRouter } from 'expo-router';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { authenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authenticated) {
      router.replace('/');
    }
  }, [authenticated, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2cab77" />
      </View>
    );
  }

  if (!authenticated) {
    return null; // Evita render enquanto redireciona
  }

  return <>{children}</>;
}
