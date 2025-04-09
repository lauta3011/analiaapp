import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import UserInfo from '@/components/info/UserInfo';
import { fetchSingleUser } from '@/database/database';
import { mockDates } from '@/constants/mockData';
import { DatesList } from '@/components/lists/DatesList';

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<any>({});
  const [dates, setDates] = useState<any>([]);

  useEffect(() => {
    async function getUserData() {
      const user = await fetchSingleUser(parseInt(id as string));
      // en el bff traer las alergias d eeste usuario e iterar sobre las alergias cacheadas
      // const allergies = await allergiesPerUser(id);
      setUser(user);
      setDates(mockDates);
    }
    getUserData();
  }, []);

  return (
    <View style={{ flex:1 }}>
      <UserInfo user={user} />

      <View style={{ padding: 24 }}>
        <Text style={{ fontWeight: 200, fontSize: 24 }}>Las consultas estaran ordenadas por fecha de mas reciente a mas antigua.</Text>
      </View>

      <DatesList dates={dates} />
    </View>
  );
}