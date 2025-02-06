import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NameList from "./NameList";

export default function ListHeading(props: any) {
    const [showList, setShowList] = useState(false);
    const isOdd = props.index % 2 == 0 ? true : false;

    return (
        <View>            
            <TouchableOpacity onPress={() => setShowList(!showList)}>
                <View style={{...styles.container, backgroundColor: isOdd ? 'grey' : 'black'}}>
                    <View>
                        <Text style={styles.letter}>{props.letter}</Text>
                    </View>

                </View>
            </TouchableOpacity>

            {showList && <NameList letter={props.letter} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    letter: {
        color: '#fff',
        fontWeight: 200,
        fontSize:64,
    }
})