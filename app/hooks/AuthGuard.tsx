// hooks/AuthGuard.tsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from './useAuth';
import { useRouter } from 'expo-router';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { authenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2cab77" />
      </View>
    );
  }

  if (!authenticated) {
    router.replace('/'); // Redireciona para login
    return null;
  }

  return (<>{children}</>);
}
