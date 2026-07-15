import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '@/constants';
import { Appointment } from '@/types';
import { AppointmentCard } from '@/components/atoms/AppointmentCard';

interface DayColumnProps {
    dayName: string;
    dayNumber: number;
    date: string;
    isToday: boolean;
    appointments: Appointment[];
    onDeleteAppointment: (id: number, date: string) => void;
}

export const DayColumn = ({
    dayName,
    dayNumber,
    date,
    isToday,
    appointments,
    onDeleteAppointment,
}: DayColumnProps) => {
    return (
        <View style={[styles.container, isToday && styles.todayContainer]}>
            <View style={[styles.header, isToday && styles.todayHeader]}>
                <Text style={[styles.dayName, isToday && styles.todayText]}>{dayName}</Text>
                <Text style={[styles.dayNumber, isToday && styles.todayText]}>{dayNumber}</Text>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {appointments.length > 0 ? (
                    appointments.map((apt) => (
                        <View key={apt.id} style={styles.cardWrapper}>
                            <AppointmentCard
                                appointment={apt}
                                onDelete={onDeleteAppointment}
                            />
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>-</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: COLORS.primaryLight,
    },
    todayContainer: {
        backgroundColor: COLORS.primaryLight + '30',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primaryLight,
    },
    todayHeader: {
        backgroundColor: COLORS.primary,
    },
    dayName: {
        fontSize: 11,
        fontWeight: '500',
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
    },
    dayNumber: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
    },
    todayText: {
        color: '#fff',
    },
    scroll: {
        flex: 1,
        paddingVertical: 4,
    },
    cardWrapper: {
        paddingHorizontal: 2,
        marginBottom: 4,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    emptyText: {
        color: COLORS.textMuted,
        fontSize: 12,
    },
});
