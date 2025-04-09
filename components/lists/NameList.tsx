import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { Link, useRouter } from "expo-router";

export default function NameList(props: any) {
    return (
      <View style={styles.container}>
        {props.filteredNames.length > 0 ? 
                <FlatList
                data={props.filteredNames}
                renderItem={({ item }) => (
                    <Link href={{
                      pathname: "/user/[id]",
                      params: { id: item.id }
                    }} asChild>
                      <Pressable>
                        <View style={styles.itemContainer}>
                          <Text style={styles.name}>{item.full_name}</Text>
                          <Icon name="arrowright" size={20} color="#000" />
                        </View>
                      </Pressable>
                    </Link>
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