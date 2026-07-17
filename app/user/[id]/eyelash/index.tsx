import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '@/constants';
import { EyelashDraw } from '@/components/forms/EyelashDraw';

export default function EyelashFormScreen() {
    const { id, appointmentId } = useLocalSearchParams<{ id: string; appointmentId?: string }>();
    const router = useRouter();

    const userId = parseInt(id as string);
    const aptId = appointmentId ? parseInt(appointmentId) : undefined;

    return (
        <View style={styles.container}>
            <EyelashDraw
                handleHide={() => router.back()}
                userId={userId}
                selectedImage={1}
                appointmentId={aptId}
                confirmForm={() => router.back()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
});
