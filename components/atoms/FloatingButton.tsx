import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function AddClientButton(props: any) {
    return (
        <TouchableOpacity onPress={props.handleAction} style={styles.floatingButton} >
            <Icon name="pluscircleo" size={30} color="#fff" />
        </TouchableOpacity>
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
        backgroundColor: '#FF6347',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});
