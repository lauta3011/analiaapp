import {
    fetchAllDresses as fetchAllDressesDB,
    fetchActiveRentals as fetchActiveRentalsDB,
    fetchAllRentals as fetchAllRentalsDB,
    deleteDress as deleteDressDB,
    deleteRental as deleteRentalDB,
} from '@/database/database';
import { Dress, Rental } from '@/types';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';

let dressesLoaded = false;
let rentalsLoaded = false;

interface DressStore {
    dresses: Dress[];
    activeRentals: Rental[];
    loadDresses: () => Promise<void>;
    loadActiveRentals: () => Promise<void>;
    deleteDress: (id: number) => Promise<void>;
    deleteRental: (rentalId: number, dressId: number) => Promise<void>;
    markDressAdded: () => void;
    markRentalAdded: () => void;
}

export const useDressStore = create<DressStore>((set, get) => ({
    dresses: [],
    activeRentals: [],

    loadDresses: async () => {
        if (dressesLoaded) return;
        try {
            const dresses = await fetchAllDressesDB() as Dress[];
            set({ dresses });
            dressesLoaded = true;
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No fue posible cargar los vestidos',
            });
        }
    },

    loadActiveRentals: async () => {
        try {
            const activeRentals = await fetchActiveRentalsDB() as Rental[];
            set({ activeRentals });
            rentalsLoaded = true;
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No fue posible cargar los alquileres',
            });
        }
    },

    markDressAdded: () => {
        dressesLoaded = false;
        get().loadDresses();
    },

    markRentalAdded: () => {
        dressesLoaded = false;
        rentalsLoaded = false;
        get().loadDresses();
        get().loadActiveRentals();
    },

    deleteDress: async (id: number) => {
        try {
            await deleteDressDB(id);
            dressesLoaded = false;
            rentalsLoaded = false;
            await get().loadDresses();
            await get().loadActiveRentals();

            Toast.show({
                type: 'success',
                text1: 'Vestido eliminado',
                text2: 'El vestido fue eliminado',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No fue posible eliminar el vestido',
            });
        }
    },

    deleteRental: async (rentalId: number, dressId: number) => {
        try {
            await deleteRentalDB(rentalId, dressId);
            dressesLoaded = false;
            rentalsLoaded = false;
            await get().loadDresses();
            await get().loadActiveRentals();

            Toast.show({
                type: 'success',
                text1: 'Alquiler devuelto',
                text2: 'El vestido fue devuelto correctamente',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No fue posible registrar la devolución',
            });
        }
    },
}));
