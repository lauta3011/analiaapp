// ToastConfig.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastStyles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
});

const ToastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#3cba9f' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={toastStyles.title}
      text2Style={toastStyles.message}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: '#c73e3e' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={toastStyles.title}
      text2Style={toastStyles.message}
    />
  ),
};

export default ToastConfig;
