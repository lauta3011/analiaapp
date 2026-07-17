import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { fetchAppointmentsByUser, fetchSingleUser, fetchUserAllergies, fetchUserCharacteristics, deleteAppointment } from '@/database/database';
import UserInfo from '@/components/molecules/UserInfo';
import UserTags from '@/components/lists/UserTags';
import { AppointmentCard } from '@/components/atoms/AppointmentCard';
import { useFormStore } from '@/store/form';
import { COLORS } from '@/constants';
import { Appointment } from '@/types';

export default function UserDetails() {
  const { id, appointmentId } = useLocalSearchParams<{ id: string; appointmentId?: string }>();
  const router = useRouter();
  const { updateUser } = useFormStore();
  const [user, setUser] = useState<any>({});
  const [allergies, setAllergies] = useState<any>([]);
  const [characteristics, setCharacteristics] = useState<any>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const userID = parseInt(id as string);
  const existingAppointmentId = appointmentId ? parseInt(appointmentId) : null;

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

    setUser(user);
    setAllergies(allergies);
    setCharacteristics(characteristics);
  }

  const getAppointments = async () => {
    const data = await fetchAppointmentsByUser(userID);
    setAppointments(data as Appointment[]);
  }

  const updateUserData = async (form: any) => {
    const success = await updateUser({userID, ...form});

    if (success) {
      getUserData();
    }
  }

  const handleDeleteAppointment = useCallback(async (appointmentId: number, date: string) => {
    Alert.alert(
      'Eliminar cita',
      '¿Estás seguro de que quieres eliminar esta cita?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteAppointment(appointmentId);
            getAppointments();
          }
        },
      ]
    );
  }, []);

  const handleAppointmentPress = useCallback((appointment: Appointment) => {
    router.push({ pathname: `/user/${id}/appointment/${appointment.id}` });
  }, [id]);

  useEffect(() => {
    getUserData();
    getAppointments();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAppointments();
    }, [])
  );

  const currentAppointment = existingAppointmentId
    ? appointments.find((a) => a.id === existingAppointmentId) ?? null
    : null;

  const previousAppointments = existingAppointmentId
    ? appointments.filter((a) => a.id !== existingAppointmentId)
    : appointments;

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={previousAppointments}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <>
          <UserInfo user={user} handleUpdate={(form: any) => updateUserData(form)} />

          {characteristics?.length > 0 && <UserTags items={characteristics} title="Caracteristicas" />}
          {allergies?.length > 0 && <UserTags items={allergies} title="Alergias" />}

          {currentAppointment && (
            <View style={styles.currentAppointmentSection}>
              <Text style={styles.sectionTitle}>Cita actual</Text>
              <View style={styles.appointmentWrapper}>
                <AppointmentCard
                  appointment={currentAppointment}
                  onDelete={handleDeleteAppointment}
                  onPress={() => handleAppointmentPress(currentAppointment)}
                  compact
                />
              </View>
            </View>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Citas anteriores</Text>
          </View>
        </>
      }
      renderItem={({ item }) => (
        <View style={styles.appointmentWrapper}>
          <AppointmentCard
            appointment={item}
            onDelete={handleDeleteAppointment}
            onPress={() => handleAppointmentPress(item)}
            compact
          />
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No hay citas registradas para este cliente.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  currentAppointmentSection: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
  },
  appointmentWrapper: {
    marginHorizontal: -25,
    paddingHorizontal: 25,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
});
