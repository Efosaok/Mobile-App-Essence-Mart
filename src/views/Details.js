import React from 'react';
import { View, SafeAreaView, Button, StyleSheet } from 'react-native';
import { useStoreListContext } from '../context/StoreListContext'
import { WebView } from "react-native-webview";

export default function DetailsScreen(props) {
  const { store, setAccessedStore } = useStoreListContext()

  if (!store.platformUrl) {
    return props.navigation.navigate('Stores');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Button
          color="#e65100"
          title="Checkout"
          onPress={() => props.navigation.navigate('Checkout')}
        />
      </View>
      <WebView source={{ uri: `https://${store.platformUrl}/` }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  wrapper: {
    paddingBottom: 10
  }
})
