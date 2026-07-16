import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useModalStore } from '@/store/modal';
import { AppointmentForm } from '@/components/forms/AppointmentForm';
import { EyelashDraw } from '@/components/forms/EyelashDraw';
import { TagForm } from '@/components/forms/TagForm';
import { NewClientForm } from '@/components/forms/NewClientForm';
import { AppointmentDetail } from '@/components/forms/AppointmentDetail';
import { COLORS } from '@/constants';
import Toast from 'react-native-toast-message';
import ToastConfig from '@/components/atoms/ToastConfig';

const MODAL_TITLES: Record<string, string> = {
    'appointment-form': 'Nueva cita',
    'appointment-detail': 'Detalle de cita',
    'eyelash-session': 'Actualizar sesion',
    'tag-form': 'Agregar',
    'add-client': 'Nuevo cliente',
};

export const AppModal = () => {
    const { modalType, modalProps, closeModal } = useModalStore();

    const renderContent = () => {
        switch (modalType) {
            case 'appointment-form':
                return (
                    <AppointmentForm
                        handleHide={closeModal}
                        selectedDate={modalProps.selectedDate}
                        initialHour={modalProps.initialHour ?? null}
                    />
                );
            case 'appointment-detail':
                return <AppointmentDetail appointment={modalProps.appointment} />;
            case 'eyelash-session':
                return (
                    <EyelashDraw
                        handleHide={closeModal}
                        selectedImage={modalProps.selectedImage}
                        userId={modalProps.userId}
                        confirmForm={() => {
                            modalProps.onConfirm?.();
                            closeModal();
                        }}
                    />
                );
            case 'tag-form':
                return (
                    <TagForm
                        handleHide={closeModal}
                        label={modalProps.label}
                        type={modalProps.type}
                    />
                );
            case 'add-client':
                return <NewClientForm handleHide={closeModal} />;
            default:
                return null;
        }
    };

    return (
        <Modal
            visible={modalType !== null}
            transparent
            animationType="slide"
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            <View style={styles.sheetContainer}>
                <View style={styles.handle} />

                <View style={styles.sheetHeader}>
                    <Text style={styles.sheetTitle}>
                        {modalType ? MODAL_TITLES[modalType] ?? '' : ''}
                    </Text>
                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                        <MaterialCommunityIcons name="close" size={22} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.sheetContent} contentContainerStyle={styles.sheetContentInner} keyboardShouldPersistTaps="handled">
                    {renderContent()}
                </ScrollView>
            </View>

            <Toast config={ToastConfig} visibilityTime={4000} />
        </Modal>
    );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: height * 0.85,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    handle: {
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ddd',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 4,
    },
    sheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primaryLight + '40',
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },
    closeButton: {
        padding: 4,
    },
    sheetContent: {
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    sheetContentInner: {
        paddingBottom: 20,
    },
});
