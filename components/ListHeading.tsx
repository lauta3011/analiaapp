import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ListHeading(props: any) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.letter}>{props.letter}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        borderBottomWidth: 2
    },
    letter: {
        color: '#fff',
        fontWeight: 200,
        fontSize:64,
    }
})