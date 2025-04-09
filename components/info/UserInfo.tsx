import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function UserInfo(props: any) {
  const { full_name, picture_path, phone } = props.user;

  return (
    <View style={styles.container}>
    <Image 
      source={{ uri: picture_path }}
      style={styles.image}
    />

      <View style={{ flex: 1 }}>
        <Text style={[styles.name, styles.text]}>{full_name}</Text>
        <Text style={styles.text}>Teléfono: {phone}</Text>
      </View>

      <TouchableOpacity onPress={() => console.log('llevame al form')}>
        <Text style={styles.headerButton}>nueva consulta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
        paddingHorizontal: 20,
        paddingBottom: 10, 
        flexDirection: 'row',
        alignItems: 'center', 
        backgroundColor: 'grey',
        color: '#FFF'
    },
    image: { 
        backgroundColor: 'lightgrey',
        width: 90, 
        height: 90, 
        borderRadius: 50, 
        marginRight: 15 
    },
    text: {
      color: '#FFF',
    },
    name: { 
      marginBottom: 5,
        fontSize: 23, 
        fontWeight: 'bold' ,
    },
    headerButton: { 
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
        color: '#007BFF' 
    }
});