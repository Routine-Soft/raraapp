import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Importando Ionicons

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Configurando a navbar preta com ícones brancos
        tabBarStyle: {
          backgroundColor: '#000', // Cor preta
        },
        tabBarActiveTintColor: '#fff', // Ícones brancos quando ativos
        tabBarInactiveTintColor: '#fff', // Ícones brancos mesmo quando inativos
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="convertidos"
        options={{
          title: 'Convertidos',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="todosalunos"
        options={{
          title: 'Alunos & Membresia',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
    
  );
}
