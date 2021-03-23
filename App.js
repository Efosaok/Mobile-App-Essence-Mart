import 'react-native-gesture-handler'
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppComponent from './AppComponent'
import { UserProvider } from './context/UserContext';
import { StoreListProvider } from './context/StoreListContext';
import { LocationProvider } from './context/LocationContext';

export default function App () {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <UserProvider>
        <StoreListProvider>
          <LocationProvider>
            <AppComponent />
          </LocationProvider>
        </StoreListProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
