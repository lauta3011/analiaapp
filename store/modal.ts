import { create } from 'zustand';
import { Appointment } from '@/types';

export type ModalType =
    | 'appointment-form'
    | 'appointment-detail'
    | 'eyelash-session'
    | 'tag-form'
    | 'add-client'
    | 'dress-form'
    | 'rental-form'
    | 'rental-detail'
    | null;

interface ModalState {
    modalType: ModalType;
    modalProps: Record<string, any>;
    openModal: (type: NonNullable<ModalType>, props?: Record<string, any>) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    modalType: null,
    modalProps: {},
    openModal: (type, props = {}) => set({ modalType: type, modalProps: props }),
    closeModal: () => set({ modalType: null, modalProps: {} }),
}));
