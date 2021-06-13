import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import nowTheme from "../constants/Theme";
import { useUserContext } from "../context/UserContext";
import logger from "../config/logger";

const drawerStyle = { opacity: 0.5 }
const drawerIconContainer = { marginRight: 5 }
const drawerIconStyle = { borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }
const drawerContainer = { height: 60 }
const drawerTextStyle = {
  fontFamily: "montserrat-regular",
  textTransform: "uppercase",
  fontWeight: "300"
}

const DrawerItem = (props) => {
  const { logoutSuccess } = useUserContext()
  const { title, focused, navigation, to } = props;
  const drawerIconColor = focused ? nowTheme.COLORS.PRIMARY : "white"
  const containerStyles = [
    styles.defaultStyle,
    focused ? [styles.activeStyle, styles.shadow] : null
  ];
  const toUpperCase = (str) => (str || str.toUpperCase()) || str

  const logoutUser = () => {
    try {
      if (toUpperCase(title) === 'LOGOUT') {
        logoutSuccess()
        .then(() => {
          navigation.navigate('Onboarding')
        })
        .catch((error) => {
          logger.error(`There has been a problem with your fetch operation: ${  error.message}`);
          // ADD THIS THROW error
          // throw error;
        });
      } else if (toUpperCase(title) === 'SETTINGS') {
        navigation.navigate('Settings', { screen: 'Settings' })
      } else if (toUpperCase(title) === "GETTING STARTED") {
        Linking.openURL(
          "https://demos.creative-tim.com/now-ui-pro-react-native/docs/"
        ).catch(err => logger.error("An error occurred", err))
      } else if (typeof to === 'object') {
        navigation.navigate(...to)
      } else if (to) {
        navigation.navigate(to)
      }
    } catch (error) {
      logger.error('drawer', error)
    }
  }

  const renderIcon = () => {
    switch (title) {
      case "Stores":
        return (
          <Icon
            name="shop2x"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Login / Register":
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Custom Orders":
        return (
          <Icon
            name="tag-content2x"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Track Orders":
        return (
          <Icon
            name="watch-time2x"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Call Customer Care":
        return (
          <Icon
            name="headphones-22x"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Notification":
        return (
          <Icon
            name="time-alarm2x"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Contact US / App Help":
        return (
          <Icon
            name="email-852x"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Home":
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Components":
        return (
          <Icon
            name="atom2x"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Settings":
        return (
          <Icon
            name="settings-gear-642x"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Articles":
        return (
          <Icon
            name="paper"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Profile":
        return (
          <Icon
            name="profile-circle"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Account":
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={18}
            color={drawerIconColor}
            style={drawerStyle}
          />
        );
      case "Examples":
        return (
          <Icon
            name="album"
            family="NowExtra"
            size={14}
            color={drawerIconColor}
          />
        );
      case "GETTING STARTED":
        return (
          <Icon
            name="spaceship2x"
            family="NowExtra"
            size={18}
            style={drawerIconStyle}
            color={drawerIconColor}
          />
        );
      case "LOGOUT":
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={drawerIconStyle}
            color={drawerIconColor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={drawerContainer}
      onPress={logoutUser}
    >
      <Block flex row style={containerStyles}>
        <Block middle flex={0.1} style={drawerIconContainer}>
          {renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text
            style={drawerTextStyle}
            size={12}
            bold={!!focused}
            color={drawerIconColor}
          >
            {title}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: "white"
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: "white"
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
