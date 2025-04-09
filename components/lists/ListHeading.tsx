import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NameList from "./NameList";
import { fetchUserByLetter } from "@/database/database";

export default function ListHeading(props: any) {
    const [showList, setShowList] = useState(false);
    const [filteredNames, setFilteredNames] = useState([]);
    const isOdd = props.index % 2 == 0 ? true : false;

    useEffect(() => {
        async function fetchNames() {
            const data: any = await fetchUserByLetter(props.letter);
            setFilteredNames(data);
        }

        if (showList) {
            fetchNames();
        }
    }, [showList])

    return (
        <View>            
            <TouchableOpacity onPress={() => setShowList(!showList)}>
                <View style={{...styles.container, backgroundColor: isOdd ? 'grey' : 'black'}}>
                    <View>
                        <Text style={styles.letter}>{props.letter}</Text>
                    </View>

                </View>
            </TouchableOpacity>

            {showList && <NameList filteredNames={filteredNames} />}
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