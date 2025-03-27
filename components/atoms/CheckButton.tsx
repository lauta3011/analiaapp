import { FormAtom } from "@/types";
import React, { useEffect } from "react";
import { Button } from "react-native-paper";

const CheckButton = ({ icon, label, value = false, setValue }: FormAtom<boolean>) => {
    return (
        <Button style={{ maxWidth: 230, margin: 5 }} icon={icon || "plus"} mode={value ? "contained" : "elevated"} onPress={() => setValue()}>
            {label}
        </Button>
    )
}

export default CheckButton;