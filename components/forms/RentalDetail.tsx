import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '@/constants';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDressStore } from '@/store/dresses';
import { Rental } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TextBox from '../atoms/TextBox';

interface RentalDetailProps {
    handleHide: () => void;
    rental: Rental;
}

const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
};

const addDays = (dateStr: string, days: number): string => {
    const d = new Date(dateStr + 'T12:00:00');
    d.setDate(d.getDate() + days);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const RentalDetail = ({ handleHide, rental }: RentalDetailProps) => {
    const deleteRental = useDressStore((s) => s.deleteRental);

    const expectedReturnDate = addDays(rental.rental_date, rental.days);

    const [returnDay, setReturnDay] = useState(() => {
        const d = new Date(expectedReturnDate + 'T12:00:00');
        return d.getDate().toString();
    });
    const [returnMonth, setReturnMonth] = useState(() => {
        const d = new Date(expectedReturnDate + 'T12:00:00');
        return (d.getMonth() + 1).toString();
    });
    const [returnYear, setReturnYear] = useState(() => {
        const d = new Date(expectedReturnDate + 'T12:00:00');
        return d.getFullYear().toString();
    });
    const [loading, setLoading] = useState(false);

    const clientDisplay = rental.full_name || rental.client_name || 'Sin cliente';

    const handleReturn = async () => {
        const day = parseInt(returnDay);
        const month = parseInt(returnMonth);
        const year = parseInt(returnYear);

        if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 2020) {
            Toast.show({
                type: 'error',
                text1: 'Fecha invalida',
                text2: 'Ingresa una fecha de devolución valida',
            });
            return;
        }

        const returnDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        setLoading(true);
        try {
            await deleteRental(rental.id, rental.id_dress);
            handleHide();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No fue posible registrar la devolución',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoRow}>
                <MaterialCommunityIcons name="hanger" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>{rental.dress_name}</Text>
            </View>

            <View style={styles.infoRow}>
                <MaterialCommunityIcons name="account" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>{clientDisplay}</Text>
            </View>

            <View style={styles.dateSection}>
                <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>Alquilado el:</Text>
                    <Text style={styles.dateValue}>{formatDate(rental.rental_date)}</Text>
                </View>

                <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>Dias de alquiler:</Text>
                    <Text style={styles.dateValue}>{rental.days}</Text>
                </View>

                <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>Fecha esperada de devolución:</Text>
                    <Text style={[styles.dateValue, styles.expectedDate]}>{formatDate(expectedReturnDate)}</Text>
                </View>
            </View>

            <View style={styles.buttons}>
                <Button mode="outlined" onPress={handleHide} style={styles.cancelButton}>
                    Cancelar
                </Button>
                <Button
                    loading={loading}
                    mode="contained"
                    onPress={handleReturn}
                    style={styles.returnButton}
                >
                    Devolver
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.text,
        marginLeft: 8,
    },
    dateSection: {
        backgroundColor: COLORS.primaryLight + '40',
        borderRadius: 12,
        padding: 14,
        marginTop: 12,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    dateLabel: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    dateValue: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    expectedDate: {
        color: COLORS.primary,
    },
    returnSection: {
        marginTop: 16,
    },
    returnTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 8,
    },
    dateInputRow: {
        flexDirection: 'row',
        gap: 8,
    },
    dateInputWrapper: {
        flex: 1,
    },
    dateInputLabel: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginBottom: 4,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginBottom: 20,
    },
    cancelButton: {
        flex: 1,
        marginRight: 8,
    },
    returnButton: {
        flex: 1,
        marginLeft: 8,
        backgroundColor: COLORS.primary,
    },
});
