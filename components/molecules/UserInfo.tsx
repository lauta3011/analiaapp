import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const placeholder = require('@/assets/images/placeholder.png')

export default function UserInfo(props: any) {
  const { full_name, picture_path, phone, id } = props.user;

  console.log('pic',picture_path)
  return (
    <View style={styles.container}>
      <Image 
        source={picture_path ? { uri: picture_path } : placeholder}
        style={styles.image}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{full_name}</Text>
        <Text >Teléfono: {phone}</Text>
      </View>

      <TouchableOpacity onPress={() => router.push(`/user/${id}/addAppointment?name=${full_name}`)}>
        <Text style={styles.headerButton}>agregar consulta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
        paddingHorizontal: 20,
        paddingVertical: 40, 
        flexDirection: 'row',
        alignItems: 'center', 
    },
    image: { 
        backgroundColor: 'lightgrey',
        width: 90, 
        height: 90, 
        borderRadius: 50, 
        marginRight: 15 
    },
    name: { 
      marginBottom: 5,
        fontSize: 23, 
        fontWeight: 'bold' ,
    },
    headerButton: { 
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 15,
        color: '#fff' 
    }
});