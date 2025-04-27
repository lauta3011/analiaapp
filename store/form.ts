import { addNewUser } from '@/bff';
import { create } from 'zustand';
 
interface FormStore {
    success: boolean,
    errors: { msg: string | null },
    loading: boolean,
    confirmUser: (form: object) => void,
    resetSuccess: () => void,
    serError: (error: string) => void
}

export const useFormStore = create<FormStore>((set) => ({
    success: false,
    errors: { msg: null },
    loading: false,
    ///// TODO FORM TYPES
    confirmUser: async (form: any) => {
        set({ loading: true });
        const { allergies, characteristics, fullName, phone, picture, notes } = form;
        try {
            await addNewUser({ fullName, phone, picture, notes, allergies, characteristics }).then(() => {
                set({ success: true });
            })
        } catch (error: any) {
            set({ errors: { msg: error.message }})
        } finally {
            set({ loading: false });
        }
    },
    resetSuccess: () => set({ success: false }),
    serError: (error: string) => {
        set({ errors: { msg: error } })
    }
}))