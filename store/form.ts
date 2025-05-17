import { addNewUser } from '@/bff';
import { updateUser } from '@/database/database';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';
 
interface FormStore {
    loading: boolean,
    confirmUser: (form: object) => void,
    updateUser: (form: object) => Promise<boolean>
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
    updateUser: async (form: any) => {
        set({ loading: true });
        const { userID: id, full_name, notes, phone, picture_path } = form;
        try {
            await updateUser({ id, full_name, notes, phone, picture_path }).then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Usuario agregado',
                    text2: 'La operación se completó con éxito',
                });
            })
            return true;
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No fue posible agregar el usuario',
            });
            return false;
        } finally {
            set({ loading: false });
        }
    }
}))