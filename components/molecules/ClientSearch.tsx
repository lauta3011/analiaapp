import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchUsersBySearch } from '@/database/database';
import { COLORS } from '@/constants';

const DEBOUNCE_MS = 300;

interface ClientSearchProps {
    selectedClient: any;
    onSelectClient: (client: any) => void;
    onClearClient: () => void;
    disabled?: boolean;
    label?: string;
}

export const ClientSearch = ({
    selectedClient,
    onSelectClient,
    onClearClient,
    disabled = false,
    label = 'Cliente',
}: ClientSearchProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredClients, setFilteredClients] = useState<any[]>([]);
    const [showList, setShowList] = useState(false);
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
            setShowList(false);
            onClearClient();
            return;
        }

        debounceTimer.current = setTimeout(async () => {
            const results = await fetchUsersBySearch(text.trim());
            setFilteredClients(results);
            setShowList(true);
        }, DEBOUNCE_MS);
    };

    const handleSelectClient = (client: any) => {
        onSelectClient(client);
        setSearchQuery(client.full_name);
        setShowList(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                placeholder="Buscar cliente..."
                placeholderTextColor={COLORS.textMuted}
                value={selectedClient && !searchQuery ? selectedClient.full_name : searchQuery}
                onChangeText={handleSearch}
                editable={!disabled}
                style={[styles.input, disabled && styles.inputDisabled]}
            />

            {showList && filteredClients.length > 0 && (
                <View style={styles.listContainer}>
                    {filteredClients.map((client) => (
                        <TouchableOpacity
                            key={client.id.toString()}
                            style={styles.clientItem}
                            onPress={() => handleSelectClient(client)}
                        >
                            <Text style={styles.clientName}>{client.full_name}</Text>
                            <Text style={styles.clientPhone}>{client.phone}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        borderWidth: 1,
        borderColor: COLORS.primaryLight,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        color: COLORS.text,
    },
    inputDisabled: {
        backgroundColor: COLORS.primaryLight,
        color: COLORS.textMuted,
    },
    listContainer: {
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
    clientName: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
    },
    clientPhone: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
});
