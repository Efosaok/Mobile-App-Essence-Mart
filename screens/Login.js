import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import { useUserContext } from '../context/UserContext';
import firebase from "../shared/firebase";

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

function Register (props) {
  const { setUser, isLoggedIn } = useUserContext()
  const [state, setState] = useState({
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
      .signInWithEmailAndPassword(state.email, state.password)
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
        throw error;
      })      
    }
  }

  return (
    <DismissKeyboard>
      <Block flex middle>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      color="#333"
                      size={24}
                    >
                      Login
                    </Text>
                  </Block>

                  <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>
                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="twitter"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.TWITTER}
                      style={[styles.social, styles.shadow]}
                    />

                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="dribbble"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.DRIBBBLE}
                      style={[styles.social, styles.shadow]}
                    />
                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="facebook"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.FACEBOOK}
                      style={[styles.social, styles.shadow]}
                    />
                  </Block>
                </Block>
                <Block flex={0.1} middle>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular',
                      textAlign: 'center'
                    }}
                    muted
                    size={16}
                  >
                    or be classical
                  </Text>
                </Block>
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Email"
                            style={styles.inputs}
                            onChangeText={(val) => updateInputVal(val, 'email')}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="email-852x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Password"
                            style={styles.inputs}
                            secureTextEntry={true}
                            onChangeText={(val) => updateInputVal(val, 'password')}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="lock-circle-open2x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block
                          style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15}}
                          row
                          width={width * 0.75}
                        >
                          <Checkbox
                            checkboxStyle={{
                              borderWidth: 1,
                              borderRadius: 2,
                              borderColor: '#E3E3E3'
                            }}
                            color={nowTheme.COLORS.PRIMARY}
                            labelStyle={{
                              color: nowTheme.COLORS.HEADER,
                              fontFamily: 'montserrat-regular'
                            }}
                            label="I agree to the terms and conditions."
                          />
                        </Block>
                      </Block>
                      <Block center>
                        <Button color="primary" round style={styles.createButton}>
                          <Text
                            style={{ fontFamily: 'montserrat-bold' }}
                            size={14}
                            onPress={registerUser}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Get Started
                          </Text>
                        </Button>
                      </Block>
                      <Block>
                        <Text 
                          // style={styles.loginText}
                          onPress={() => props.navigation.navigate('Login')}>
                          Already have an account? <Text style={{ color: 'black', fontWeight: 'bold' }}>Signin</Text>
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

export default Register;
