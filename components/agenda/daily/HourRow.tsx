import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@/constants';
import { Appointment } from '@/types';
import { AppointmentCard } from '@/components/atoms/AppointmentCard';

interface HourRowProps {
    hour: number;
    appointments: Appointment[];
    onDeleteAppointment: (id: number, date: string) => void;
    onAddAppointment: (hour: number) => void;
}

const formatHour = (hour: number): string => {
    return `${hour.toString().padStart(2, '0')}:00`;
};

export const HourRow = ({
    hour,
    appointments,
    onDeleteAppointment,
    onAddAppointment,
}: HourRowProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{formatHour(hour)}</Text>
            </View>

            <View style={styles.content}>
                {appointments.length > 0 ? (
                    appointments.map((apt) => (
                        <AppointmentCard
                            key={apt.id}
                            appointment={apt}
                            onDelete={onDeleteAppointment}
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
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textMuted,
    },
    content: {
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: COLORS.primaryLight,
        paddingLeft: 10,
        paddingVertical: 4,
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
