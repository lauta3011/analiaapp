import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";
import { useAppointmentStore } from "@/store/appointments";
import Toast from "react-native-toast-message";
import { COLORS } from "@/constants";
import { Text } from "react-native";
import { ClientSearch } from "../molecules/ClientSearch";

interface AppointmentFormProps {
    handleHide: () => void;
    selectedDate: string;
    initialHour: number | null;
}

export const AppointmentForm = ({ handleHide, selectedDate, initialHour }: AppointmentFormProps) => {
    const addAppointment = useAppointmentStore((s) => s.addAppointment);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [time, setTime] = useState(initialHour !== null ? `${initialHour.toString().padStart(2, '0')}:00` : '');
    const [notes, setNotes] = useState('');
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [noClient, setNoClient] = useState(false);

    const handleTimeChange = (text: string) => {
        const digits = text.replace(/[^0-9]/g, '');
        
        if (digits.length <= 2) {
            setTime(digits);
        } else if (digits.length <= 4) {
            setTime(`${digits.slice(0, 2)}:${digits.slice(2)}`);
        } else {
            setTime(`${digits.slice(0, 2)}:${digits.slice(2, 4)}`);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Título requerido',
                text2: 'Agrega un título para la cita',
            });
            return;
        }

        if (!time.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Hora requerida',
                text2: 'Selecciona una hora para la cita',
            });
            return;
        }

        if (!selectedClient && !noClient) {
            Toast.show({
                type: 'error',
                text1: 'Cliente requerido',
                text2: 'Selecciona un cliente o marca "Sin cliente"',
            });
            return;
        }

        const appointment = {
            id_user: selectedClient?.id || null,
            date: selectedDate,
            time: time.trim(),
            title: title.trim(),
            notes: notes.trim() || null
        };

        setLoading(true);
        const success = await addAppointment(appointment);
        setLoading(false);
        if (success) {
            handleHide();
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.clientFieldContainer}>
                <Text style={styles.label}>Título *</Text>
                <TextInput
                    mode="outlined"
                    placeholder="Ej: Relleno de pestañas"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />

                <ClientSearch
                    selectedClient={selectedClient}
                    onSelectClient={(client) => {
                        setSelectedClient(client);
                        setNoClient(false);
                    }}
                    onClearClient={() => setSelectedClient(null)}
                    disabled={noClient}
                />

                <TouchableOpacity 
                    style={styles.checkboxRow}
                    onPress={() => {
                        setNoClient(!noClient);
                        if (!noClient) {
                            setSelectedClient(null);
                        }
                    }}
                    activeOpacity={0.7}
                >
                    <Checkbox
                        status={noClient ? 'checked' : 'unchecked'}
                        color={COLORS.primary}
                    />
                    <Text style={styles.checkboxLabel}>Sin cliente</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Hora</Text>
            <TextInput
                mode="outlined"
                placeholder="HH:MM (ej: 14:30)"
                value={time}
                onChangeText={handleTimeChange}
                keyboardType="numeric"
                maxLength={5}
                style={styles.input}
            />

            <Text style={styles.label}>Fecha</Text>
            <TextInput
                mode="outlined"
                value={selectedDate}
                disabled
                style={styles.input}
            />

            <Text style={styles.label}>Notas</Text>
            <TextInput
                mode="outlined"
                placeholder="Notas adicionales..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                style={styles.input}
            />

            <View style={styles.buttons}>
                <Button mode="outlined" onPress={handleHide} style={styles.cancelButton}>
                    Cancelar
                </Button>
                <Button 
                    mode="contained" 
                    onPress={handleSubmit} 
                    loading={loading}
                    disabled={loading}
                    style={styles.submitButton}
                >
                    Agendar
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    clientFieldContainer: {
        position: 'relative',
        zIndex: 1,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#fff',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    checkboxLabel: {
        fontSize: 15,
        color: COLORS.text,
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

export default AppointmentForm;
