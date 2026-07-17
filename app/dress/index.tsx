import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { COLORS, DRESS_SWITCH_MODES } from '@/constants';
import { useDressStore } from '@/store/dresses';
import { useModalStore } from '@/store/modal';
import FloatingButton from '@/components/atoms/FloatingButton';
import { DressSwitcher } from '@/components/dress/DressSwitcher';
import { DressSearchBar } from '@/components/dress/DressSearchBar';
import { DressCard } from '@/components/dress/DressCard';
import { Dress } from '@/types';

type SwitchMode = typeof DRESS_SWITCH_MODES[keyof typeof DRESS_SWITCH_MODES];

export default function DressScreen() {
    const { dresses, activeRentals, loadDresses, loadActiveRentals, deleteDress } = useDressStore();
    const openModal = useModalStore((s) => s.openModal);

    const [activeMode, setActiveMode] = useState<SwitchMode>(DRESS_SWITCH_MODES.ALL);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadDresses();
        loadActiveRentals();
    }, []);

    const filteredDresses = useMemo(() => {
        let result = dresses;

        if (activeMode === DRESS_SWITCH_MODES.RENTED) {
            result = result.filter((d) => d.is_available === 0);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter((d) => d.name.toLowerCase().includes(query));
        }

        return result;
    }, [dresses, activeMode, searchQuery]);

    const handlePress = (dress: Dress) => {
        if (dress.is_available === 1) {
            openModal('rental-form', { dress });
        } else {
            const rental = activeRentals.find((r) => r.id_dress === dress.id);
            if (rental) {
                openModal('rental-detail', { rental });
            }
        }
    };

    const handleDelete = (dress: Dress) => {
        Alert.alert(
            'Eliminar vestido',
            `¿Estás seguro de que quieres eliminar "${dress.name}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: () => deleteDress(dress.id) },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.text}>
                    Gestiona tus vestidos, su disponibilidad y alquileres.
                </Text>
            </View>

            <DressSwitcher activeMode={activeMode} onModeChange={setActiveMode} />

            <DressSearchBar value={searchQuery} onChangeText={setSearchQuery} />

            <FlatList
                data={filteredDresses}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <DressCard
                        dress={item}
                        onPress={handlePress}
                        onDelete={handleDelete}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {searchQuery
                                ? 'No se encontraron vestidos'
                                : 'No hay vestidos cargados'}
                        </Text>
                    </View>
                }
            />

            <View style={styles.fabContainer}>
                <FloatingButton handleAction={() => openModal('dress-form')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    listContent: {
        paddingBottom: 80,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.textMuted,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});
