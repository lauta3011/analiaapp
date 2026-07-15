import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ABC } from '@/constants/alphabteth';
import ListHeading from '@/components/lists/ListHeading';
import FloatingButton from '@/components/atoms/FloatingButton';

export default function ClientsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FloatingButton handleAction={() => router.push('/user/addClient')} />

      <View style={styles.headingContainer}>
        <Text style={styles.text}>Tus clientes ordenados alfabéticamente según la inicial de su primer nombre.</Text>
      </View>
      <FlatList keyExtractor={(index) => index.toString()} style={styles.list} data={ABC} renderItem={({item, index}) => 
        <ListHeading letter={item} index={index} />
      }/>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative', 
    flex: 1, 
    backgroundColor:'white'
  },
  headingContainer: {
    backgroundColor: '#c8778a',
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  text: {
    fontSize: 20,
    color: '#ffff',
    fontWeight: 200,
    textAlign: 'justify'
  },
  list: {
    width: '100%'
  }
})
