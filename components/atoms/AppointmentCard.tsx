import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appointment } from '@/types';
import { COLORS } from '@/constants';

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
                <View style={styles.compactTopRow}>
                    <Text style={styles.compactTitle} numberOfLines={1}>
                        {appointment.title}
                    </Text>
                </View>
                <View style={styles.compactBottomRow}>
                    {appointment.date && (
                        <Text style={styles.compactDate} numberOfLines={1}>{appointment.date}</Text>
                    )}
                    {appointment.time && (
                        <Text style={styles.compactTime} numberOfLines={1}>{formatTime(appointment.time)}</Text>
                    )}
                </View>
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
                <MaterialCommunityIcons name="trash-can-outline" size={20} color={COLORS.error} />
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
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: COLORS.primaryDark,
        paddingRight: 8,
        marginRight: 8,
    },
    time: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },
    content: {
        flex: 1,
    },
    clientName: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    clientNamePlaceholder: {
        color: COLORS.textMuted,
        fontStyle: 'italic',
    },
    title: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    notes: {
        fontSize: 12,
        color: COLORS.textMuted,
        fontStyle: 'italic',
    },
    deleteButton: {
        padding: 4,
        marginLeft: 4,
    },
    compactContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginHorizontal: 2,
        marginVertical: 4,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.primary,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    compactTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    compactTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        flex: 1,
    },
    compactBottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    compactDate: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    compactTime: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.primary,
    },
});
