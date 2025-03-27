import { FormAtom } from "@/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

const TextBox = ({ label, value, setValue }: FormAtom<string>) => {
    const handleChange = (value: string) => {
        setValue(value as string); 
    };

    return (
        <View style={styles.container}>
            <TextInput
            label={label}
              mode="outlined"
              value={value}
              onChangeText={handleChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8
    }
});

export default TextBox;