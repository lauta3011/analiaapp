import { ALLERGY_INFO, CHARACTERISTIC_INFO } from '@/constants';
import { 
    fetchAllergies as fetchAllergiesDB,
    fetchCharacteristics as fetchCharacteristicsDB, 
    fetchSingleAllergy as fetchSingleAllergyDB, 
    fetchSingleCharacteristic as fetchSingleCharacteristicDB, 
    postAllergy, 
    postCharacteristic 
} from '@/database/database';
import { create } from 'zustand';

interface Tags {
    id: number,
    name: string,
    value: boolean
}

interface TagsStore {
    allergies: Tags[];
    characteristics: Tags[];
    loading: boolean;
    error: string | null;
    addNewTag: (item: string, type: string) => Promise<void>;
    setAllergy: (id: number) => void;
    setCharacteristic:  (id: number) => void;
    fetchAllergies: () => Promise<void>;
    fetchCharacteristics: () => Promise<void>;
}

export const useTagsStore = create<TagsStore>((set) => ({
    allergies: [],
    characteristics: [],
    loading: false,
    error: null,
    
    addNewTag: async(item, type) => {
        set({ loading: true });
        try {
            if (type === ALLERGY_INFO.TYPE) {
                await postAllergy(item).then(async (id) => {
                    if (id) {
                        const allergy: any = await fetchSingleAllergyDB(id);
                        set((state) => ({ 
                            allergies: [...state.allergies, ...allergy]
                        }));
                    }
                });
            } else if (type === CHARACTERISTIC_INFO.TYPE) {
                await postCharacteristic(item).then(async (id) => {
                    if (id) {
                        const characteristic: any = await fetchSingleCharacteristicDB(id);
                        const aux = { ...characteristic, value: true };
                        set((state) => ({ 
                            characteristics: [...state.characteristics, ...characteristic]
                        }));
                    }
                });
            }
        } catch (error) {
            console.log('error ', error)
        } finally {
            set({ loading: false });
        }
    },
    setAllergy: (id: number) => {
        set((state) => ({
            allergies: state.allergies.map((allergy) => allergy.id === id ? { ...allergy, value: !allergy.value } : allergy)
        }))
    },
    setCharacteristic: (id: number) => {
        set((state) => ({
            characteristics: state.characteristics.map((characteristic) => characteristic.id === id ? { ...characteristic, value: !characteristic?.value } : characteristic)
        }))
    },
    fetchAllergies: async () => {
        set({ loading: true });
        try {
            const allergies: any = await fetchAllergiesDB();
            const aux = [];

            for(const alergy of allergies) {
                aux.push({ ...alergy, value: false});
            }

            set({ allergies: aux, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch allergies', loading: false });
        }
    },
    fetchCharacteristics: async () => {
        set({ loading: true });
        try {
            const characteristics: any = await fetchCharacteristicsDB();
            set({ characteristics, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch characteristics', loading: false });
        } finally {
            set({ loading: false });
        }
    }
}));