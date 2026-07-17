import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import TextBox from '../atoms/TextBox';
import ImageInput from '../atoms/ImageInput';
import { COLORS } from '@/constants';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addNewDress } from '@/bff';
import { useDressStore } from '@/store/dresses';

interface DressFormProps {
    handleHide: () => void;
}

export const DressForm = ({ handleHide }: DressFormProps) => {
    const markDressAdded = useDressStore((s) => s.markDressAdded);

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [rentalCost, setRentalCost] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Informacion necesaria',
                text2: 'El nombre del vestido es requerido',
            });
            return;
        }

        setLoading(true);
        try {
            await addNewDress({
                name: name.trim(),
                image,
                rental_cost: rentalCost ? parseFloat(rentalCost) : null,
            });
            markDressAdded();
            handleHide();
            Toast.show({
                type: 'success',
                text1: 'Vestido creado',
                text2: 'El vestido se agrego correctamente',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No fue posible crear el vestido',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ImageInput selectedImage={(uri: string) => setImage(uri)} />

            <TextBox
                number={false}
                setValue={(value: string) => setName(value)}
                label="* Nombre del vestido"
                value={name}
            />

            <TextBox
                number={true}
                setValue={(value: string) => setRentalCost(value)}
                label="Costo de alquiler ($)"
                value={rentalCost}
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
                    Agregar vestido
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
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
