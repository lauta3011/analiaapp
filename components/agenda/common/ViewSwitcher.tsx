import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, VIEW_MODES } from '@/constants';

type ViewMode = typeof VIEW_MODES[keyof typeof VIEW_MODES];

interface ViewSwitcherProps {
    activeView: ViewMode;
    onViewChange: (view: ViewMode) => void;
}

const VIEWS = [
    { key: VIEW_MODES.DAILY, label: 'Diario' },
    { key: VIEW_MODES.WEEKLY, label: 'Semanal' },
    { key: VIEW_MODES.MONTHLY, label: 'Mensual' },
];

export const ViewSwitcher = ({ activeView, onViewChange }: ViewSwitcherProps) => {
    return (
        <View style={styles.container}>
            {VIEWS.map((view) => (
                <TouchableOpacity
                    key={view.key}
                    style={[
                        styles.button,
                        activeView === view.key && styles.activeButton,
                    ]}
                    onPress={() => onViewChange(view.key)}
                >
                    <Text
                        style={[
                            styles.label,
                            activeView === view.key && styles.activeLabel,
                        ]}
                    >
                        {view.label}
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
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 18,
    },
    activeButton: {
        backgroundColor: COLORS.primary,
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.textSecondary,
    },
    activeLabel: {
        color: '#fff',
        fontWeight: '600',
    },
});
