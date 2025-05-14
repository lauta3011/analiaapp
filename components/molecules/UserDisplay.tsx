import React, { useEffect, useState } from 'react';
import UserInfo from '@/components/molecules/UserInfo';
import { fetchDrawing, fetchSingleUser, fetchUserAllergies, fetchUserCharacteristics } from '@/database/database';
import UserTags from '@/components/lists/UserTags';
import HorizontalLine from '@/components/atoms/HorizontalLine';
import { EyelashDisplay } from '@/components/lists/EyelashDisplay';
import { ModalForm } from '@/components/forms/ModalForm';
import { EyelashDraw } from '@/components/forms/EyelashDraw';
import { View } from 'react-native';

export default function UserDisplay(props: any) {
console.log(props)
  return (
    <View style={{ paddingHorizontal: 25 }} >
      <UserInfo user={props.user} />
      <HorizontalLine />
      
      {props.characteristics?.length > 0 && <UserTags items={props.characteristics} title="Caracteristicas"/>}
      {props.allergies?.length > 0 && <UserTags items={props.allergies} title="Alergias"/>}
      
      <EyelashDisplay drawing={props.drawing} selected={props.selectedImage} handleAddEyelash={() => props.setModal(true)} />
     
      {props.modal && 
        <ModalForm handleHide={() => props.setModal(false)}>
            <EyelashDraw userId={props.id} confirmForm={() => { props.getLatestDrawing(); props.setModal(false) }} />
        </ModalForm>}
    </View>
  );
}