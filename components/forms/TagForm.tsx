import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextBox from "../atoms/TextBox";
import { Button } from "react-native-paper";
import { useTagsStore } from "@/store/tags";

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
            <Text style={styles.text}>{`Agregar ${props.label}`}</Text>
            <TextBox number={false} setValue={(value: string) => setNewItem(value)} label={`nombre de ${props.label}`} value={newItem} />
            <View style={styles.buttons}>
                <Button mode={"text"} onPress={() => props.handleHide()}>
                    {`cancelar`}
                </Button>
                <Button loading={loading} icon={"plus"} mode={"contained"} onPress={() => handleAdd()}>
                    agregar
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        margin: 5
    },
    buttons: {
        margin: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});