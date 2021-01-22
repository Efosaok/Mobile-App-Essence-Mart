import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import OnboardingScreen from '../views/Onboarding';
import SignupScreen from '../views/Signup';
import LoginScreen from '../views/Login';
import StoresScreen from '../views/Stores';
import CheckoutScreen from '../views/Checkout';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
          {/* screenOptions={{ headerShown: false }}> */}
        {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
        <Stack.Screen options={{
          title: 'Signup',
          headerStyle: {
            backgroundColor: '#ffd180',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center'
          },
        }} name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Stores" component={StoresScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
