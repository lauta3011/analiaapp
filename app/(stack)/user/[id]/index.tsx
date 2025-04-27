import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import UserInfo from '@/components/molecules/UserInfo';
import { fetchDrawing, fetchSingleUser, fetchUserAllergies, fetchUserCharacteristics } from '@/database/database';
import UserTags from '@/components/lists/UserTags';
import HorizontalLine from '@/components/atoms/HorizontalLine';
import { EyelashDisplay } from '@/components/lists/EyelashDisplay';
import { ModalForm } from '@/components/forms/ModalForm';
import { EyelashDraw } from '@/components/forms/EyelashDraw';

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const [modal, setModal] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [allergies, setAllergies] = useState<any>([]);
  const [characteristics, setCharacteristics] = useState<any>([]);
  const [drawing, setDrawing] = useState<any>();

  useEffect(() => {
    async function getUserData() {
      const userID = parseInt(id as string);
      let allergies: any = [];
      let characteristics: any = [];
      
      const user = await fetchSingleUser(userID);
      const userAllergies = await fetchUserAllergies(userID);
      const userCharacteristics = await fetchUserCharacteristics(userID);
      // const eyelashDrawing: any = await fetchDrawing(userID);

      userAllergies?.map((item: any) => {
        allergies.push(item?.allergy_name);
      })

      userCharacteristics?.map((item: any) => {
        characteristics.push(item?.characteristic_name);
      })

      
      // const drawing = JSON.parse(eyelashDrawing);
      console.log('#### ', drawing);
      setUser(user);
      setAllergies(allergies);
      setCharacteristics(characteristics);
      setDrawing(drawing);
    }

    getUserData();
  }, []);

  return (
    <ScrollView scrollEnabled={false} style={{ flex:1 }}>
      <UserInfo user={user} />
      <HorizontalLine />
      {characteristics.length > 0 && <UserTags items={characteristics} title="Caracteristicas"/>}
      {allergies.length > 0 && <UserTags items={allergies} title="Alergias"/>}
      <HorizontalLine />
      {/* <EyelashDisplay paths={drawing} selected={1} handleAddEyelash={() => setModal(true)} /> */}

      {modal && <ModalForm handleHide={() => setModal(false)}><EyelashDraw userId={id} confirmForm={() => console.log('caasaca')} /></ModalForm>}
    </ScrollView>
  );
}