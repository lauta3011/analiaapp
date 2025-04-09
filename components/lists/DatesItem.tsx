import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

export default function DatesItem(props: any) {
    return (
        <Pressable onPress={() => props.handlePress(props.id)}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.date}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: { 
        padding: 10, 
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    text: {
        fontSize: 20
    }
})