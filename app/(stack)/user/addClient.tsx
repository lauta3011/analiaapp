import NewClientForm from "@/components/forms/NewClientForm";
import { postUser } from "@/services/database";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function AddClient() {
    const handleAddUser = (name: string, phone: string) => {
        console.log('confirmo')
        postUser({name, phone});
    }
    return (
        <View>
            <Text style={{ fontSize: 36, margin: 12, textAlign: 'center' }}>Agrega un nuevo cliente</Text>
            <NewClientForm handleSubmit={(form: any) => handleAddUser(form.fullName, form.phone)} />
        </View>
    )
} 