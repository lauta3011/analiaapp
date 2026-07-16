import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import TextBox from "../atoms/TextBox";
import ImageInput from "../atoms/ImageInput";
import { useTagsStore } from "@/store/tags";
import { TagsList } from "../lists/TagsList";
import { ALLERGY_INFO, CHARACTERISTIC_INFO, COLORS } from "@/constants";
import { useFormStore } from "@/store/form";
import { Button, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useModalStore } from "@/store/modal";

interface NewClientFormProps {
    handleHide: () => void;
}

export const NewClientForm = ({ handleHide }: NewClientFormProps) => {
  const { allergies, characteristics, setAllergy, setCharacteristic, fetchAllergies, fetchCharacteristics } = useTagsStore();
  const { confirmUser, loading } = useFormStore();
  const openModal = useModalStore((s) => s.openModal);
  const modalType = useModalStore((s) => s.modalType);

  // TODO add types 
  const [person, setPerson] = useState({
    fullName: '',
    phone: '',
    notes: ''
  });
  const [picture, setPicture] = useState('');

  const fetchData = async () => {
    fetchAllergies();
    fetchCharacteristics();
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!person.fullName || !person.phone) {
      Toast.show({
        type: 'error',
        text1: 'Informacion necesaria',
        text2: 'Nombre o Nro de telefono vacios',
      });
      return;
    }

    const formData = {
      ...person,
      picture,
      characteristics: characteristics.filter((item) => item.value === true),
      allergies: allergies.filter((item) => item.value === true)
    };

    const success = await confirmUser(formData);
    if (success) {
      handleHide();
    }
  }

  return (
    <>
      <ScrollView style={styles.container} scrollEnabled={!modalType}>
        <ImageInput selectedImage={(uri: string) => setPicture(uri)} />

        <TextBox number={false} setValue={(value: string) => setPerson((prevForm) => ({ ...prevForm, fullName: value }))} label="* Nombre y apellido" value={person.fullName} />
        <TextBox number={true} setValue={(value: string) => setPerson((prevForm) => ({ ...prevForm, phone: value }))} label="* Nro telefono" value={person.phone} />

        <TagsList type={CHARACTERISTIC_INFO.TYPE} label={CHARACTERISTIC_INFO.LABEL} title={CHARACTERISTIC_INFO.TITLE} subText={CHARACTERISTIC_INFO.SUB_TEXT} list={characteristics} handleAction={(id: number) => setCharacteristic(id)} handleModal={(type: string, label: string) => openModal('tag-form', { type, label })} />
        <TagsList type={ALLERGY_INFO.TYPE} label={ALLERGY_INFO.LABEL} title={ALLERGY_INFO.TITLE} subText={ALLERGY_INFO.SUB_TEXT} list={allergies} handleAction={(id: number) => setAllergy(id)} handleModal={(type: string, label: string) => openModal('tag-form', { type, label })} />

        <View style={styles.notesSection}>
          <Text style={styles.notesHint}>en caso de ser
            necesario tambien puedes agregar una descripcion sobre el usuario en texto plano</Text>
          <TextBox number={false} setValue={(value: string) => setPerson((prevForm) => ({ ...prevForm, notes: value }))} label="nota o detalle por escrito" value={person.notes} />
        </View>

        <View style={styles.buttons}>
          <Button mode="outlined" onPress={handleHide} style={styles.cancelButton}>
            Cancelar
          </Button>
          <Button loading={loading} mode="contained" onPress={() => handleSubmit()} style={styles.submitButton}>
            Agregar usuario
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  notesSection: {
    marginTop: 12,
  },
  notesHint: {
    fontStyle: "italic",
    color: COLORS.textMuted,
    padding: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: COLORS.primary,
  },
});

export default NewClientForm;
