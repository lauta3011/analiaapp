import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { COLORS } from "@/constants";

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
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});
