import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export default function AddClientButton(props: any) {
    return (
        <IconButton
            icon="plus-circle-outline"
            iconColor="#fff"
            size={30}
            onPress={props.handleAction}
            style={styles.floatingButton}
        />
    );
};
    
const styles = StyleSheet.create({
    floatingButton: {
        zIndex: 10,
        position: 'absolute', // Posicionamiento absoluto para el botón flotante
        bottom: 20, // Espacio desde la parte inferior de la pantalla
        right: 20, // Espacio desde la parte derecha de la pantalla
        width: 60, // Ancho del botón
        height: 60, // Alto del botón
        borderRadius: 30, // Redondear el botón para hacerlo circular
        backgroundColor: '#c8778a',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});
