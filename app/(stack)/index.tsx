import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ABC } from '@/constants/alphabteth';
import ListHeading from '@/components/ListHeading';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>¡Busca tus clientes facilmente!</Text>
        <Text style={styles.subText}>Elige la letra por la que empieza su nombre.</Text>
      </View>
      <FlatList style={styles.list} data={ABC} renderItem={(letter) => <ListHeading letter={letter.item} />}/>
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    padding: 16
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