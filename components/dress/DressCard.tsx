import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@/constants';
import { Dress } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const placeholder = require('@/assets/images/placeholder.png');

interface DressCardProps {
    dress: Dress;
    onPress: (dress: Dress) => void;
    onDelete: (dress: Dress) => void;
}

export const DressCard = ({ dress, onPress, onDelete }: DressCardProps) => {
    const isAvailable = dress.is_available === 1;

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(dress)} activeOpacity={0.7}>
            <View style={styles.imageContainer}>
                {dress.image_path ? (
                    <Image source={{ uri: dress.image_path }} style={styles.image} />
                ) : (
                    <Image source={placeholder} style={styles.image} />
                )}
            </View>

            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{dress.name}</Text>
                {dress.rental_cost != null && (
                    <Text style={styles.cost}>${dress.rental_cost}</Text>
                )}
                <View style={[styles.badge, isAvailable ? styles.badgeAvailable : styles.badgeRented]}>
                    <Text style={[styles.badgeText, isAvailable ? styles.badgeTextAvailable : styles.badgeTextRented]}>
                        {isAvailable ? 'Disponible' : 'Alquilado'}
                    </Text>
                </View>
            </View>

            {isAvailable && (
                <TouchableOpacity onPress={() => onDelete(dress)} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete-outline" size={20} color={COLORS.error} />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 16,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: COLORS.primaryLight,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    cost: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        marginTop: 4,
    },
    badgeAvailable: {
        backgroundColor: '#e6f7f0',
    },
    badgeRented: {
        backgroundColor: COLORS.primaryLight,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
    badgeTextAvailable: {
        color: COLORS.success,
    },
    badgeTextRented: {
        color: COLORS.primary,
    },
    deleteButton: {
        padding: 8,
    },
});
