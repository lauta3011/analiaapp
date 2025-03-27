import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import TextBox from "../atoms/TextBox";
import ImageInput from "../atoms/ImageInput";
import { useTagsStore } from "@/store/tags";
import { TagsList } from "../lists/TagsList";
import { ALLERGY_INFO, CHARACTERISTIC_INFO } from "@/constants";

export const NewClientForm = (props: any) => {
  const { loading, error, allergies, characteristics, setAllergy, setCharacteristic, fetchAllergies, fetchCharacteristics } = useTagsStore();

  // TODO add types 
  const [person, setPerson] = useState({
    fullName: '',
    phone: '',
    photo: ''
  });

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
        characteristics: characteristics.filter((item) => item.value === true),
        allergies: allergies.filter((item) => item.value === true),
      }
      console.log('$$ ', formData)
      return;
    }
  }
  
  return (
    <View style={styles.container}>
        <ImageInput />

        <TextBox setValue={(value: string) => setPerson((prevForm) => ({...prevForm, fullName: value}))} label="* Nombre y apellido" value={person.fullName} />
        <TextBox setValue={(value: string) => setPerson((prevForm) => ({...prevForm, phone: value}))} label="* Nro telefono" value={person.phone} />

        <TagsList type={CHARACTERISTIC_INFO.TYPE} label={CHARACTERISTIC_INFO.LABEL} title={CHARACTERISTIC_INFO.TITLE} subText={CHARACTERISTIC_INFO.SUB_TEXT} list={characteristics} handleAction={(id: number) => setCharacteristic(id)} handleModal={(type: string, label: string) => props.handleModal(type, label)} />
        <TagsList type={ALLERGY_INFO.TYPE} label={ALLERGY_INFO.LABEL} title={ALLERGY_INFO.TITLE} subText={ALLERGY_INFO.SUB_TEXT} list={allergies} handleAction={(id: number) => setAllergy(id)} handleModal={(type: string, label: string) => props.handleModal(type, label)} />
        
        {error && <View style={styles.error}><Text style={{color: 'white', fontWeight: 'bold'}}>Hay campos vacios</Text></View>}

        <Button  loading={loading} mode="contained-tonal" onPress={() => { handleSubmit() }} style={{ marginTop: 20 }}>agregar cliente</Button>
    </View>
  );
};

const styles = StyleSheet.create({
    error: {
      margin: 15,
      display: 'flex',
      alignItems: 'center',
      padding: 8,
      backgroundColor: 'red'
    },
    container: {
      padding: 40,
    }
})

export default NewClientForm;
