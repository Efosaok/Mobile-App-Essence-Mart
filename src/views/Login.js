// components/login.js

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from '../database/firebase';
import SafeAreaView from 'react-native-safe-area-view';
import Form from '../widgets/Form';
import AuthFooter from '../widgets/AuthFooter';
import Loader from '../widgets/Loader';
import { useUserContext } from '../context/UserContext';

const {height, width} = Dimensions.get('window');


export default function Login(props) {
  const { isLoggedIn } = useUserContext()
  const [state, setState] = useState({ 
    username: '',// email
    password: '',
    isLoading: false,
    rememberMe: false,
    guide: true
  })

  useEffect(() => {
    if (isLoggedIn) {
      props.navigation.navigate('Stores')
    }
  },[isLoggedIn]);

  const onRememberMe = (isOn) => {
    setState({ ...state, rememberMe: isOn })
  }

  const updateInputVal = (val, prop) => {
    const currentState = { ...state };
    currentState[prop] = val;
    setState(currentState);
  }

  const userLogin = () => {
    if(state.username === '' && state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      setState({
        isLoading: true,
        errorMessage: null
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(state.username, state.password)
      .then((res) => {
        setState({
          ...state,
          isLoading: false,
          email: '', 
          password: ''
        })
      })
      .catch(error => {
        setState({
          ...state,
          isLoading: false,
          errorMessage: error.message
        })
      })
    }
  }

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <ScrollView>
        {state.isLoading && <Loader isLoading={state.isLoading} />}
        <View style={styles.container}>
          {state.guide &&
          <View style={styles.introSection}>
            <AntDesign
              onPress={() => setState((curr) => ({ ...curr, guide: !curr.guide, }))}
              style={styles.helpCenterIcon} name="close" size={18} color="black"
            />
            <Text 
              style={styles.helpCenter}
              onPress={() => props.navigation.navigate('Login')}>
              Forgot your password ?
            </Text>
          </View>}
          <View style={{ flex: 1 }}>
            <View style={styles.headerSection}>
              <Text style={styles.heading}>
                Welcome!
              </Text>
              <Text style={styles.summary}>
                Please enter your data to continue
              </Text>
            </View>
            <Form {...state} updateInputVal={updateInputVal} />
            <AuthFooter {...state} onRememberMe={onRememberMe} />
            {state.errorMessage && <Text style={styles.errMsg}>
              {state.errorMessage}
            </Text>}
            <TouchableOpacity
              style={{ backgroundColor: 'blue', borderRadius:10, paddingVertical: 15, marginTop: 30, }}
              title="Signup"
              onPress={userLogin}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.loginText}>
            By connecting your account confirmed that you agreed with our
            <Text style={{ color: 'black', fontWeight: 'bold' }}> Term and Condition</Text>
          </Text>
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
    minHeight: height - 70,
  },
  introSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 45,
    marginTop: 10,
    flex: .1,
  },
  helpCenterIcon: {
    color: '#808080'
  },
  helpCenter: {
    textDecorationLine: 'underline',
    color: '#808080'
  },
  headerSection: {
    marginVertical: 15
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  summary: {
    fontSize: 17,
    textAlign: 'center',
    color: '#808080'
  },
  loginText: {
    color: '#808080',
    marginTop: 25,
    textAlign: 'center',
    display: 'flex',
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  errMsg: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#ba3939',
    marginTop: 10
  },
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
});
