import ToastConfig from "@/components/atoms/ToastConfig";
import NewClientForm from "@/components/forms/NewClientForm";
import React from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

export default function AddClient() {
    return (
        <View style={{ backgroundColor: '#fff' }}>
            <NewClientForm />
            <Toast config={ToastConfig} visibilityTime={5000} />
        </View>
    )
} 