import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { ABC } from '@/constants/alphabteth';
import { COLORS } from '@/constants';
import ListHeading from '@/components/lists/ListHeading';
import FloatingButton from '@/components/atoms/FloatingButton';
import { useModalStore } from '@/store/modal';
import { DressSearchBar } from '@/components/dress/DressSearchBar';
import { fetchUsersBySearch } from '@/database/database';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ClientsScreen() {
  const openModal = useModalStore((s) => s.openModal);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const search = async () => {
      if (searchQuery.trim().length >= 2) {
        const results = await fetchUsersBySearch(searchQuery.trim());
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    };
    search();
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <View style={styles.container}>
      <FloatingButton handleAction={() => openModal('add-client')} />

      <View style={styles.headingContainer}>
        <Text style={styles.text}>Tus clientes ordenados alfabéticamente según la inicial de su primer nombre.</Text>
      </View>

      <DressSearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {isSearching ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Link href={{ pathname: '/user/[id]', params: { id: item.id } }} asChild>
              <Pressable>
                <View style={styles.resultItem}>
                  <Text style={styles.resultName}>{item.full_name}</Text>
                  <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.text} />
                </View>
              </Pressable>
            </Link>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No se encontraron clientes</Text>
          }
        />
      ) : (
        <FlatList
          keyExtractor={(index) => index.toString()}
          style={styles.list}
          data={ABC}
          renderItem={({ item, index }) => (
            <ListHeading letter={item} index={index} />
          )}
        />
      )}
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
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryLight,
  },
  resultName: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.text,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
});
