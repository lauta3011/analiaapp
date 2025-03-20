import { ModalForm } from "@/components/forms/ModalForm";
import NewClientForm from "@/components/forms/NewClientForm";
import { postUser } from "@/services/database";
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function AddClient() {
    const [showModalForm, setShowModalForm] = useState(false);
    const [modalLabel, setModalLabel] = useState('');
    const [modalType, setModalType] = useState('');

    const handleAddUser = (form: any) => {
        postUser(form);
    }

    const handleAddItem = (item: string, type: string) => {
        console.log(item, type)
    }

    const handleShowModal = (type: string, label: string) => {
        setModalType(type);
        setModalLabel(label);
        setShowModalForm(!showModalForm);
    } 
    return (
        <View>
            <Text style={{ fontSize: 36, margin: 12, textAlign: 'center' }}>Agrega un nuevo cliente</Text>
            <NewClientForm handleAddDetailForm={(value: string, label: string) => handleShowModal(value, label)} handleSubmit={(form: any) => handleAddUser(form)} />
            {showModalForm && <ModalForm handleAddItem={(item: string, type: string) => handleAddItem(item, type)} handleHide={() => setShowModalForm(false)} label={modalLabel} type={modalType} />}
        </View>
    )
} 