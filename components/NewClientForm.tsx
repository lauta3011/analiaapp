import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import CustomInput from "./CustomInput";

// this does not work
import { isSmallView } from "@/utils";

const NewClientForm = (props: any) => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    contactLenses: false, 
    glasses: false,
    eyeProblems: false,
    allergies: "",
    eyeProducts: "",
  });

  return (
    <ScrollView style={styles.container}>
        <CustomInput setValue={(value: string) => setForm({...form, fullName: value})} type="text" label="Nombre y apellido" value={form.fullName} />
        <CustomInput setValue={(value: string) => setForm({...form, phone: value})} type="number" label="Nro telefono" value={form.phone} />

        <View style={{ flexDirection: 'row' }}>            
            <View style={styles.innerContainer}>
              <CustomInput setValue={(value: boolean) => setForm({...form, contactLenses: value})} type="checkbox" label="Usas lentes de contacto?" value={form.contactLenses} />
            </View>
            <View style={styles.innerContainer}>
              <CustomInput setValue={(value: boolean) => setForm({...form, glasses: value})} type="checkbox" label="Usas lentes comunes?" value={form.glasses} />
            </View>
        </View>
        
        <Text style={styles.helpeTxt}>en caso de ser mas de uno separalos por coma</Text>
        <CustomInput setValue={(value: string) => setForm({...form, eyeProducts: value})} type="text" label="Usas productos para los ojos?" value={form.eyeProducts} />
        <CustomInput setValue={(value: string) => setForm({...form, allergies: value})} type="text" label="Tienes alergias?" value={form.allergies} />
        <Button mode="contained" onPress={() => props.handleSubmit(form)} style={{ margin: 20 }}>Guardar</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    innerContainer: {
        flex: 1, 
        padding: 10,
    },
    helpeTxt: {
      fontStyle: "italic",
      color: 'grey'
    }
})

export default NewClientForm;
