import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import TextBox from "../atoms/TextBox";
import ImageInput from "../atoms/ImageInput";
import { useTagsStore } from "@/store/tags";
import { TagsList } from "../lists/TagsList";
import { ALLERGY_INFO, CHARACTERISTIC_INFO } from "@/constants";
import { useFormStore } from "@/store/form";
import { Button, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import { ModalForm } from "./ModalForm";
import { TagForm } from "./TagForm";

export const NewClientForm = () => {
  const { allergies, characteristics, setAllergy, setCharacteristic, fetchAllergies, fetchCharacteristics } = useTagsStore();
  const { confirmUser, loading } = useFormStore();

  const [modal, setModal] = useState(false);
  const [modalLabel, setModalLabel] = useState('');
  const [modalType, setModalType] = useState('');

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

  const handleSubmit = () => {
    let formData;
    if (person.fullName && person.phone) {
      formData = {
        ...person,
        picture,
        characteristics: characteristics.filter((item) => item.value === true),
        allergies: allergies.filter((item) => item.value === true)
      }
      confirmUser(formData);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Informacion necesaria',
        text2: 'Nombre o Nro de telefono vacios',
      });
    }
  }

  return (
    <>
      <ScrollView style={{ paddingHorizontal: 25, marginBottom: 25 }} scrollEnabled={!modal}>
        <ImageInput selectedImage={(uri: string) => setPicture(uri)} />

        <TextBox number={false} setValue={(value: string) => setPerson((prevForm) => ({ ...prevForm, fullName: value }))} label="* Nombre y apellido" value={person.fullName} />
        <TextBox number={true} setValue={(value: string) => setPerson((prevForm) => ({ ...prevForm, phone: value }))} label="* Nro telefono" value={person.phone} />

        <TagsList type={CHARACTERISTIC_INFO.TYPE} label={CHARACTERISTIC_INFO.LABEL} title={CHARACTERISTIC_INFO.TITLE} subText={CHARACTERISTIC_INFO.SUB_TEXT} list={characteristics} handleAction={(id: number) => setCharacteristic(id)} handleModal={(type: string, label: string) => { setModal(true); setModalLabel(label); setModalType(type) }} />
        <TagsList type={ALLERGY_INFO.TYPE} label={ALLERGY_INFO.LABEL} title={ALLERGY_INFO.TITLE} subText={ALLERGY_INFO.SUB_TEXT} list={allergies} handleAction={(id: number) => setAllergy(id)} handleModal={(type: string, label: string) => { setModal(true); setModalLabel(label); setModalType(type) }} />

        <View style={{ marginTop: 25 }}>
          <Text style={{ fontStyle: "italic", color: 'grey', padding: 5 }}>en caso de ser
            necesario tambien puedes agregar una descripcion sobre el usuario en texto plano</Text>
          <TextBox number={false} setValue={(value: string) => setPerson((prevForm) => ({ ...prevForm, notes: value }))} label="nota o detalle por escrito" value={person.notes} />
        </View>

        <Button style={{ margin: 40 }} loading={loading} mode="text" onPress={() => handleSubmit()}>agregar usuario</Button>
      </ScrollView>

      {modal && <ModalForm handleHide={() => setModal(false)}>
        <TagForm handleHide={() => setModal(false)} label={modalLabel} type={modalType} />
      </ModalForm>
      }
    </>
  );
};

export default NewClientForm;
