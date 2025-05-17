import React from 'react';
import { View } from 'react-native';
import TextBox from '../atoms/TextBox';

const UserEdit = ({ name, phone, setName, setPhone }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <TextBox label="nombre" number={false} setValue={setName} value={name} />
      <TextBox label="telefono" number={true} setValue={setPhone} value={phone} />
    </View>
  );
};

export default UserEdit;
