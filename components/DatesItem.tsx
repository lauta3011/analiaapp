import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DatesItem(props: any) {
    return (
        <TouchableOpacity onPress={() => props.handlePress(props.id)}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.date}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: { 
        padding: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc', 
    },
    text: {
        fontSize: 18
    }
})