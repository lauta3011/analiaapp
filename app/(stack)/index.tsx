import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ABC } from '@/constants/alphabteth';
import ListHeading from '@/components/ListHeading';
import AddClientButton from '@/components/AddClientButton';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{position: 'relative', flex: 1}}>
      <AddClientButton handleAddClient={() => router.push('/addClient')} />

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>¡Busca tus clientes facilmente!</Text>
        <Text style={styles.subText}>Elige la letra por la que empieza su nombre.</Text>
      </View>
      <FlatList keyExtractor={(index) => index.toString()} style={styles.list} data={ABC} renderItem={({item, index}) => 
        <ListHeading letter={item} index={index} />
      }/>
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    padding: 16,
  },
  heading: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 400
  },
  subText: {
    fontSize: 24,
    fontWeight: '200',
    textAlign: 'justify'
  },
  list: {
    width: '100%'
  }
})