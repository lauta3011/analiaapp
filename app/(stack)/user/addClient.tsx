import { ModalForm } from "@/components/forms/ModalForm";
import NewClientForm from "@/components/forms/NewClientForm";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

export default function AddClient() {
    const [showModalForm, setShowModalForm] = useState(false);
    const [modalLabel, setModalLabel] = useState('');
    const [modalType, setModalType] = useState('');

    const handleAddUser = async(form: any) => {
        await postUser(form).then(() => setShowModalForm(false));
    }

    const handleShowModal = (type: string, label: string) => {
        setModalType(type);
        setModalLabel(label);
        setShowModalForm(!showModalForm);
    } 
    return (
        <ScrollView>
            <Text style={{ fontSize: 36, margin: 12, textAlign: 'center' }}>Agrega un nuevo cliente</Text>
            <NewClientForm handleModal={(value: string, label: string) => handleShowModal(value, label)} handleSubmit={(form: any) => handleAddUser(form)} />
            {showModalForm && <ModalForm handleHide={() => setShowModalForm(false)} label={modalLabel} type={modalType} />}
        </ScrollView>
    )
} 