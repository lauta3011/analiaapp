import {
    fetchAppointmentsForDate as fetchAppointmentsForDateDB,
    fetchAppointmentsForMonth as fetchAppointmentsForMonthDB,
    postAppointment as postAppointmentDB,
    deleteAppointment as deleteAppointmentDB
} from '@/database/database';
import { Appointment } from '@/types';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';

const loadedMonths = new Set<string>();

const dateToString = (timestamp: number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getMonthKey = (dateStr: string): string => {
    return dateStr.substring(0, 7);
};

const loadMonthIfNeeded = async (monthKey: string): Promise<Record<string, Appointment[]>> => {
    if (loadedMonths.has(monthKey)) return {};

    const [year, month] = monthKey.split('-').map(Number);
    const appointments: any = await fetchAppointmentsForMonthDB(year, month);
    const newItems: Record<string, Appointment[]> = {};

    appointments.forEach((apt: Appointment) => {
        if (!newItems[apt.date]) {
            newItems[apt.date] = [];
        }
        newItems[apt.date].push(apt);
    });

    loadedMonths.add(monthKey);
    return newItems;
};

interface AppointmentStore {
    items: Record<string, Appointment[]>;
    selected: string;
    loadItemsForMonth: (year: number, month: number) => Promise<void>;
    loadItemsForDate: (date: string) => Promise<void>;
    loadItemsForDateRange: (startDate: string, endDate: string) => Promise<void>;
    addAppointment: (appointment: any) => Promise<boolean>;
    deleteAppointment: (id: number, date: string) => Promise<void>;
    setSelected: (date: string) => void;
    refreshMonth: (dateStr: string) => Promise<void>;
}

const getTodayString = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
    items: {},
    selected: getTodayString(),

    loadItemsForMonth: async (year: number, month: number) => {
        const monthStr = month.toString().padStart(2, '0');
        const monthKey = `${year}-${monthStr}`;
        const newItems = await loadMonthIfNeeded(monthKey);

        if (Object.keys(newItems).length > 0) {
            set({ items: { ...get().items, ...newItems } });
        }
    },

    loadItemsForDate: async (date: string) => {
        const monthKey = getMonthKey(date);
        const newItems = await loadMonthIfNeeded(monthKey);

        if (Object.keys(newItems).length > 0) {
            set({ items: { ...get().items, ...newItems } });
        }
    },

    loadItemsForDateRange: async (startDate: string, endDate: string) => {
        const startMonth = getMonthKey(startDate);
        const endMonth = getMonthKey(endDate);
        const monthsToLoad = new Set<string>();

        let current = startMonth;
        while (current <= endMonth) {
            if (!loadedMonths.has(current)) {
                monthsToLoad.add(current);
            }
            const [y, m] = current.split('-').map(Number);
            const next = m === 12 ? `${y + 1}-01` : `${y}-${(m + 1).toString().padStart(2, '0')}`;
            current = next;
        }

        const allNewItems: Record<string, Appointment[]> = {};
        for (const mk of monthsToLoad) {
            const items = await loadMonthIfNeeded(mk);
            Object.assign(allNewItems, items);
        }

        if (Object.keys(allNewItems).length > 0) {
            set({ items: { ...get().items, ...allNewItems } });
        }
    },

    refreshMonth: async (dateStr: string) => {
        const monthKey = getMonthKey(dateStr);
        loadedMonths.delete(monthKey);
        const newItems = await loadMonthIfNeeded(monthKey);
        set({ items: { ...get().items, ...newItems } });
    },

    addAppointment: async (appointment: any) => {
        try {
            await postAppointmentDB(appointment);
            await get().refreshMonth(appointment.date);

            Toast.show({
                type: 'success',
                text1: 'Cita creada',
                text2: 'La cita se agendó correctamente',
            });
            return true;
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No fue posible crear la cita',
            });
            return false;
        }
    },

    deleteAppointment: async (id: number, date: string) => {
        try {
            await deleteAppointmentDB(id);
            await get().refreshMonth(date);

            Toast.show({
                type: 'success',
                text1: 'Cita eliminada',
                text2: 'La cita fue eliminada',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No fue posible eliminar la cita',
            });
        }
    },

    setSelected: (date: string) => {
        set({ selected: date });
    }
}));
