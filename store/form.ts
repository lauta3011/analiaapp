import { addNewUser } from '@/bff';
import { create } from 'zustand';
 
interface FormStore {
    success: boolean,
    errors: { msg: string | null },
    loading: boolean,
    confirmUser: (form: object) => void,
    serError: (error: string) => void
}

export const useFormStore = create<FormStore>((set) => ({
    success: false,
    errors: { msg: null },
    loading: false,
    ///// TODO FORM TYPES
    confirmUser: async (form: any) => {
        set({ loading: true });
        const { allergies, characteristics, fullName, phone, picture } = form;
        try {
            await addNewUser({ fullName, phone, picture, allergies, characteristics }).then(() => {
                set({ success: true });
            })
        } catch (error: any) {
            set({ errors: { msg: error.message }})
        } finally {
            set({ loading: false });
        }
    },
    serError: (error: string) => {
        set({ errors: { msg: error } })
    }
}))