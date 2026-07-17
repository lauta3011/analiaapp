import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants';

interface DressSearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
}

export const DressSearchBar = ({ value, onChangeText }: DressSearchBarProps) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="magnify" size={20} color={COLORS.textMuted} />
            <TextInput
                style={styles.input}
                placeholder="Buscar por nombre..."
                placeholderTextColor={COLORS.textMuted}
                value={value}
                onChangeText={onChangeText}
                returnKeyType="search"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 12,
        height: 44,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 1,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: COLORS.text,
        marginLeft: 8,
        padding: 0,
    },
});
