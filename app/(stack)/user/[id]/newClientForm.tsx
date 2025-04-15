import { EyeLashDraw } from '@/components/forms/EyeLashDraw';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

export default function NewClientForm() {
  return (
    <View style={{ flex:1,position: 'relative', display:'flex', flexDirection: 'column' }}>
      <Text style={styles.title}>form</Text>
      <EyeLashDraw />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 20,
  }
});