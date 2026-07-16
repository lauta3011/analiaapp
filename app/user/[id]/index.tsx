import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import { fetchDrawing, fetchSingleUser, fetchUserAllergies, fetchUserCharacteristics } from '@/database/database';
import UserInfo from '@/components/molecules/UserInfo';
import UserTags from '@/components/lists/UserTags';
import { EyelashDisplay } from '@/components/lists/EyelashDisplay';
import { useFormStore } from '@/store/form';
import { useModalStore } from '@/store/modal';

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const { updateUser } = useFormStore();
  const [user, setUser] = useState<any>({});
  const [allergies, setAllergies] = useState<any>([]);
  const [characteristics, setCharacteristics] = useState<any>([]);
  const [drawing, setDrawing] = useState<any>();
  const [notes, setNotes] = useState<any>();
  const [selectedImage, setSelectedImage] = useState(1);

  const openModal = useModalStore((s) => s.openModal);

  const userID = parseInt(id as string);

  const getLatestDrawing = async () => {
    const eyelashDrawing: any = await fetchDrawing(userID);

    if (eyelashDrawing != null) {
        const drawing = JSON.parse(eyelashDrawing.data);
        setSelectedImage(eyelashDrawing.type)
        setNotes(eyelashDrawing.notes)
        setDrawing(drawing);
    }
  }

  const getUserData = async () => {  
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

  const updateUserData = async (form: any) => {
    const success = await updateUser({userID, ...form});

    if (success) {
      getUserData();
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ScrollView  style={{ paddingHorizontal: 25, backgroundColor: '#fff' }} >
      <UserInfo user={user} handleUpdate={(form: any) => updateUserData(form)}/>
      
      {characteristics?.length > 0 && <UserTags items={characteristics} title="Caracteristicas"/>}
      {allergies?.length > 0 && <UserTags items={allergies} title="Alergias"/>}

      <EyelashDisplay notes={notes} drawing={drawing} selected={selectedImage} openModal={() => openModal('eyelash-session', { selectedImage, userId: id, onConfirm: getLatestDrawing })} />
    </ScrollView>
  );
}