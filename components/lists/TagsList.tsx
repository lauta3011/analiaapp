import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import CheckButton from "../atoms/CheckButton";
import { Button, Text } from "react-native-paper";

export const TagsList = (props: any) => {
    const { list, title, subText, handleModal, handleAction, type, label } = props;

    useEffect(() => { }, [list])
    return (
        <View style={styles.innerContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.subHeading}>{title}</Text>
                <Text style={styles.subText}>{subText}</Text>
            </View>

            <View style={styles.listContainer}>
                {list.map((item: any, index: number) => {
                return (
                    <CheckButton key={index} setValue={() => handleAction(item.id)} label={item.name} value={item.value} />
                )
                })}
                <View style={{ margin: 5}}>
                    <Button icon="account-edit-outline" mode="outlined" onPress={() => handleModal(type, label)} >{`agregar ${label}`}</Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        marginTop: 12
    },
    subText: {
        fontStyle: "italic",
        color: 'grey',
        padding: 5
    },
    subHeading: {
        fontSize: 23,
        fontWeight: 'thin'
      },
    innerContainer: {
        marginTop: 10
    },
    listContainer: {
        display:'flex',
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
        buttonContainer: {
        flexGrow: 3,
        margin: 5,
    } 
})