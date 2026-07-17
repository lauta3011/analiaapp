import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TextBox from '../atoms/TextBox';
import { COLORS } from '@/constants';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { addNewRental } from '@/bff';
import { useDressStore } from '@/store/dresses';
import { Dress } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ClientSearch } from '../molecules/ClientSearch';

interface RentalFormProps {
    handleHide: () => void;
    dress: Dress;
}

export const RentalForm = ({ handleHide, dress }: RentalFormProps) => {
    const markRentalAdded = useDressStore((s) => s.markRentalAdded);

    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [clientName, setClientName] = useState('');
    const [days, setDays] = useState('1');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!days || parseInt(days) < 1) {
            Toast.show({
                type: 'error',
                text1: 'Informacion necesaria',
                text2: 'La cantidad de dias es requerida',
            });
            return;
        }

        if (!selectedClient && !clientName.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Informacion necesaria',
                text2: 'Selecciona un cliente o ingresa un nombre',
            });
            return;
        }

        const today = new Date();
        const rentalDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

        setLoading(true);
        try {
            await addNewRental({
                id_dress: dress.id,
                id_user: selectedClient?.id || null,
                client_name: selectedClient ? null : clientName.trim(),
                rental_date: rentalDate,
                days: parseInt(days),
            });
            markRentalAdded();
            handleHide();
            Toast.show({
                type: 'success',
                text1: 'Alquiler registrado',
                text2: `${dress.name} fue alquilado correctamente`,
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No fue posible registrar el alquiler',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.dressInfo}>
                <MaterialCommunityIcons name="hanger" size={24} color={COLORS.primary} />
                <Text style={styles.dressName}>{dress.name}</Text>
            </View>

            <ClientSearch
                selectedClient={selectedClient}
                onSelectClient={setSelectedClient}
                onClearClient={() => setSelectedClient(null)}
            />

            {!selectedClient && (
                <TextBox
                    number={false}
                    setValue={(value: string) => setClientName(value)}
                    label="O nombre del cliente (sin registro)"
                    value={clientName}
                />
            )}

            <TextBox
                number={true}
                setValue={(value: string) => setDays(value)}
                label="* Dias de alquiler"
                value={days}
            />

            <View style={styles.buttons}>
                <Button mode="outlined" onPress={handleHide} style={styles.cancelButton}>
                    Cancelar
                </Button>
                <Button
                    loading={loading}
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.submitButton}
                >
                    Registrar alquiler
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    dressInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryLight,
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    dressName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginLeft: 8,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 30,
    },
    cancelButton: {
        flex: 1,
        marginRight: 8,
    },
    submitButton: {
        flex: 1,
        marginLeft: 8,
        backgroundColor: COLORS.primary,
    },
});
