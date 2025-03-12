import { FormAtom } from "@/types";
import React from "react";
import { TextInput } from "react-native-paper";

const TextBox = ({ label, value, setValue }: FormAtom<string>) => {
    const handleChange = (value: string) => {
        setValue(value as string); 
    };

    return (
        <TextInput
        label={label}
          mode="outlined"
          value={value}
          onChangeText={handleChange}
        />

    )
}

export default TextBox;