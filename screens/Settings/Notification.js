import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  FlatList,
  SafeAreaView
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import nowTheme from "../../constants/Theme";

const Notification = () => {
  const notifications = [
    {
      title: "Payment Failed",
      desc: "These are the most important settings"
    },
    {
      title: "Payment Sucessful",
      desc: "These are the most important settings"
    }
  ]

  const ItemComponent = (itemProps) => {
    const { item } = itemProps
    const title = item && item.title
    const desc = item && item.desc

    return(
      <>
        <Block style={styles.title}>
          <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.INPUT_LABEL_TEXT} color={nowTheme.COLORS.TEXT}>
            {title}
          </Text>
          <Text style={{ fontFamily: 'montserrat-regular' }} size={12} color={nowTheme.COLORS.TEXT}>
            {desc}
          </Text>
        </Block>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Block flex style={styles.wrapper}>
        <Block flex row>
          <FlatList
            data={notifications}
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
    paddingBottom: theme.SIZES.BASE / 2,
    paddingHorizontal: theme.SIZES.BASE,
    borderBottomWidth: 0.2
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2
  }
});

export default Notification;
