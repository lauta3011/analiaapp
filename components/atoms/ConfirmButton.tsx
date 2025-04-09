import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export const ConfirmButton = (props: any) => {
    return (
        <View style={styles.container}>
            <Button loading={props.loading} mode="text" onPress={() => props.handleSubmit()} style={{ marginTop: 20 }}>{props.label}</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        borderTopWidth: 1,
        borderTopColor: 'lightgray'
    }
})