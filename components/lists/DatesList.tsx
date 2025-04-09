import React from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import DatesItem from "./DatesItem";

export const DatesList = (props: any) => {
    const { dates } = props;
    return (
        <View>
            {dates.length <= 0 && 
                <View style={{ height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>este usuario no tiene consultas previas</Text>
                </View> 
            }

            {dates.length > 0 && 
                <View style={{ height: '100%' }}>
                    <FlatList keyExtractor={(item: any) => item.id.toString()} data={dates} renderItem={({ item }: any) => 
                        <DatesItem id={item.id} date={item.date} handlePress={(id: number) => console.log('aaaaaa ', id)} />
                    }/>     
                </View>
            } 
        </View>
    )
}