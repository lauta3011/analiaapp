import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import TextBox from "../atoms/TextBox";
import CheckButton from "../atoms/CheckButton";

import ImageInput from "../atoms/ImageInput";

const NewClientForm = (props: any) => {
  const [person, setPerson] = useState({
    fullName: '',
    phone: '',
    photo: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [details, setDetails] = useState([
    { field: "lentes", value: false },
    { field: "lentes-de-contacto", value: false} 
  ]);

  const [other, setOther] = useState([
    { field: "moho", value: false}, 
    { field: "animales", value: false }
  ])

  const handleCheckDetail = (value: boolean, index: number) => {
    const auxDetails = [...details];
    auxDetails[index].value = value;
    setDetails(auxDetails);
  }

  const handleCheckOther = (value: boolean, index: number) => {
    const auxOther = [...other];
    auxOther[index].value = value;
    setOther(auxOther);
  }
  
  const handleSubmit = () => {
    let formData;

    if (person.fullName && person.phone) {
      formData = {
        ...person,
        details: details,
        other: other
      }

      props.handleSubmit(formData);
      return;
    }
    
    setIsLoading(false);
    setIsError(true);
  }

  return (
    <ScrollView style={styles.container}>
        <ImageInput src={person.photo} handleChange={(value: string) => setPerson((prevForm) => ({...prevForm, photo: value}))} />

        <TextBox setValue={(value: string) => setPerson((prevForm) => ({...prevForm, fullName: value}))} label="* Nombre y apellido" value={person.fullName} />
        <TextBox setValue={(value: string) => setPerson((prevForm) => ({...prevForm, phone: value}))} label="* Nro telefono" value={person.phone} />

        <View style={styles.innerContainer}>
          <Text style={styles.subHeading}>Caracteristicas</Text>
          <Text style={styles.helpeTxt}>uso de lentes, productos para los ojos o alguna medicacion particular que creas puede ser relevante saber</Text>

          <View style={styles.listContainer}>
            {details.map((item: any, index) => {
              return (
                <View key={index} style={styles.buttonContainer}>
                  <CheckButton setValue={(value: boolean) => handleCheckDetail(value, index)} label={item.field} value={item.value} />
                </View>
              )
            })}
          </View>

          <View style={styles.buttonContainer}>
            <CheckButton icon="account-edit-outline" setValue={() => console.log('agrega alergia')} label="agregar alergia" value={false} />
          </View>
        </View>
        
        <View style={styles.innerContainer}>
            <Text style={styles.subHeading}>Alergias</Text>
            <Text style={styles.helpeTxt}>ya sea a productos basado en experiencias pasadas o reacciones alergicas que consideres relevantes</Text>

            <View style={styles.listContainer}>
              {other.map((item: any, index) => {
                return (
                  <View key={index} style={styles.buttonContainer}>
                    <CheckButton setValue={(value: boolean) => handleCheckOther(value, index)} label={item.field} value={item.value} />
                  </View>
                )
              })}
          </View>

          <View style={styles.buttonContainer}>
            <CheckButton icon="account-edit-outline" setValue={() => console.log('agrega alergia')} label="agregar alergia" value={false} />
          </View>

        </View>
        
        {isError && <View style={styles.error}><Text style={{color: 'white', fontWeight: 'bold'}}>Hay campos vacios</Text></View>}
        <Button loading={isLoading} mode="outlined" onPress={() => { setIsLoading(true); setIsError(false); handleSubmit() }} style={{ marginTop: 20 }}>agregar cliente</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    subHeading: {
      fontSize: 23,
      fontWeight: 'thin'
    },
    error: {
      margin: 15,
      display: 'flex',
      alignItems: 'center',
      padding: 8,
      backgroundColor: 'red'
    },
    container: {
      padding: 18
    },
    helpeTxt: {
      fontStyle: "italic",
      color: 'grey',
      padding: 5
    },
    innerContainer: {
      marginTop: 18
    },
    listContainer: {
      flexDirection: 'row', 
      flexWrap: 'wrap',
    },
    buttonContainer: {
      flexGrow: 3,
      margin: 5,
    }
})

export default NewClientForm;
