import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ABC } from '@/constants/alphabteth';
import ListHeading from '@/components/lists/ListHeading';
import FloatingButton from '@/components/atoms/FloatingButton';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{position: 'relative', flex: 1}}>
      <FloatingButton handleAction={() => router.push('/user/addClient')} />

      <View style={styles.headingContainer}>
        <Text style={styles.text}>tus clientes estaran ordenados alfabeticamente segun la inicial de su primer nombre.</Text>
      </View>
      <FlatList keyExtractor={(index) => index.toString()} style={styles.list} data={ABC} renderItem={({item, index}) => 
        <ListHeading letter={item} index={index} />
      }/>      
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    padding: 28,
  },
  heading: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 400
  },
  text: {
    fontSize: 24,
    fontWeight: 200,
    textAlign: 'justify'
  },
  list: {
    width: '100%'
  }
})