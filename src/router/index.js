import 'react-native-gesture-handler';
import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import OnboardingScreen from '../views/Onboarding';
import SignupScreen from '../views/Signup';
import LoginScreen from '../views/Login';
import StoresScreen from '../views/Stores';
import CheckoutScreen from '../views/Checkout';
import DetailsScreen from '../views/Details';
import firebase from '../database/firebase';
import { useUserContext } from '../context/UserContext';

const Stack = createStackNavigator();

export default function Routes() {
  const { isLoggedIn, setUser } = useUserContext()
  const [isLoading, setLoading] = useState(true)

  const onAuthStateChanged = (user) => {
    setUser(user)
    setLoading(false)
  }

  useEffect(() => {
    let subscribe = firebase.auth().onAuthStateChanged(onAuthStateChanged)
    return subscribe
  }, [])

  if(isLoading){
    return(
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator >
          {/* screenOptions={{ headerShown: false }}> */}
        {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Stores" component={StoresScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    opacity: 0.3
  }
})