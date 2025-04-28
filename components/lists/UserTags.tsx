import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function UserTags(props: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.tagContainer}>
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
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '400',
    marginVertical: 5
  },
  tagContainer: {
    flexDirection: 'row',

    flexWrap: 'wrap',
    gap: 10, 
    padding: 15,
  },
  itemBox: {
    width: '48%',
    padding: 3,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '300'
  },
});