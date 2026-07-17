import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import Canvas from '../molecules/Canvas';
import { EYELASHES_MAP } from '@/constants/eyelashes';
import { addDrawing } from '@/database/database';
import { COLORS } from '@/constants';
import Toast from 'react-native-toast-message';

type ImageKey = keyof typeof EYELASHES_MAP;

export const EyelashDraw = (props: any) => {
  const { userId, appointmentId } = props;
  const [selected, setSelected] = useState<ImageKey>(props.selectedImage);

  const confirmDrawing = async (drawing: string) => {
    await addDrawing({userId, selected, drawing, appointmentId}).then(() => {
      Toast.show({
        type: 'success',
        text1: 'Dibujo guardado',
        text2: 'La sesion de pestanas se guardo correctamente',
      });
      props.confirmForm()
    });
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.buttonRow}>
        <Button mode={selected === 1 ? 'contained' : 'outlined'} onPress={() => setSelected(1)} style={selected === 1 ? styles.selectedButton : undefined}>Natural</Button>
        <Button mode={selected === 2 ? 'contained' : 'outlined'} onPress={() => setSelected(2)} style={selected === 2 ? styles.selectedButton : undefined}>Abierta</Button>
        <Button mode={selected === 3 ? 'contained' : 'outlined'} onPress={() => setSelected(3)} style={selected === 3 ? styles.selectedButton : undefined}>Suave</Button>
      </View>

      <Canvas handleHide={() => props.handleHide()} handleAddEyelash={(drawing: string) => confirmDrawing(drawing)}>
        <Image
          style={styles.image}
          source={EYELASHES_MAP[selected]}
          resizeMode="contain"
        />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 16,
  },
  selectedButton: {
    backgroundColor: COLORS.primary,
  },
  image: {
    position: 'absolute',
    alignSelf: 'center',
    height: '100%',
  }
});
