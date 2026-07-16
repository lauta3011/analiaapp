import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants';

interface DateNavigationProps {
    label: string;
    onPrev: () => void;
    onNext: () => void;
    onToday?: () => void;
}

export const DateNavigation = ({ label, onPrev, onNext, onToday }: DateNavigationProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPrev} style={styles.arrow}>
                <MaterialCommunityIcons name="chevron-left" size={28} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onToday} style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onNext} style={styles.arrow}>
                <MaterialCommunityIcons name="chevron-right" size={28} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
        paddingHorizontal: 16,
    },
    arrow: {
        padding: 4,
    },
    labelContainer: {
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 17,
        fontWeight: '600',
        color: COLORS.text,
        textTransform: 'capitalize',
    },
});
