import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import TextBox from '../atoms/TextBox';
import UserEdit from './UserEdit';
import UserDisplay from './UserDisplay';
import ImageInput from '../atoms/ImageInput';
import { useFormStore } from '@/store/form';
import { COLORS } from '@/constants';

const placeholder = require('@/assets/images/placeholder.png');

const UserInfo = (props: any) => {
  const { full_name, picture_path, phone, notes } = props.user;
  const { loading } = useFormStore();

  const [editView, setEditView] = useState(false);
  const [editName, setEditName] = useState(full_name ?? '');
  const [editNotes, setEditNotes] = useState(notes ?? '');
  const [editPhone, setEditPhone] = useState(phone ?? '');
  const [editPicture, setEditPicture] = useState(picture_path);

  useEffect(() => {
    if (props.user) {
      setEditName(props.user.full_name);
      setEditPhone(props.user.phone);
      setEditNotes(props.user.notes);
    }
  }, [props.user]);

  const prepareUpdate = () => {
    const form = {
      full_name: editName,
      phone: editPhone,
      notes: editNotes,
      picture_path: editPicture ?? picture_path
    }

    props.handleUpdate(form)
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {editView ? <ImageInput prevImage={picture_path} selectedImage={(img: any) => setEditPicture(img)} /> : 
        <Image 
          source={picture_path ? { uri: picture_path } : placeholder}
          style={styles.image}
        />}

        {editView ? (
          <UserEdit
            name={editName}
            phone={editPhone}
            setName={(val: string) => setEditName(val)}
            setPhone={(val: number) => setEditPhone(val)}
          />
        ) : (
          <UserDisplay full_name={full_name} phone={phone} />
        )}
      </View>

      <View style={styles.notesContainer}>
        {editView ? (
          <TextBox
            label="notas"
            number={false}
            setValue={setEditNotes}
            value={editNotes}
          />
        ) : (
          notes && <Text style={styles.notesText}>{notes}</Text>
        )}
      </View>

      {!editView ? (
        <Button loading={loading} mode="contained" onPress={() => setEditView(true)} style={styles.editButton}>
          Editar usuario
        </Button>
      ) : (
        <View style={styles.buttonRow}>
          <Button mode="outlined" onPress={() => setEditView(false)} style={styles.cancelButton}>
            Cancelar
          </Button>
          <Button mode="contained" onPress={() => { prepareUpdate(); setEditView(false)}} style={styles.confirmButton}>
            Confirmar
          </Button>
        </View>
      )}
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
    wrapper: {
      marginVertical: 25,
    },
    container: { 
      marginVertical: 15,
      flexDirection: 'row',
      alignItems: 'center', 
    },
    image: { 
        backgroundColor: COLORS.primaryLight,
        width: 90, 
        height: 90, 
        borderRadius: 50, 
        marginRight: 15,
    },
    notesContainer: {
      marginVertical: 15,
    },
    notesText: {
      fontWeight: '300',
      color: COLORS.text,
    },
    editButton: {
      backgroundColor: COLORS.primary,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cancelButton: {
      flex: 1,
      marginRight: 8,
    },
    confirmButton: {
      flex: 1,
      marginLeft: 8,
      backgroundColor: COLORS.primary,
    },
});