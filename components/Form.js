import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from ".";
import { Images, nowTheme } from '../constants';
import Loader from "./Loader";

const { width, height } = Dimensions.get('screen');

const dismissKeyboard = () =>  Keyboard.dismiss()

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={dismissKeyboard}>{children}</TouchableWithoutFeedback>
);

const emptyFunc = () => {}

function Form ({
    displayMessage,
    updateInputVal,
    onPress,
    heading,
    action,
    authSuggestionDescription,
    authSuggestionAction,
    onAuthSuggestionAction,
    isLoading,
    loaderMessage,
    isLogin,
    isEditProfile,
    inputData,
    isCustomOrder
}) {
  return (
    <DismissKeyboard>
      <Block flex middle>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
        >
        {/* {displayMessage()} */}
        {isLoading && <Loader text={loaderMessage} isLoading={isLoading} />}
          <Block flex middle>
            <Block style={{...styles.registerContainer, ...(isEditProfile || isCustomOrder ? { height, marginTop: 0 } : null)}}>
              <Block flex space="evenly">
                {!isCustomOrder && <Block flex={0.4} middle style={{...styles.socialConnect, display: isEditProfile ? 'none' : 'flex'}}>
                  <Block flex={0.5} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      color="#333"
                      size={24}
                    >
                      {heading}
                    </Text>
                  </Block>

                  <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>
                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="google"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.GOOGLE}
                      style={[styles.social, styles.shadow]}
                    />

                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="facebook"
                      iconFamily="Font-Awesome"
                      onPress={emptyFunc}
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.FACEBOOK}
                      style={[styles.social, styles.shadow]}
                    />
                  </Block>
                </Block>}
                <Block flex={0.1} middle style={{ display: (isEditProfile || isCustomOrder) ? 'none' : 'flex' }}>
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
                      {!isCustomOrder ? <Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Email"
                            style={styles.inputs}
                            editable={!isEditProfile}
                            value={inputData.email}
                            autoCapitalize="none"
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
                        <Block width={width * 0.8} style={{ marginBottom: 5, display: isLogin ? 'none' : 'flex' }}>
                          <Input
                            placeholder="Display Name"
                            style={styles.inputs}
                            value={inputData.displayName}
                            onChangeText={(val) => updateInputVal(val, 'displayName')}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="profile-circle"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5, display: isEditProfile ? 'flex' : 'none' }}>
                          <Input
                            placeholder="Phone number"
                            style={styles.inputs}
                            value={inputData.phoneNumber}
                            onChangeText={(val) => updateInputVal(val, 'phoneNumber')}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="mobile2x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5, display: isEditProfile ? 'flex' : 'none' }}>
                          <Input
                            placeholder="Street Address"
                            style={styles.inputs}
                            value={inputData.streetAddress}
                            onChangeText={(val) => updateInputVal(val, 'streetAddress')}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="map-big2x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5, display: isEditProfile ? 'flex' : 'none' }}>
                          <Input
                            placeholder="City, State"
                            style={styles.inputs}
                            value={inputData.streetAddress2}
                            onChangeText={(val) => updateInputVal(val, 'streetAddress2')}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="pin-32x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ display: isEditProfile ? 'none' : 'flex'  }}>
                          <Input
                            placeholder="Password"
                            style={styles.inputs}
                            // secureTextEntry={true}
                            value={inputData.password}
                            viewPass
                            password
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
                          style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15, display: isEditProfile ? 'none' : 'flex' }}
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
                      : <Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Title"
                            style={styles.inputs}
                            editable={!isEditProfile}
                            value={inputData.title}
                            onChangeText={(val) => updateInputVal(val, 'title')}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="cube-size2x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                      </Block>}
                      {!isCustomOrder && <Block center style={{ display: isEditProfile ? 'none' : 'flex' }}>
                        <Button onPress={onPress} color="primary" round style={styles.createButton}>
                          <Text
                            style={{ fontFamily: 'montserrat-bold' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            {action}
                          </Text>
                        </Button>
                      </Block>}
                      {!isCustomOrder && <Block style={{ display: isEditProfile ? 'none' : 'flex' }}>
                        <Text 
                          // style={styles.loginText}
                          onPress={onAuthSuggestionAction}>
                          {authSuggestionDescription}
                          <Text style={{ color: 'black', fontWeight: 'bold' }}> {authSuggestionAction}</Text>
                        </Text>
                      </Block>}
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
    width,
    height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width,
    height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.9 : height * 0.8,
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

export default Form;
