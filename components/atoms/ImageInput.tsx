import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const ImageInput = (props: any) => {
  const [profileImage, setProfileImage] = useState(props.prevImage);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const resizedImage: any = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 300, height: 300 } }],
        { format: SaveFormat.JPEG }
      );
      setProfileImage(resizedImage.uri);
      props.selectedImage(resizedImage.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTakePhoto} style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <Ionicons name="person" size={60} color="#6e6e6e" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageInput;