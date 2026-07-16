import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";
import { useAppointmentStore } from "@/store/appointments";
import { fetchUsersBySearch } from "@/database/database";
import Toast from "react-native-toast-message";
import { COLORS } from "@/constants";

interface AppointmentFormProps {
    handleHide: () => void;
    selectedDate: string;
    initialHour: number | null;
}

const DEBOUNCE_MS = 300;

export const AppointmentForm = ({ handleHide, selectedDate, initialHour }: AppointmentFormProps) => {
    const addAppointment = useAppointmentStore((s) => s.addAppointment);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [time, setTime] = useState(initialHour !== null ? `${initialHour.toString().padStart(2, '0')}:00` : '');
    const [notes, setNotes] = useState('');
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [noClient, setNoClient] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredClients, setFilteredClients] = useState<any[]>([]);
    const [showClientList, setShowClientList] = useState(false);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, []);

    const handleSearch = (text: string) => {
        setSearchQuery(text);

        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (!text.trim()) {
            setFilteredClients([]);
            setShowClientList(false);
            setSelectedClient(null);
            return;
        }

        debounceTimer.current = setTimeout(async () => {
            const results = await fetchUsersBySearch(text.trim());
            setFilteredClients(results);
            setShowClientList(true);
        }, DEBOUNCE_MS);
    };

    const handleSelectClient = (client: any) => {
        setSelectedClient(client);
        setNoClient(false);
        setSearchQuery(client.full_name);
        setShowClientList(false);
    };

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

                <Text style={styles.label}>Cliente</Text>
                <TextInput
                    mode="outlined"
                    placeholder="Buscar cliente..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    disabled={noClient}
                    style={styles.input}
                />

                <TouchableOpacity 
                    style={styles.checkboxRow}
                    onPress={() => {
                        setNoClient(!noClient);
                        if (!noClient) {
                            setSelectedClient(null);
                            setSearchQuery('');
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

                {showClientList && filteredClients.length > 0 && (
                    <View style={styles.clientListContainer}>
                        {filteredClients.map((client) => (
                            <TouchableOpacity
                                key={client.id.toString()}
                                style={[
                                    styles.clientItem,
                                    selectedClient?.id === client.id && styles.clientItemSelected
                                ]}
                                onPress={() => handleSelectClient(client)}
                            >
                                <Text style={styles.clientName}>{client.full_name}</Text>
                                <Text style={styles.clientPhone}>{client.phone}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
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
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#fff',
    },
    clientListContainer: {
        position: 'absolute',
        top: 56,
        left: 0,
        right: 0,
        maxHeight: 200,
        borderWidth: 1,
        borderColor: COLORS.primaryLight,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 10,
    },
    clientItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primaryLight,
    },
    clientItemSelected: {
        backgroundColor: COLORS.primaryLight,
    },
    clientName: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    clientPhone: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    checkboxLabel: {
        fontSize: 14,
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
