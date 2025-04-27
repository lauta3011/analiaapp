import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function UserTags(props: any) {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.container}>
        {props.items.map((item: any, index: number) => (
          <View key={index} style={styles.itemBox}>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginVertical: 5
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, 
    padding: 5,
  },
  itemBox: {
    width: '48%',
    padding: 3,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300'
  },
});