import 'react-native-gesture-handler'
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppComponent from './AppComponent'
import { UserProvider } from './context/UserContext';
import { StoreListProvider } from './context/StoreListContext';
import { LocationProvider } from './context/LocationContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
// import { ErrorHandler } from "./components/ErrorHandler";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProfileProvider } from './context/ProfileContext';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App () {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <UserProvider>
        <ToastProvider>
          <StoreListProvider>
            <CartProvider>
              <LocationProvider>
                <ErrorBoundary>
                  <ProfileProvider>
                    <AppComponent />
                  </ProfileProvider>
                </ErrorBoundary>
              </LocationProvider>
            </CartProvider>
          </StoreListProvider>
        </ToastProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
