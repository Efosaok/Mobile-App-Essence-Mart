import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import { Switch } from "../../components";

import nowTheme from "../../constants/Theme";

const Settings = (props) => {
  const [state, setState] = useState({});

  const toggleSwitch = switchNumber =>
    setState({ [switchNumber]: !state[switchNumber] });

  const renderItem = ({ item }) => {
    const { navigate } = props.navigation;

    switch (item.type) {
      case "switch":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="#525F7F">{item.title}</Text>
            <Switch
              onValueChange={() => toggleSwitch(item.id)}
              value={state[item.id]}
            />
          </Block>
        );
      case "button":
        return (
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigate('Settings', { screen: item.id })}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="#525F7F">{item.title}</Text>
                <Icon
                  name="angle-right"
                  family="font-awesome"
                  style={{ paddingRight: 5 }}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        );
      default:
        break;
    }
  };

  const settings = [
    {
      title: "Recommended Settings",
      desc: "These are the most important settings",
      items: [
        { title: "Use FaceID to sign in", id: "face", type: "switch" },
        { title: "Auto-Lock security", id: "autolock", type: "switch" },
        { title: "Notifications", id: "NotificationsSettings", type: "button" }
      ]
    },
    {
      title: "Payment Settings",
      desc: "These are also important settings",
      items: [
        { title: "Manage Payment Options", id: "Payment", type: "button" },
        { title: "Manage Gift Cards", id: "gift", type: "button" }
      ]
    },
    {
      title: "Privacy Settings",
      desc: "Third most important settings",
      items: [
        { title: "User Agreement", id: "Agreement", type: "button" },
        { title: "Privacy", id: "Privacy", type: "button" },
        { title: "About", id: "About", type: "button" }
      ]
    }
  ]

  const ItemComponent = (itemProps) => {
    const { item: { title, desc, items } } = itemProps || { item: {} }

    return (
      <>
        <Block center style={styles.title}>
          <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
            {title}
          </Text>
          <Text style={{ fontFamily: 'montserrat-regular' }} size={12} color={nowTheme.COLORS.CAPTION}>
            {desc}
          </Text>
        </Block>
        <FlatList
          data={(items) || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </>
    )
    }

  return (
    <SafeAreaView style={styles.container}>
      <Block flex style={styles.wrapper}>
        <Block flex row>
          <FlatList
            data={settings}
            keyExtractor={(item) => item.title.split(' ').join('-')}
            renderItem={ItemComponent}
          />
        </Block>
      </Block>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  wrapper: {
    paddingBottom: 10
  },
  settings: {
    paddingVertical: theme.SIZES.BASE / 3
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2
  }
});

export default Settings;
