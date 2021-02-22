import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useUserContext } from '../context/UserContext';

const {height, width} = Dimensions.get('window');

export default function PrivateRoute (props) {
  const { isLoggedIn, user } = useUserContext();
  const [state, setState] = useState({
    isLoaded: false
  })

  useEffect(() => {
    setState({ ...state, isLoaded: true })
    if (!isLoggedIn) {
      props.navigation.navigate('Login')
    }
  },[isLoggedIn]);

  if(!state.isLoaded) {
    return(
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
    )
  }

  return (
    isLoggedIn && user ? props.children :
    <SafeAreaView forceInset={{ top: 'always' }}>
      <ScrollView>
        <View style={styles.container} withPadding>
          <Text>Authentication is Needed</Text>
          <View>
            <Text>
                You have to be signed in to access this page. If you have an account
                you can sign in <Text onPress={() => props.navigation.navigate('Login')}>here</Text>. Otherwise you would be redirected to Login
                into your account.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: height,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});