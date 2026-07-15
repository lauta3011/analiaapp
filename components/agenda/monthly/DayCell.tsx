import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, PINK_GRADIENT } from '@/constants';
import { Appointment } from '@/types';

interface DayCellProps {
    day: number;
    date: string;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    appointments: Appointment[];
    onPress: (date: string) => void;
}

const getGradientColor = (count: number): string => {
    if (count === 0) return 'transparent';
    const index = Math.min(count, PINK_GRADIENT.length - 1);
    return PINK_GRADIENT[index];
};

const isDarkBackground = (count: number): boolean => {
    return count >= 4;
};

export const DayCell = ({
    day,
    date,
    isCurrentMonth,
    isToday,
    isSelected,
    appointments,
    onPress,
}: DayCellProps) => {
    const bgColor = getGradientColor(appointments.length);
    const darkBg = isDarkBackground(appointments.length);

    return (
        <TouchableOpacity
            style={[
                styles.cell,
                { backgroundColor: bgColor },
                !isCurrentMonth && styles.otherMonth,
                isToday && styles.today,
                isSelected && !isToday && styles.selected,
            ]}
            onPress={() => onPress(date)}
        >
            <Text
                style={[
                    styles.dayNumber,
                    !isCurrentMonth && styles.otherMonthText,
                    isToday && styles.todayText,
                    isSelected && darkBg && styles.selectedLightText,
                ]}
            >
                {day}
            </Text>
            {appointments.length > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{appointments.length}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        margin: 1,
    },
    dayNumber: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.text,
    },
    otherMonth: {
        opacity: 0.3,
    },
    otherMonthText: {
        color: COLORS.textMuted,
    },
    today: {
        borderWidth: 2,
        borderColor: COLORS.error,
        borderStyle: 'dotted',
    },
    todayText: {
        color: COLORS.error,
        fontWeight: '700',
    },
    selected: {
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    selectedLightText: {
        color: '#fff',
        fontWeight: '700',
    },
    badge: {
        position: 'absolute',
        bottom: 3,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    badgeText: {
        fontSize: 9,
        fontWeight: '700',
        color: '#fff',
    },
});
