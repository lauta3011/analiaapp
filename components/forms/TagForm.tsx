import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextBox from "../atoms/TextBox";
import { Button } from "react-native-paper";
import { useTagsStore } from "@/store/tags";
import { COLORS } from "@/constants";

export const TagForm = (props: any) => {
    const { loading, addNewTag } = useTagsStore();
    const [newItem, setNewItem] = useState('');

    const handleAdd = async () => {
        if (newItem) {
            await addNewTag(newItem, props.type).then(() => props.handleHide());
        }
    }

    return (
        <>
            <Text style={styles.title}>{`Agregar ${props.label}`}</Text>
            <TextBox number={false} setValue={(value: string) => setNewItem(value)} label={`nombre de ${props.label}`} value={newItem} />
            <View style={styles.buttons}>
                <Button mode="outlined" onPress={() => props.handleHide()} style={styles.cancelButton}>
                    Cancelar
                </Button>
                <Button loading={loading} icon={"plus"} mode="contained" onPress={() => handleAdd()} style={styles.submitButton}>
                    Agregar
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
        marginTop: 12,
        marginBottom: 4,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 30,
    },
    cancelButton: {
        flex: 1,
        marginRight: 8,
    },
    submitButton: {
        flex: 1,
        marginLeft: 8,
        backgroundColor: COLORS.primary,
    },
});