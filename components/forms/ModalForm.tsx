import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export const ModalForm = (props: any) => {
    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
            <Text style={styles.close} onPress={() => props.handleHide()}>cerrar</Text>
                {props.children}
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
    },
    container: {
        display: 'flex',
        width: 400,
        position: 'relative',
        backgroundColor: 'white',
        boxShadow: '0px 0px 500px 1px',
        borderRadius: 15,
        padding: 15
    },
    close: {
        padding: 10,
        textAlign: 'right',
    }
})