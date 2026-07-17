import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, DRESS_SWITCH_MODES } from '@/constants';

type SwitchMode = typeof DRESS_SWITCH_MODES[keyof typeof DRESS_SWITCH_MODES];

interface DressSwitcherProps {
    activeMode: SwitchMode;
    onModeChange: (mode: SwitchMode) => void;
}

const MODES = [
    { key: DRESS_SWITCH_MODES.ALL, label: 'Todas' },
    { key: DRESS_SWITCH_MODES.RENTED, label: 'Alquiladas' },
];

export const DressSwitcher = ({ activeMode, onModeChange }: DressSwitcherProps) => {
    return (
        <View style={styles.container}>
            {MODES.map((mode) => (
                <TouchableOpacity
                    key={mode.key}
                    style={[
                        styles.button,
                        activeMode === mode.key && styles.activeButton,
                    ]}
                    onPress={() => onModeChange(mode.key)}
                >
                    <Text
                        style={[
                            styles.label,
                            activeMode === mode.key && styles.activeLabel,
                        ]}
                    >
                        {mode.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: COLORS.primaryLight,
        borderRadius: 20,
        padding: 3,
        marginVertical: 10,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 18,
    },
    activeButton: {
        backgroundColor: COLORS.primary,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textSecondary,
    },
    activeLabel: {
        color: '#fff',
        fontWeight: '600',
    },
});
