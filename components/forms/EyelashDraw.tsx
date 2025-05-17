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
import TextBox from '../atoms/TextBox';

type ImageKey = keyof typeof EYELASHES_MAP;

export const EyelashDraw = (props: any) => {
  const { userId } = props;
  const [selected, setSelected] = useState<ImageKey>(props.selectedImage);
  const [notes, setNotes] = useState('');

  const confirmDrawing = async (drawing: string) => {
    await addDrawing({userId, selected, drawing, notes}).then(() => {
      props.confirmForm()
    });
  }

  return (
    <View style={styles.wrapper}>
      <View style={{ height: 60, width: '100%', marginBottom: 15}}>
        <TextBox number={false} label='notas' setValue={(value:string) => setNotes(value)} value={notes} />
      </View>

      <View style={styles.buttonRow}>
        <Button mode={selected === 1 ? 'contained' : 'outlined'} onPress={() => setSelected(1)}>Natural</Button>
        <Button mode={selected === 2 ? 'contained' : 'outlined'} onPress={() => setSelected(2)}>Abierta</Button>
        <Button mode={selected === 3 ? 'contained' : 'outlined'} onPress={() => setSelected(3)}>Suave</Button>
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