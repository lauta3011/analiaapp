import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import TextBox from "../atoms/TextBox";
import { useTagsStore } from "@/store/tags";

export const ModalForm = (props: any) => {
    const { loading, addNewTag } = useTagsStore();
    const [newItem, setNewItem] = useState('');

    const handleAdd = async () => {
        if (newItem) {
            await addNewTag(newItem, props.type).then(() => props.handleHide());
        }
    }
    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.text}>{`Agregar ${props.label}`}</Text>
                <TextBox number={false} setValue={(value: string) => setNewItem(value)} label={`nombre de ${props.label}`} value={newItem} />
                <View style={styles.button}>
                    <Button loading={loading} icon={"plus"} mode={"contained"} onPress={() => handleAdd()}>
                        agregar
                    </Button>
                </View>
                <View style={styles.button}>
                    <Button mode={"text"} onPress={() => props.handleHide()}>
                        {`cancelar`}
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    container: {
        display: 'flex',
        width: '65%',
        position: 'relative',
        backgroundColor: 'white',
        boxShadow: '0px 0px 500px 1px',
        borderRadius: 15,
        padding: 15
    },
    text: {
        fontSize: 28,
        margin: 5
    },
    button: {
        marginTop: 10
    }
})