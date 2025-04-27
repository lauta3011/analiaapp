import EyelashForm from '@/components/forms/EyelashForm';
import UserTags from '@/components/lists/UserTags';
import { fetchUserAllergies } from '@/database/database';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

export default function NewClientForm() {
  const { id, name } = useLocalSearchParams();
  const [allergies, setAllergies] = useState<any>([]);

    useEffect(() => {
      async function getUserData() {
        let ret: any = [];
        const userAllergies = await fetchUserAllergies(parseInt(id as string));
        userAllergies?.map((item: any) => {
          ret.push(item?.allergy_name);
        })

        setAllergies(ret);
      }
      getUserData();
    }, []);

  return (
    <View style={{ flex:1,position: 'relative', display:'flex', flexDirection: 'column' }}>
      <Text style={styles.title}>{name}</Text>
      <UserTags items={allergies} />
      
      {/* <EyelashForm /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 20,
  }
});