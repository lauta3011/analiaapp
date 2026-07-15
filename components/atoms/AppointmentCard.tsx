import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appointment } from '@/types';

interface AppointmentCardProps {
    appointment: Appointment;
    onDelete: (id: number, date: string) => void;
}

export const AppointmentCard = ({ appointment, onDelete }: AppointmentCardProps) => {
    const formatTime = (time: string | null) => {
        if (!time) return '';
        return time.substring(0, 5);
    };

    return (
        <View style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>
                    {appointment.time ? formatTime(appointment.time) : '--:--'}
                </Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.clientName}>{appointment.full_name}</Text>
                <Text style={styles.title}>{appointment.title}</Text>
                {appointment.notes ? (
                    <Text style={styles.notes} numberOfLines={2}>
                        {appointment.notes}
                    </Text>
                ) : null}
            </View>

            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => onDelete(appointment.id, appointment.date)}
            >
                <MaterialCommunityIcons name="trash-can-outline" size={20} color="#c73e3e" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 10,
        marginVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    timeContainer: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e8b6c2',
        paddingRight: 10,
        marginRight: 10,
    },
    time: {
        fontSize: 14,
        fontWeight: '600',
        color: '#c8778a',
    },
    content: {
        flex: 1,
    },
    clientName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    title: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    notes: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
    deleteButton: {
        padding: 6,
        marginLeft: 8,
    },
});
