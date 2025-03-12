import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { people, mockDates } from '@/constants/mockData';
import DatesItem from '@/components/lists/DatesItem';
import UserInfo from '@/components/UserInfo';

export default function UserDetails() {
  const { id } = useLocalSearchParams();

  const user = people.find((u) => u.id === id);

  return (
    <View>
      <UserInfo name={user?.name} age={user?.age} phone={user?.phone} image={user?.image} />

      <FlatList keyExtractor={(item) => item.id.toString()} data={mockDates} renderItem={({ item }) => 
        <DatesItem id={item.id} date={item.date} handlePress={(id: number) => router.push(`/user/${id}/${item.id}`)} />
      }/>
    </View>
  );
}