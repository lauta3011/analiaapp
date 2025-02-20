import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Slot } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';

const Layout = ({ children }: any) => {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="leftcircleo" size={30} color="#FFF"/> 
        </TouchableOpacity>
      </View>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});

export default Layout;
