import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ABC } from '@/constants/alphabteth';
import ListHeading from '@/components/lists/ListHeading';
import FloatingButton from '@/components/atoms/FloatingButton';
import db from '@/services/database';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{position: 'relative', flex: 1}}>
      <FloatingButton handleAction={() => router.push('/user/addClient')} />

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>¡Encontra tus clientes facilmente!</Text>
        <Text style={styles.subText}>Estaran ordenados alfabeticamente segun la inicial de su primer nombre.</Text>
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
    fontWeight: 200,
    textAlign: 'justify'
  },
  list: {
    width: '100%'
  }
})