import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export const NotificationPopup = (props: any) => {
    const message = props.msg ?? (props.isError ? 'error desconocido' : 'accion completada con exito');

    const styles = StyleSheet.create({
        popup: {
            backgroundColor: props.isError ? 'red': 'green' ,
            zIndex: 10,
            width: '100%',
            marginTop: 25,
            display: 'flex',
            alignItems: 'center',
            padding: 8,
        },
        text: {
            color: 'white',
            fontWeight: 'bold'
        }
    })

    return (
        <View style={styles.popup}>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

