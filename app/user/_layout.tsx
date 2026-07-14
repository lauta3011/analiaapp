import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter, Slot } from 'expo-router';
import { IconButton } from 'react-native-paper';

const Layout = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <IconButton
          icon="arrow-left-circle-outline"
          iconColor="#FFF"
          size={30}
          onPress={() => router.back()}
        />
      </View>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c8778a",
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});

export default Layout;
