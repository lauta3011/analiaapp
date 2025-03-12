import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { people } from "@/constants/mockData";
import { useRouter } from "expo-router";

export default function NameList(props: any) {
    const filteredNames = people.filter(({ name }) => name[0] === props.letter);
    const router = useRouter();

    return (
      <View style={styles.container}>
        {filteredNames.length > 0 ? 
                <FlatList
                data={filteredNames}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <TouchableOpacity onPress={() => router.push(`/user/${item.id}`)}>
                        <Icon name="arrowright" size={20} color="#000" />
                    </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
      :
            <View style={styles.container}>
                <Text style={styles.name}>No tienes clientes registrados con esta inicial.</Text>
            </View>
      }
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 8
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    name: {
      fontSize: 18,
    },
  });