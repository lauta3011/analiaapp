import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import TextBox from '../atoms/TextBox';
import UserEdit from './UserEdit';
import UserDisplay from './UserDisplay';
import ImageInput from '../atoms/ImageInput';
import { useFormStore } from '@/store/form';

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
    <View style={{ marginVertical: 25 }}>
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

      <View style={{ marginVertical: 15 }}>
        {editView ? (
          <TextBox
            label="notas"
            number={false}
            setValue={setEditNotes}
            value={editNotes}
          />
        ) : (
          notes && <Text style={{ fontWeight: '300' }}>{notes}</Text>
        )}
      </View>

      {!editView ? (
        <Button loading={loading} mode="contained" onPress={() => setEditView(true)}>
          editar usuario
        </Button>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button mode="text" onPress={() => setEditView(false)}>cancelar</Button>
          <Button mode="contained" onPress={() => { prepareUpdate(); setEditView(false)}}>confirmar</Button>
        </View>
      )}
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
    container: { 
      marginVertical: 15,
      flexDirection: 'row',
        alignItems: 'center', 
    },
    image: { 
        backgroundColor: 'lightgrey',
        width: 90, 
        height: 90, 
        borderRadius: 50, 
        marginRight: 15
    },
    name: { 
      marginBottom: 5,
        fontSize: 23, 
        fontWeight: 'bold' ,
    },
    headerButton: { 
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 15,
        color: '#fff' 
    }
});