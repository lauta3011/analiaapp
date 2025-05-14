import { addNewUser } from '@/bff';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';
 
interface FormStore {
    loading: boolean,
    confirmUser: (form: object) => void,
}

export const useFormStore = create<FormStore>((set) => ({
    loading: false,
    ///// TODO FORM TYPES
    confirmUser: async (form: any) => {
        set({ loading: true });
        const { allergies, characteristics, fullName, phone, picture, notes } = form;
        try {
            await addNewUser({ fullName, phone, picture, notes, allergies, characteristics }).then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Usuario agregado',
                    text2: 'La operación se completó con éxito',
                });
            })
        } catch (error: any) {
            Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No fue posible agregar el usuario',
            });
        } finally {
            set({ loading: false });
        }
    },
    serError: (error: string) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
        });
    }
}))