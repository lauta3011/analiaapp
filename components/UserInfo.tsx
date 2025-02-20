import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function UserInfo(props: any) {
  const [showAlergias, setShowAlergias] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.image }}
        style={styles.image}
      />

      <View style={{ flex: 1 }}>
        <Text style={[styles.name, styles.text]}>{props.name}</Text>
        <Text style={styles.text}>{props.age} años</Text>
        <Text style={styles.text}>Teléfono: {props.phone}</Text>
      </View>

      <TouchableOpacity onPress={() => setShowAlergias(!showAlergias)}>
        <Text style={styles.alergies}>Ver Alergias</Text>
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
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        marginRight: 15 
    },
    text: {
      color: '#FFF'
    },
    name: { 
        fontSize: 18, 
        fontWeight: 'bold' ,
    },
    alergies: { 
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
        color: '#007BFF' 
    }
});