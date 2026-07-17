import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { COLORS } from '@/constants';
import { fetchAppointmentById, fetchDrawingByAppointment, deleteDrawingByAppointment } from '@/database/database';
import { EYELASHES_MAP } from '@/constants/eyelashes';
import Svg, { Path } from 'react-native-svg';
import { ColorValue } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from 'react-native-paper';

type ImageKey = keyof typeof EYELASHES_MAP;

const EYELASH_TYPE_LABELS: Record<number, string> = {
    1: 'Natural',
    2: 'Abierta',
    3: 'Soft',
};

export default function AppointmentDetailScreen() {
    const { id, appointmentId } = useLocalSearchParams<{ id: string; appointmentId: string }>();
    const router = useRouter();

    const [appointment, setAppointment] = useState<any>(null);
    const [drawing, setDrawing] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<number>(1);

    const load = async () => {
        const apt = await fetchAppointmentById(parseInt(appointmentId));
        setAppointment(apt);
        const result = await fetchDrawingByAppointment(parseInt(appointmentId));
        if (result) {
            const parsed = JSON.parse(result.data);
            setDrawing(parsed);
            setSelectedImage(result.type);
        } else {
            setDrawing(null);
        }
    };

    useEffect(() => {
        load();
    }, [appointmentId]);

    useFocusEffect(
        useCallback(() => {
            load();
        }, [appointmentId])
    );

    const formatTime = (time: string | null) => {
        if (!time) return '--:--';
        return time.substring(0, 5);
    };

    const handleDeleteDrawing = useCallback(() => {
        Alert.alert(
            'Eliminar dibujo',
            'Estas seguro de que quieres eliminar este dibujo?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteDrawingByAppointment(parseInt(appointmentId));
                        setDrawing(null);
                        Toast.show({
                            type: 'success',
                            text1: 'Dibujo eliminado',
                        });
                    },
                },
            ]
        );
    }, [appointmentId]);

    if (!appointment) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialCommunityIcons name="arrow-left" size={20} color={COLORS.primary} />
                <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>

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

            {appointment.notes ? (
                <View style={styles.notesContainer}>
                    <Text style={styles.notesLabel}>Notas</Text>
                    <Text style={styles.notes}>{appointment.notes}</Text>
                </View>
            ) : null}

            {!drawing && (
                <View style={styles.eyelashButtonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => router.push({ pathname: `/user/${id}/eyelash`, params: { appointmentId } })}
                        style={styles.eyelashButton}
                        icon={({ size, color }) => (
                            <MaterialCommunityIcons name="eye" size={size} color={color} />
                        )}
                    >
                        Dibujar detalle
                    </Button>
                </View>
            )}

            {drawing && (
                <View style={styles.drawingSection}>
                    <View style={styles.drawingHeader}>
                        <View>
                            <Text style={styles.drawingLabel}>Sesion de pestanas</Text>
                            {EYELASH_TYPE_LABELS[selectedImage] && (
                                <Text style={styles.drawingType}>{EYELASH_TYPE_LABELS[selectedImage]}</Text>
                            )}
                        </View>
                        <TouchableOpacity style={styles.deleteDrawingButton} onPress={handleDeleteDrawing}>
                            <MaterialCommunityIcons name="trash-can-outline" size={20} color={COLORS.error} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drawingWrapper}>
                        <Image
                            source={EYELASHES_MAP[selectedImage as ImageKey]}
                            resizeMode="contain"
                            style={styles.drawingImage}
                        />
                        <Svg style={styles.drawingSvg}>
                            {drawing.map(({ path, color: c, stroke: s }: any, i: number) => (
                                <Path
                                    key={i}
                                    d={`${path.join(' ')}`}
                                    fill="none"
                                    strokeWidth={`${s}px`}
                                    stroke={c as ColorValue}
                                />
                            ))}
                        </Svg>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 16,
        marginBottom: 8,
    },
    backText: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.primary,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    loadingText: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.text,
        marginTop: 16,
        marginBottom: 16,
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
        fontSize: 15,
        color: COLORS.primary,
        fontWeight: '500',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    clientLink: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: '600',
    },
    notesContainer: {
        marginTop: 8,
        padding: 12,
        backgroundColor: COLORS.primaryLight + '15',
        borderRadius: 10,
    },
    notesLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    notes: {
        fontSize: 15,
        color: COLORS.text,
        lineHeight: 20,
    },
    eyelashButtonContainer: {
        marginTop: 16,
    },
    eyelashButton: {
        backgroundColor: COLORS.primary,
    },
    drawingSection: {
        marginTop: 16,
    },
    drawingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    deleteDrawingButton: {
        padding: 4,
    },
    drawingLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    drawingType: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.primary,
        marginBottom: 8,
    },
    drawingWrapper: {
        height: 400,
        width: '100%',
        position: 'relative',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.primaryLight,
        overflow: 'hidden',
    },
    drawingImage: {
        position: 'absolute',
        alignSelf: 'center',
        height: '100%',
    },
    drawingSvg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});
