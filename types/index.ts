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
    id_user: number;
    date: string;
    time: string | null;
    title: string;
    notes: string | null;
    status: string;
    full_name: string;
}