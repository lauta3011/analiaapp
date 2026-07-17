import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '@/constants';
import { Appointment } from '@/types';
import { AppointmentCard } from '@/components/atoms/AppointmentCard';
import { useModalStore } from '@/store/modal';

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
    const openModal = useModalStore((s) => s.openModal);

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
                                onPress={() => openModal('appointment-detail', { appointment: apt })}
                                compact
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
        width: 140,
        borderRightWidth: 1,
        borderRightColor: COLORS.primaryLight,
    },
    todayContainer: {
        backgroundColor: COLORS.primaryLight + '20',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primaryLight,
    },
    todayHeader: {
        borderWidth: 2,
        borderColor: COLORS.error,
        borderStyle: 'dotted',
        borderRadius: 6,
        marginHorizontal: 2,
        marginTop: 2,
    },
    dayName: {
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
    },
    dayNumber: {
        fontSize: 19,
        fontWeight: '600',
        color: COLORS.text,
    },
    todayText: {
        color: COLORS.error,
        fontWeight: '700',
    },
    scroll: {
        flex: 1,
        paddingVertical: 2,
    },
    cardWrapper: {
        paddingHorizontal: 2,
        marginBottom: 2,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    emptyText: {
        color: COLORS.textMuted,
        fontSize: 14,
    },
});
