import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import nowTheme from "../constants/Theme";
import { useUserContext } from "../context/UserContext";

const DrawerItem = (props) => {
  const { logoutSuccess } = useUserContext()

  const renderIcon = () => {
    const { title, focused } = props;

    switch (title) {
      case "Stores":
        return (
          <Icon
            name="shop2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Login / Register":
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Custom Orders":
        return (
          <Icon
            name="tag-content2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Track Orders":
        return (
          <Icon
            name="watch-time2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Call Customer Care":
        return (
          <Icon
            name="headphones-22x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Notification":
        return (
          <Icon
            name="time-alarm2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Contact US / App Help":
        return (
          <Icon
            name="email-852x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Home":
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Components":
        return (
          <Icon
            name="atom2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Settings":
        return (
          <Icon
            name="settings-gear-642x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Articles":
        return (
          <Icon
            name="paper"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Profile":
        return (
          <Icon
            name="profile-circle"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Account":
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Settings":
        return (
          <Icon
            name="settings-gear-642x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Examples":
        return (
          <Icon
            name="album"
            family="NowExtra"
            size={14}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      case "GETTING STARTED":
        return (
          <Icon
            name="spaceship2x"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      case "LOGOUT":
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      default:
        return null;
    }
  };
  const { focused, title, navigation, to } = props;

  const containerStyles = [
    styles.defaultStyle,
    focused ? [styles.activeStyle, styles.shadow] : null
  ];

  const logoutUser = () => {
    try {
      if (title == 'LOGOUT') {
        logoutSuccess()
        .then(() => {
          navigation.navigate('Onboarding')
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
          // ADD THIS THROW error
          // throw error;
        });
      } else if (title == 'Settings') {
        navigation.navigate('Settings', { screen: 'Settings' })
      } else if (title == "GETTING STARTED") {
        Linking.openURL(
          "https://demos.creative-tim.com/now-ui-pro-react-native/docs/"
        ).catch(err => console.error("An error occurred", err))
      } else if (to) {
        navigation.navigate(to)
      }
    } catch (error) {
      console.log('drawer', error)
    }
  }

  return (
    <TouchableOpacity
      style={{ height: 60 }}
      onPress={() => logoutUser()}
    >
      <Block flex row style={containerStyles}>
        <Block middle flex={0.1} style={{ marginRight: 5 }}>
          {renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text
            style={{
              fontFamily: "montserrat-regular",
              textTransform: "uppercase",
              fontWeight: "300"
            }}
            size={12}
            bold={focused ? true : false}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
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
