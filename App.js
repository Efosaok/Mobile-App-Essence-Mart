import { StatusBar } from 'expo-status-bar';
import React, { Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { StoreListProvider } from './src/context/StoreListContext'
import Routes from "./src/router";
import { UserProvider } from './src/context/UserContext';
import Loader from './src/widgets/Loader';

export default function App() {
  return (
    <React.StrictMode>
      <SafeAreaProvider style={styles.main}>
        <UserProvider>
          <StoreListProvider>
            <Suspense fallback={<Loader />}>
              <Routes />
            </Suspense>
          </StoreListProvider>
        </UserProvider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </React.StrictMode>
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
