import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useUserContext } from '../context/UserContext';
import firebase from "../shared/firebase";
import { useLocationContext } from '../context/LocationContext';
import Form from '../components/Form';
import { useAlertContext } from '../context/AlertContext';

function Login () {
  const { isLoggedIn } = useUserContext()
  const { lastRouteBeforeAuth } = useLocationContext()
  const gotoRoute = () => navigation.navigate('Account', { screen: 'Register' })
  const navigation = useNavigation();
  const { setAlert } = useAlertContext()
  const { navigate } = navigation
  const [message, setMessage] = useState('')
  const [state, setState] = useState({
    email: '', 
    password: '',
    isLoading: false,
    rememberMe: false,
    guide: true,
    isLoaded: false
  })

  useEffect(() => {
    setState(prevState => ({ ...prevState, isLoaded: true }))
    if (isLoggedIn) navigate('Stores')
  },[isLoggedIn, navigate]);

  const updateInputVal = (val, prop) => {
    const currentState = {...state};
    currentState[prop] = val;
    setState(currentState);
  }

  const redirect = () => {
    if (lastRouteBeforeAuth) navigate(...lastRouteBeforeAuth)
    else {
      navigate('Stores', { screen: 'Stores' })
    }
  }

  const displayMessage = () => message &&  Alert.alert(null, `${message}`, [
      { text: "OK", onPress: () => setMessage("") }
    ])

  const loginUser = () => {
    try {
      if(state.email === '' && state.password === '') {
        setAlert({ message: 'Enter details to login!' })
      } else {
        setState({ ...state, isLoading: true })
        firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then(() => {
          setState({ ...state, isLoading: false, email: '', password: '' })
          redirect()
        })
        .catch(error => {
          setState({ ...state, isLoading: false })
          setAlert({ message: error.message || error, title: 'ÉRROR' })
        })      
      }
    } catch (error) {
      setAlert({ message: error.message || error, title: 'ERROR' })
    }
  }

  return (
    <Form
      heading="Login"
      action="Login"
      updateInputVal={updateInputVal}
      onAuthSuggestionAction={gotoRoute}
      authSuggestionDescription="Need an account? "
      authSuggestionAction="Register"
      displayMessage={displayMessage}
      isLoading={state.isLoading}
      onPress={loginUser}
      inputData={state}
      isLogin
    />
  )
}

export default Login;
