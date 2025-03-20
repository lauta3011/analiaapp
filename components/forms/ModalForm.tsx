import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import TextBox from "../atoms/TextBox";

export const ModalForm = (props: any) => {
    const [newItem, setNewItem] = useState('');

    const handleAdd = () => {
        if (newItem) {
            props.handleAddItem(newItem, props.type);
        }
    }
    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.text}>{`Agregar ${props.modalLabel}`}</Text>
                <TextBox setValue={(value: string) => setNewItem(value)} label={props.modalLabel} value={newItem} />
                <View style={styles.button}>
                    <Button icon={"plus"} mode={"contained"} onPress={() => handleAdd()}>
                        {`agrergar ${props.modalLabel}`}
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