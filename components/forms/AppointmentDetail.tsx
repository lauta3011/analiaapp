import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Appointment } from '@/types';
import { COLORS } from '@/constants';
import { useModalStore } from '@/store/modal';

interface AppointmentDetailProps {
    appointment: Appointment;
}

export const AppointmentDetail = ({ appointment }: AppointmentDetailProps) => {
    const router = useRouter();
    const closeModal = useModalStore((s) => s.closeModal);

    const formatTime = (time: string | null) => {
        if (!time) return '--:--';
        return time.substring(0, 5);
    };

    const goToClient = () => {
        if (appointment.id_user) {
            closeModal();
            router.push(`/user/${appointment.id_user}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{appointment.title}</Text>

            <View style={styles.datetimeContainer}>
                <View style={styles.datetimeBadge}>
                    <MaterialCommunityIcons name="calendar-clock" size={16} color={COLORS.primary} />
                    <Text style={styles.datetimeText}>{appointment.date}</Text>
                </View>
                {appointment.time && (
                    <View style={styles.datetimeBadge}>
                        <MaterialCommunityIcons name="clock-outline" size={16} color={COLORS.primary} />
                        <Text style={styles.datetimeText}>{formatTime(appointment.time)}</Text>
                    </View>
                )}
            </View>
            <TouchableOpacity 
                style={styles.infoRow} 
                onPress={goToClient}
                disabled={!appointment.id_user}
            >
                <MaterialCommunityIcons name="account" size={16} color={appointment.id_user ? COLORS.primary : COLORS.textSecondary} />
                <Text style={[styles.clientLink, !appointment.id_user && styles.clientLinkDisabled]}>
                    {appointment.full_name || 'Sin cliente'}
                </Text>
                {appointment.id_user && (
                    <MaterialCommunityIcons name="chevron-right" size={16} color={COLORS.primary} />
                )}
            </TouchableOpacity>

            {appointment.notes ? (
                <View style={styles.notesContainer}>
                    <Text style={styles.notesLabel}>Notas</Text>
                    <Text style={styles.notes}>{appointment.notes}</Text>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    clientLink: {
        fontSize: 15,
        color: COLORS.primary,
        fontWeight: '600',
    },
    clientLinkDisabled: {
        color: COLORS.textSecondary,
    },
    datetimeContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    datetimeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryLight + '20',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 6,
    },
    datetimeText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '500',
    },
    notesContainer: {
        marginTop: 8,
        padding: 12,
        backgroundColor: COLORS.primaryLight + '15',
        borderRadius: 10,
    },
    notesLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    notes: {
        fontSize: 14,
        color: COLORS.text,
        lineHeight: 20,
    },
});
