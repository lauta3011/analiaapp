import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@/constants';
import { Appointment } from '@/types';
import { AppointmentCard } from '@/components/atoms/AppointmentCard';
import { useModalStore } from '@/store/modal';

interface HourRowProps {
    hour: number;
    isCurrentHour: boolean;
    appointments: Appointment[];
    onDeleteAppointment: (id: number, date: string) => void;
    onAddAppointment: (hour: number) => void;
}

const formatHour = (hour: number): string => {
    return `${hour.toString().padStart(2, '0')}:00`;
};

export const HourRow = ({
    hour,
    isCurrentHour,
    appointments,
    onDeleteAppointment,
    onAddAppointment,
}: HourRowProps) => {
    const openModal = useModalStore((s) => s.openModal);

    return (
        <View style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={[styles.time, isCurrentHour && styles.currentTime]}>{formatHour(hour)}</Text>
            </View>

            <View style={styles.content}>
                {isCurrentHour && <View style={styles.nowMarker} />}
                {appointments.length > 0 ? (
                    appointments.map((apt) => (
                        <AppointmentCard
                            key={apt.id}
                            appointment={apt}
                            onDelete={onDeleteAppointment}
                            onPress={() => openModal('appointment-detail', { appointment: apt })}
                        />
                    ))
                ) : (
                    <TouchableOpacity
                        style={styles.emptySlot}
                        onPress={() => onAddAppointment(hour)}
                    >
                        <Text style={styles.emptyText}>+</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        minHeight: 60,
    },
    timeContainer: {
        width: 50,
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingTop: 12,
    },
    time: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textMuted,
    },
    currentTime: {
        color: COLORS.error,
        fontWeight: '700',
    },
    content: {
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: COLORS.primaryLight,
        paddingLeft: 10,
        paddingVertical: 4,
    },
    nowMarker: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        borderTopWidth: 2,
        borderTopColor: COLORS.error,
        borderStyle: 'dotted',
    },
    emptySlot: {
        flex: 1,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.primaryLight,
        borderStyle: 'dashed',
    },
    emptyText: {
        fontSize: 20,
        color: COLORS.primaryLight,
        fontWeight: '300',
    },
});
