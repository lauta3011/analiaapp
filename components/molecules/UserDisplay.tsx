import React from 'react';
import { View, Text } from 'react-native';

const UserDisplay = ({ full_name, phone }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <Text >{full_name}</Text>
      <Text>Teléfono: {phone}</Text>
    </View>
  );
};

export default UserDisplay;
