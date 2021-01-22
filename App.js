import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { StoreListProvider } from './src/context/StoreListContext'
import Routes from "./src/router";

export default function App() {
  return (
    <SafeAreaProvider style={styles.main}>
      <StoreListProvider>
        <Routes />
      </StoreListProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
