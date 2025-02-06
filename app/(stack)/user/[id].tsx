import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { people } from '@/constants/mockData';

export default function UserDetails() {
  const { id } = useLocalSearchParams();

  const user = people.find((u) => u.id === id);

  // FETCH LAST 10 DATES FROM DB AND DISPLAY 
  // THEM IN ORDER BY MOST RECENTLY

  console.log(user)

  return (
    <View>
      <Text>Esto es la pantalla de detalles de {user?.name}</Text>
    </View>
  );
}
