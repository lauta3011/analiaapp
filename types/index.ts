export interface FormAtom<T> {
    icon?: string,
    label: string,
    value?: T, 
    setValue: any, 
    error?: boolean, 
    number?: boolean
}

export interface NewClient {
    fullName: string;
    phone: string;
    allergies: object[];
    otherDetails: string;
  }

export interface Appointment {
    id: number;
    id_user: number | null;
    date: string;
    time: string | null;
    title: string;
    notes: string | null;
    full_name: string | null;
}