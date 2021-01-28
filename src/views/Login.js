// components/login.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from '../database/firebaseDB';
import SafeAreaView from 'react-native-safe-area-view';
import Form from '../widgets/Form';
import AuthFooter from '../widgets/AuthFooter';

const {height, width} = Dimensions.get('window');


export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false,
      rememberMe: false,
      guide: true
    }
  }

  onRememberMe = (isOn) => {
    this.setState({ ...this.state, rememberMe: isOn })
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Stores')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <SafeAreaView forceInset={{ top: 'always' }}>
        <ScrollView>
          <View style={styles.container}>
            {this.state.guide && <View style={styles.introSection}>
              <AntDesign
                onPress={() => this.setState((curr) => ({ ...curr, guide: !curr.guide, }))}
                style={styles.helpCenterIcon} name="close" size={18} color="black"
              />
              <Text 
                style={styles.helpCenter}
                onPress={() => this.props.navigation.navigate('Login')}>
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
              <Form {...this.state} updateInputVal={this.updateInputVal} />
              <AuthFooter {...this.state} onRememberMe={this.onRememberMe} />
              <TouchableOpacity
                style={{ backgroundColor: 'blue', borderRadius:10, paddingVertical: 15, marginTop: 30, }}
                title="Signup"
                onPress={this.userLogin}
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
