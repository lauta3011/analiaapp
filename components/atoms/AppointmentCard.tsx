import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appointment } from '@/types';

interface AppointmentCardProps {
    appointment: Appointment;
    onDelete: (id: number, date: string) => void;
    onPress?: () => void;
    compact?: boolean;
}

export const AppointmentCard = ({ appointment, onDelete, onPress, compact }: AppointmentCardProps) => {
    const formatTime = (time: string | null) => {
        if (!time) return '';
        return time.substring(0, 5);
    };

    if (compact) {
        return (
            <TouchableOpacity style={styles.compactContainer} onPress={onPress} activeOpacity={0.7}>
                <Text style={[styles.compactClientName, !appointment.full_name && styles.clientNamePlaceholder]} numberOfLines={1}>
                    {appointment.full_name || 'Sin cliente'}
                </Text>
                <Text style={styles.compactTitle} numberOfLines={2}>
                    {appointment.title}
                </Text>
                <Text style={styles.compactTime}>
                    {appointment.time ? formatTime(appointment.time) : ''}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>
                    {appointment.time ? formatTime(appointment.time) : '--:--'}
                </Text>
            </View>

            <View style={styles.content}>
                <Text style={[styles.clientName, !appointment.full_name && styles.clientNamePlaceholder]}>
                    {appointment.full_name || 'Sin cliente'}
                </Text>
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
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 8,
        marginHorizontal: 6,
        marginVertical: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    timeContainer: {
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e8b6c2',
        paddingRight: 8,
        marginRight: 8,
    },
    time: {
        fontSize: 12,
        fontWeight: '600',
        color: '#c8778a',
    },
    content: {
        flex: 1,
    },
    clientName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
    },
    clientNamePlaceholder: {
        color: '#999',
        fontStyle: 'italic',
    },
    title: {
        fontSize: 11,
        color: '#666',
    },
    notes: {
        fontSize: 10,
        color: '#999',
        fontStyle: 'italic',
    },
    deleteButton: {
        padding: 4,
        marginLeft: 4,
    },
    compactContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 8,
        marginHorizontal: 2,
        marginVertical: 1,
        borderLeftWidth: 3,
        borderLeftColor: '#c8778a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    compactClientName: {
        fontSize: 11,
        fontWeight: '600',
        color: '#333',
        marginBottom: 1,
    },
    compactTitle: {
        fontSize: 10,
        color: '#666',
        lineHeight: 13,
    },
    compactTime: {
        fontSize: 9,
        fontWeight: '600',
        color: '#c8778a',
        marginTop: 3,
    },
});
