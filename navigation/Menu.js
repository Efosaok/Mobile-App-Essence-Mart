import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { Block, Text, theme } from "galio-framework";

// import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";

import nowTheme from "../constants/Theme";
import { useUserContext } from "../context/UserContext";

const { width } = Dimensions.get("screen");

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  routeName,
  ...rest
}) {
  const { user, isAuthenticated } = useUserContext()
  const [screens, setScreens] = useState([
    { title: "Stores", to: 'Home' },
    { title: "Login / Register", to: "Account" },
    { title: "Custom Orders", to: "CustomOrders" },
    { title: "Track Orders", to: 'TrackOrder' },
    { title: "Notification" },
    // { title: "Components", to: 'Components' },
    // { title: "Articles", to: 'Articles' },
    // { title: "Profile", to: 'Profile' },
    // { title: "Account", to: 'Account' },
  ])

  useEffect(() => {
    try {
      let items = JSON.parse(JSON.stringify(screens))
      if (isAuthenticated) {
        items = items.map((item) => {
          if (item.to === "Account") {
            return { title: "Profile", to: "Profile" }
          }
          return item
        })
        setScreens(items)
      }
    } catch (error) {
      console.log('useEffect Menu component - error', error)
    }
  }, [isAuthenticated])

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon
            name="align-left-22x"
            family="NowExtra"
            size={15}
            color={"white"}
          />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item.title}
                to={item.to}
                key={index}
                navigation={navigation}
                focused={(routeName === item.to || routeName === item.title) ? true : false}
              />
            );
          })}
        <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
          <Block
            style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}}
          />
          <Text
            color={nowTheme.COLORS.WHITE}
            style={{ marginTop: 30, marginLeft: 20, marginBottom: 10, fontFamily: 'montserrat-regular', fontWeight: '300', fontSize: 12}}
          >
            MORE{/* DOCUMENTATION */}
          </Text>
        </Block>
        <DrawerCustomItem title="Settings" navigation={navigation}/>
        <DrawerCustomItem title="Call Customer Care" navigation={navigation}/>
        <DrawerCustomItem title="Contact US / App Help" navigation={navigation}/>
        {isAuthenticated && <DrawerCustomItem title="LOGOUT" navigation={navigation}/>}
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center"
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 40,
    width: 45// 37
  }
});

export default CustomDrawerContent;
