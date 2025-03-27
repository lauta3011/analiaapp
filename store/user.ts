import { create } from 'zustand';
 
interface ProfileStore {
  fullName: string;
  phone: string;
  photo: string | null;
}

// Creación del store con TypeScript
export const useUserStore = create<ProfileStore>((set) => ({
    fullName: '',
    phone: '',
    photo: ''
}))