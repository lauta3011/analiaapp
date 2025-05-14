import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import UserInfo from '@/components/molecules/UserInfo';
import { fetchDrawing, fetchSingleUser, fetchUserAllergies, fetchUserCharacteristics } from '@/database/database';
import UserTags from '@/components/lists/UserTags';
import HorizontalLine from '@/components/atoms/HorizontalLine';
import { EyelashDisplay } from '@/components/lists/EyelashDisplay';
import { ModalForm } from '@/components/forms/ModalForm';
import { EyelashDraw } from '@/components/forms/EyelashDraw';
import UserDisplay from '@/components/molecules/UserDisplay';

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const [modal, setModal] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [allergies, setAllergies] = useState<any>([]);
  const [characteristics, setCharacteristics] = useState<any>([]);
  const [drawing, setDrawing] = useState<any>();
  const [selectedImage, setSelectedImage] = useState(1);

  const userID = parseInt(id as string);

  const getLatestDrawing = async () => {
    const eyelashDrawing: any = await fetchDrawing(userID);

    if (eyelashDrawing != null) {
        const drawing = JSON.parse(eyelashDrawing.data);
        setSelectedImage(eyelashDrawing.type)
        setDrawing(drawing);
    }
  }

  useEffect(() => {
    async function getUserData() {
      
      let allergies: any = [];
      let characteristics: any = [];
      
      const user = await fetchSingleUser(userID);
      const userAllergies = await fetchUserAllergies(userID);
      const userCharacteristics = await fetchUserCharacteristics(userID);

      userAllergies?.map((item: any) => {
        allergies.push(item?.allergy_name);
      })

      userCharacteristics?.map((item: any) => {
        characteristics.push(item?.characteristic_name);
      })

      getLatestDrawing();

      setUser(user);
      setAllergies(allergies);
      setCharacteristics(characteristics);
    }

    getUserData();
  }, []);

  return (
    <ScrollView style={{ paddingHorizontal: 25 }} scrollEnabled={!modal}>
      <UserDisplay 
        user={user}
        characteristics={characteristics} 
        allergies={allergies} 
        drawing={drawing} 
        selectedImage={selectedImage}
        modal={modal} 
        id={id}
      /> 
      {/* // AGREGAR COMPONENTE QUE EDITE LOS INPUTS */}
    </ScrollView>
  );
}