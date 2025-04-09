import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import TextBox from "../atoms/TextBox";
import ImageInput from "../atoms/ImageInput";
import { useTagsStore } from "@/store/tags";
import { TagsList } from "../lists/TagsList";
import { ALLERGY_INFO, CHARACTERISTIC_INFO } from "@/constants";
import { useFormStore } from "@/store/form";
import { ConfirmButton } from "../atoms/ConfirmButton";
import { NotificationPopup } from "./NotificationPopup";
import { Text } from "react-native-paper";

export const NewClientForm = (props: any) => {
  const { allergies, characteristics, setAllergy, setCharacteristic, fetchAllergies, fetchCharacteristics } = useTagsStore();
  const { serError, confirmUser, loading: formLoading, errors, success } = useFormStore();
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
      serError('');
      formData = {
        ...person,
        picture,
        characteristics: characteristics.filter((item) => item.value === true),
        allergies: allergies.filter((item) => item.value === true),
      }
      confirmUser(formData);
    } else {
      serError('hay campos vacios');
    }
  }
  
  return (
    <View style={styles.container}>
        <ImageInput selectedImage={(uri: string) => setPicture(uri)} />

        <TextBox number={false} setValue={(value: string) => setPerson((prevForm) => ({...prevForm, fullName: value}))} label="* Nombre y apellido" value={person.fullName} />
        <TextBox number={true} setValue={(value: string) => setPerson((prevForm) => ({...prevForm, phone: value}))} label="* Nro telefono" value={person.phone} />

        <TagsList type={CHARACTERISTIC_INFO.TYPE} label={CHARACTERISTIC_INFO.LABEL} title={CHARACTERISTIC_INFO.TITLE} subText={CHARACTERISTIC_INFO.SUB_TEXT} list={characteristics} handleAction={(id: number) => setCharacteristic(id)} handleModal={(type: string, label: string) => props.handleModal(type, label)} />
        <TagsList type={ALLERGY_INFO.TYPE} label={ALLERGY_INFO.LABEL} title={ALLERGY_INFO.TITLE} subText={ALLERGY_INFO.SUB_TEXT} list={allergies} handleAction={(id: number) => setAllergy(id)} handleModal={(type: string, label: string) => props.handleModal(type, label)} />
        
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontStyle: "italic", color: 'grey', padding: 5 }}>en caso de ser
              necesario tambien puedes agregar una descripcion sobre el usuario en texto plano</Text>
          <TextBox number={false} setValue={(value: string) => setPerson((prevForm) => ({...prevForm, notes: value}))} label="nota o detalle por escrito" value={person.notes} />
        </View>

        {errors.msg && <NotificationPopup isError={true} msg={errors.msg} />}
        {success && <NotificationPopup isError={false} />}
        <ConfirmButton loading={formLoading} handleSubmit={() => handleSubmit()} label="agregar cliente" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 40,
    }
})

export default NewClientForm;
