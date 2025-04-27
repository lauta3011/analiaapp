import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import Canvas from '../atoms/Canvas';
import { EYELASHES_MAP } from '@/constants/eyelashes';
import { addDrawing } from '@/database/database';

type ImageKey = keyof typeof EYELASHES_MAP;

export const EyelashDraw = (props: any) => {
  const { userId } = props;
  const [selected, setSelected] = useState<ImageKey>(1);

  const confirmDrawing = (drawing: string) => {
    addDrawing({userId, selected, drawing});
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.buttonRow}>
        <Button mode={selected === 1 ? 'contained' : 'outlined'} onPress={() => setSelected(1)} >Natural</Button>
        <Button mode={selected === 2 ? 'contained' : 'outlined'} onPress={() => setSelected(2)} >Abierta</Button>
        <Button mode={selected === 3 ? 'contained' : 'outlined'} onPress={() => setSelected(3)} >Suave</Button>
      </View>

      <Canvas handleAddEyelash={(drawing: string) => confirmDrawing(drawing)}>
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
    alignItems: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  image: {
    position: 'absolute',
    alignSelf: 'center',
    height: '100%'
  }
});