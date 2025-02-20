import NewClientForm from "@/components/NewClientForm";
import React from "react";
import { Text, View } from "react-native";

export default function AddClient() {
    return (
        <View>
            <NewClientForm handleSubmit={(form: any) => console.log('$$$ ',form)} />
        </View>
    )
} 