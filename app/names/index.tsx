import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ABC } from '@/constants/alphabteth';
import { COLORS } from '@/constants';
import ListHeading from '@/components/lists/ListHeading';
import FloatingButton from '@/components/atoms/FloatingButton';
import { useModalStore } from '@/store/modal';

export default function ClientsScreen() {
  const openModal = useModalStore((s) => s.openModal);

  return (
    <View style={styles.container}>
      <FloatingButton handleAction={() => openModal('add-client')} />

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
    backgroundColor: COLORS.background,
  },
  headingContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '200',
    textAlign: 'justify',
  },
  list: {
    width: '100%',
  },
})
