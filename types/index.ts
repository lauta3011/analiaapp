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

export interface Dress {
    id: number;
    name: string;
    image_path: string | null;
    is_available: number;
    rental_cost: number | null;
    dateCreated: string;
}

export interface Rental {
    id: number;
    id_dress: number;
    id_user: number | null;
    client_name: string | null;
    rental_date: string;
    return_date: string | null;
    days: number;
    dateCreated: string;
    dress_name?: string;
    dress_image?: string | null;
    full_name?: string | null;
}