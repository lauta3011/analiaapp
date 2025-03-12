export interface FormAtom<T> {
    icon?: string,
    label: string,
    value: T, 
    setValue: any, 
    error?: boolean 
}

type SetValue<T> = (value: T) => void;

export interface NewClient {
    fullName: string;
    phone: string;
    allergies: object[];
    otherDetails: string;
  }