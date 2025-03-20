import { FormAtom } from "@/types";
import React from "react";
import { Button } from "react-native-paper";

const CheckButton = ({ icon, label, value, setValue }: FormAtom<boolean>) => {
    const handleChange = () => {
        setValue(!value); 
    };

    return (
        <Button icon={icon || "plus"} mode={value ? "contained" : "elevated"} onPress={handleChange}>
            {label}
        </Button>
    )
}

export default CheckButton;