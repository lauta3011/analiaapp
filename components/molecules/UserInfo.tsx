import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const placeholder = require('@/assets/images/placeholder.png')

export default function UserInfo(props: any) {
  const { full_name, picture_path, phone, notes } = props.user;

  return (
    <>
      <View style={styles.container}>
        <Image 
          source={picture_path ? { uri: picture_path } : placeholder}
          style={styles.image}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{full_name}</Text>
          <Text >Teléfono: {phone}</Text>
        </View>

      </View>
      {notes && <View style={styles.notes}><Text style={{fontWeight: '300'}}>{notes}</Text></View>}
    </>
  );
};

const styles = StyleSheet.create({
    container: { 

        paddingVertical: 40, 
        flexDirection: 'row',
        alignItems: 'center', 
    },
    notes: {
      paddingHorizontal: 40,
      paddingVertical: 20, 
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