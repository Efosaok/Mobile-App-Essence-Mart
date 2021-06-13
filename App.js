// import './config/wdyr';
import 'react-native-gesture-handler'
// Add this line to your `index.js`
import 'react-native-get-random-values'
import React, { Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import AppComponent from './AppComponent'
import { UserProvider } from './context/UserContext';
import { StoreListProvider } from './context/StoreListContext';
import { LocationProvider } from './context/LocationContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AlertProvider } from './context/AlertContext';
// import { ErrorHandler } from "./components/ErrorHandler";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProfileProvider } from './context/ProfileContext';
import Loader from './components/Loader';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();// Ignore all log notifications

export default function App () {
  return (
    <Suspense fallback={<Loader isLoading />}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <UserProvider>
          <ToastProvider>
            <StoreListProvider>
              <CartProvider>
                <LocationProvider>
                  <ErrorBoundary>
                    <ProfileProvider>
                      <AlertProvider>
                        <AppComponent />
                      </AlertProvider>
                    </ProfileProvider>
                  </ErrorBoundary>
                </LocationProvider>
              </CartProvider>
            </StoreListProvider>
          </ToastProvider>
        </UserProvider>
      </SafeAreaProvider>
    </Suspense>
  );
}
