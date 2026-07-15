import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, FlatList } from "react-native";
import { TextInput, Button } from "react-native-paper";
import TextBox from "../atoms/TextBox";
import { useAppointmentStore } from "@/store/appointments";
import { fetchUserByLetter } from "@/database/database";
import Toast from "react-native-toast-message";

interface AppointmentFormProps {
    handleHide: () => void;
    selectedDate: string;
}

export const AppointmentForm = ({ handleHide, selectedDate }: AppointmentFormProps) => {
    const addAppointment = useAppointmentStore((s) => s.addAppointment);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [clients, setClients] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showClientList, setShowClientList] = useState(false);

    const loadClients = async () => {
        const allClients: any[] = [];
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        
        for (const letter of letters) {
            const users = await fetchUserByLetter(letter);
            if (users) {
                allClients.push(...users);
            }
        }
        
        setClients(allClients);
    };

    useEffect(() => {
        loadClients();
    }, []);

    const filteredClients = searchQuery
        ? clients.filter(client => 
            client.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.phone.includes(searchQuery)
          )
        : clients;

    const handleSelectClient = (client: any) => {
        setSelectedClient(client);
        setSearchQuery(client.full_name);
        setShowClientList(false);
    };

    const handleSubmit = async () => {
        if (!selectedClient) {
            Toast.show({
                type: 'error',
                text1: 'Cliente requerido',
                text2: 'Selecciona un cliente para la cita',
            });
            return;
        }

        if (!title.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Título requerido',
                text2: 'Agrega un título para la cita',
            });
            return;
        }

        const appointment = {
            id_user: selectedClient.id,
            date: selectedDate,
            time: time || null,
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
            <Text style={styles.label}>Cliente *</Text>
            <TextInput
                mode="outlined"
                placeholder="Buscar cliente..."
                value={searchQuery}
                onChangeText={(text) => {
                    setSearchQuery(text);
                    setShowClientList(true);
                    if (!text) setSelectedClient(null);
                }}
                onFocus={() => setShowClientList(true)}
                style={styles.input}
            />

            {showClientList && filteredClients.length > 0 && (
                <View style={styles.clientListContainer}>
                    <FlatList
                        data={filteredClients.slice(0, 10)}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.clientItem,
                                    selectedClient?.id === item.id && styles.clientItemSelected
                                ]}
                                onPress={() => handleSelectClient(item)}
                            >
                                <Text style={styles.clientName}>{item.full_name}</Text>
                                <Text style={styles.clientPhone}>{item.phone}</Text>
                            </TouchableOpacity>
                        )}
                        style={styles.clientList}
                    />
                </View>
            )}

            <Text style={styles.label}>Fecha</Text>
            <TextInput
                mode="outlined"
                value={selectedDate}
                disabled
                style={styles.input}
            />

            <Text style={styles.label}>Hora</Text>
            <TextInput
                mode="outlined"
                placeholder="HH:MM (ej: 14:30)"
                value={time}
                onChangeText={setTime}
                keyboardType="numbers-and-punctuation"
                style={styles.input}
            />

            <Text style={styles.label}>Título *</Text>
            <TextInput
                mode="outlined"
                placeholder="Ej: Relleno de pestañas"
                value={title}
                onChangeText={setTitle}
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
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#fff',
    },
    clientListContainer: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginTop: 4,
    },
    clientList: {
        maxHeight: 200,
    },
    clientItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    clientItemSelected: {
        backgroundColor: '#f2d5da',
    },
    clientName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    clientPhone: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
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
        backgroundColor: '#c8778a',
    },
});

export default AppointmentForm;
