import React, { useRef } from 'react';
import { View, StyleSheet, Image, SafeAreaView, Text } from 'react-native';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import LashesForm from '@/components/forms/NewClientForm';

const LashForm = () => {
  const canvasRef = useRef(null);

  return (
    <View>
      <Text>Aca va el form completado desde la BD</Text>
      <Text>Y el form para dibujar las pestañas</Text>
    </View>
  );
};


export default LashForm;
