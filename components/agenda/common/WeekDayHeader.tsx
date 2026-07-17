import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, CALENDAR_LOCALE } from '@/constants';

interface WeekDayHeaderProps {
    firstDayOfWeek?: number;
}

const SHORT_DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export const WeekDayHeader = ({ firstDayOfWeek = 1 }: WeekDayHeaderProps) => {
    const days: string[] = [];
    for (let i = 0; i < 7; i++) {
        days.push(SHORT_DAYS[(firstDayOfWeek + i) % 7]);
    }

    return (
        <View style={styles.container}>
            {days.map((day, index) => (
                <Text key={index} style={styles.day}>
                    {day}
                </Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 8,
    },
    day: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
        paddingVertical: 6,
    },
});
