import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import stores from '../database/stores';
import { useStoreListContext } from '../context/StoreListContext'
import { useUserContext } from '../context/UserContext';
import PrivateRoute from './PrivateRoute'

export default function StoresScreen(props) {
    const { store, setAccessedStore } = useStoreListContext()
    const { logoutSuccess } = useUserContext()

    const onPress = (storeItem) => {
        setAccessedStore(storeItem);
        props.navigation.navigate('Details')
    };

    return (
      <PrivateRoute {...props}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
              <View style={styles.main}>
              {
                stores.map(({ name, platformUrl, id }) => (
                <TouchableOpacity
                  key={id}
                  style={styles.item}
                  onPress={() => onPress({ name, platformUrl })}
                >
                  <Text>{name}</Text>
                </TouchableOpacity>
                ))
              }
              </View>
              <TouchableOpacity
                  style={styles.item}
                  onPress={() => logoutSuccess()}
                >
                  <Text>logout</Text>
                </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </PrivateRoute>
    );
}

const styless = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    }
  });

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   marginTop: StatusBar.currentHeight || 0,
      flexDirection: 'row',
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 8
    },
    item: {
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginVertical: 8,
      fontSize: 10,
      marginHorizontal: 5,
      borderColor: '#ccc',
      borderWidth: 2
    },
    title: {
      fontSize: 32,
    },
});
