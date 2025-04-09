import { create } from 'zustand';

interface NameStore {
    names: object[],
}

export const useNameStore = create<NameStore>((set) => ({
    names: [{}]
}))