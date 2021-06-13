import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../context/UserContext';
import firebase from "../shared/firebase";
import { createUser } from '../shared/methods/Users';
import Form from '../components/Form';
import { useAlertContext } from '../context/AlertContext';

function Register () {
  const { setUser, isLoggedIn } = useUserContext()
  const [messageProps, setMessageProps] = useState({ message: '', navigate: false })
  const { setAlert } = useAlertContext()
  const { navigate } = useNavigation()
  const [state, setState] = useState({
    displayName: '',
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
    return () => setMessageProps({ message: '', navigate: false })
  },[isLoggedIn, navigate]);

  const gotoLogin = () => navigate('Account', { screen: 'Login' })

  const onConfirm = () => {
    const { navigate: canNavigate } = messageProps;
    if (canNavigate) {
      navigate('Login')
    } else { setMessageProps({ message: '', navigate: false }) }
  }

  const displayMessage = () => {
    const { message } = messageProps;
    setAlert({ message, onConfirm });
  }

  const updateInputVal = (val, prop) => {
    const currentState = {...state};
    currentState[prop] = val;
    setState(currentState);
  }

  const sendEmailVerification = (currentUser) => {
    currentUser.sendEmailVerification()
    .then(() => setAlert({ message: 'Verification email sent.' }))
    .catch((error) => setAlert({ message: error.message || error, title: 'ERROR' }));
  }

  // const registerWithFB = () => {
  //   try {
  //     onFacebookButtonPress()
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //   } catch (error) {
  //     console.log('errorerrorerror', error)
  //   }
  // }

  const registerUser = () => {
    try {
      if(state.email === '' && state.password === '') {
        setAlert({ message: 'Enter details to signup!' });
      } else {
        setState({ ...state, isLoading: true })
        firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then((user) => {
          user.user.updateProfile({ displayName: state.displayName })
          .then(async () => {
            await user.user.reload()
            const { providerData } = firebase.auth().currentUser.toJSON()
            // console.log('firebase.auth().currentUser.toJSON()', firebase.auth().currentUser.toJSON())
            // console.log('firebase.auth().currentUser.providerData[0]', providerData[0])
            createUser(providerData[0])
            setUser(firebase.auth().currentUser.toJSON())
            sendEmailVerification(user.user)
          }, (error) => {
            setAlert({ message: error.message || error });
            console.log('error', error)
          }).catch((error) => {
            const err = { message: error.message || error};
            setAlert({ ...err, title: 'ERROR' });
            console.log('error', error)
          });
        })
        .catch(error => {
          setState({ ...state, isLoading: false })
          setAlert({ message: error.message || error, title: 'ERROR' });
        })
      }
    } catch (error) {
      console.log('error---register', error)
    }
  }

  return (
    <Form
      heading="Register"
      action="Get Started"
      updateInputVal={updateInputVal}
      onAuthSuggestionAction={gotoLogin}
      authSuggestionDescription="Already have an account? "
      authSuggestionAction="Signin"
      displayMessage={displayMessage}
      isLoading={state.isLoading}
      onPress={registerUser}
      inputData={state}
    />
  )
}

export default Register;
