import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from '../database/firebase';
import SafeAreaView from 'react-native-safe-area-view';
import Form from '../widgets/Form';
import AuthFooter from '../widgets/AuthFooter';
import Loader from '../widgets/Loader';
import { useUserContext } from '../context/UserContext';

const {height, width} = Dimensions.get('window');

export default function Signup (props) {
  const { isLoggedIn } = useUserContext();
  const [state, setState] = useState({
    username: '',
    email: '', 
    password: '',
    isLoading: false,
    rememberMe: false,
    guide: true,
    isLoaded: false
  })

  useEffect(() => {
    setState({ ...state, isLoaded: true })
    if (isLoggedIn) {
      props.navigation.navigate('Stores')
    }
  },[]);

  const onRememberMe = (isOn) => {
    setState({ ...state, rememberMe: isOn })
  }

  const updateInputVal = (val, prop) => {
    const currentState = {...state};
    currentState[prop] = val;
    setState(currentState);
  }

  const registerUser = () => {
    if(state.email === '' && state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      setState({
        ...state,
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((res) => {
        res.user.updateProfile({
          username: state.username
        })
        setState({
          ...state,
          isLoading: false,
          username: '',
          email: '', 
          password: ''
        })
        props.navigation.navigate('Login')
      })
      .catch(error => {
        setState({
          ...state,
          errorMessage: error.message,
          isLoading: false
        })
      })      
    }
  }

  if(!state.isLoaded) {
    return(
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
    )
  }

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <ScrollView>
        {state.isLoading && <Loader text="Registering" isLoading={state.isLoading} />}
        <View style={styles.container}>
          {state.guide && <View style={styles.introSection}>
            <AntDesign
              onPress={() => setState((curr) => ({ ...curr, guide: !curr.guide, }))}
              style={styles.helpCenterIcon} name="close" size={18} color="black"
            />
            <Text 
              style={styles.helpCenter}
              onPress={() => props.navigation.navigate('Login')}>
              Needs Some Help ?
            </Text>
          </View>}
          <View style={{ flex: 2 }}>
            <View style={styles.headerSection}>
              <Text style={styles.heading}>
                Let's Get Started
              </Text>
              <Text style={styles.summary}>
                Sign up and we will continue 
              </Text>
            </View>
            <Form {...state} isRegistration updateInputVal={updateInputVal} />
            <AuthFooter {...state} onRememberMe={onRememberMe} />
            {state.errorMessage && <Text style={styles.errMsg}>
              {state.errorMessage}
            </Text>}
            <TouchableOpacity
              style={{ backgroundColor: 'blue', borderRadius:10, paddingVertical: 15, marginTop: 30, }}
              title="Signup"
              onPress={registerUser}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Signup</Text>
            </TouchableOpacity>
          </View>
          <Text 
            style={styles.loginText}
            onPress={() => props.navigation.navigate('Login')}>
            Already have an account? <Text style={{ color: 'black', fontWeight: 'bold' }}>Signin</Text>
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
    minHeight: height,
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
    backgroundColor: '#fff'
  }
});