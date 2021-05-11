import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useUserContext } from '../context/UserContext';
import firebase from "../shared/firebase";
import { createUser } from '../shared/methods/Users';
import Form from '../components/Form';

function Register ({ navigation }) {
  const { setUser, isLoggedIn } = useUserContext()
  const [messageProps, setMessageProps] = useState({ message: '', navigate: false })
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
    setState({ ...state, isLoaded: true })
    if (isLoggedIn) {
      navigation.navigate('Stores')
    }
    return () => setMessageProps({ message: '', navigate: false })
  },[]);

  const displayMessage = () => {
    const { message, navigate } = messageProps;
    message && Alert.alert(null, `${message}`, [
      { text: "OK", onPress: () => navigate ? navigation.navigate('Login')
        : setMessageProps({ message: '', navigate: false })}
    ]);
  }

  const updateInputVal = (val, prop) => {
    const currentState = {...state};
    currentState[prop] = val;
    setState(currentState);
  }

  const sendEmailVerification = (currentUser) => {
    currentUser.sendEmailVerification()
    .then(async function() {
      setMessageProps({ message: 'Verification email sent.', navigate: true })
    })
    .catch(function(error) {
      // Error occurred. Inspect error.code.
      setMessageProps({ message: message || error, navigate: false })
    });
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
        setMessageProps({ message: 'Enter details to signup!', navigate: false })
      } else {
        setState({ ...state, isLoading: true })
        firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then((user) => {
          user.user.updateProfile({ displayName: state.displayName })
          .then(async function() {
            await user.user.reload()
            createUser(firebase.auth().currentUser.providerData[0])
            setUser(firebase.auth().currentUser.toJSON())
            sendEmailVerification(user.user)
          }, function(error) {
            const err = error.message || error;
            setMessageProps({ message: err, navigate: false })
            console.log('error', error)
          }).catch(function(error) {
            const err = error.message || error;
            setMessageProps({ message: err, navigate: false })
            console.log('error', error)
          });
        })
        .catch(error => {
          setState({ ...state, isLoading: false})
          setMessageProps({ message: error.message || error, navigate: false })
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
      onAuthSuggestionAction={() => navigation.navigate('Account', { screen: 'Login' })}
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
