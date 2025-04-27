import React from 'react';
import { View } from 'react-native';

export default function HorizontalLine() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
        width: '80%',
        alignSelf: 'center',
      }}
    />
  );
};