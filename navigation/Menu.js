import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";

// import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";

import nowTheme from "../constants/Theme";
import { useUserContext } from "../context/UserContext";

const moreTextStyle = { marginTop: 30, marginLeft: 20, marginBottom: 10, fontFamily: 'montserrat-regular', fontWeight: '300', fontSize: 12}
const dividerStyle = { borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}
const moreStyle = { marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }
const customInset = { top: "always", horizontal: "never" }
const screenStyles = { paddingLeft: 8, paddingRight: 14 }
const scrollStyle = { flex: 1 }
const routes = [
  { title: "Stores", to: 'Home' },
  { title: "Login / Register", to: "Account" },
  { title: "Custom Orders", to: ['Orders', { screen: 'CustomOrdersEdit' }] },
  { title: "Track Orders", to: 'TrackOrder' },
  { title: "Notification", to: ['Settings', { screen: 'NotificationsSettings' }]  },
]

const CustomDrawerContent = ({
  navigation,
  routeName
}) => {
  const { isAuthenticated } = useUserContext()
  const [screens, setScreens] = useState(routes)

  const compareRoute = (item) => {
    if (!item || typeof item === 'string' ) {
      return routeName === item
    } if (typeof item.to !== 'string' && typeof item.to !== 'undefined') {
      return routeName === item.to[0] || routeName === item.title
    }
    return routeName === item.to || routeName === item.title;
  }

  useMemo(() => {
    try {
      let items = JSON.parse(JSON.stringify(routes))
      if (isAuthenticated) {
        items = items.map((item) => {
          if (item.to === "Account") {
            return { title: "Profile", to: "Profile" }
          }
          return item
        })
        setScreens(items)
      }
      return items
    } catch (error) {
      console.log('useEffect Menu component - error', error)
    }

    return () => {};
  }, [isAuthenticated])

  return (
    <Block
      style={styles.container}
      forceInset={customInset}
    >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon
            name="align-left-22x"
            family="NowExtra"
            size={15}
            color="white"
          />
        </Block>
      </Block>
      <Block flex style={screenStyles}>
        <ScrollView style={scrollStyle} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            const key = `${item.title}--index--${index}`
            return (
              <DrawerCustomItem
                title={item.title}
                to={item.to}
                key={key}
                navigation={navigation}
                focused={compareRoute(item)}
              />)
            })}
        <Block flex style={moreStyle}>
          <Block
            style={dividerStyle}
          />
          <Text
            color={nowTheme.COLORS.WHITE}
            style={moreTextStyle}
          >
            MORE{/* DOCUMENTATION */}
          </Text>
        </Block>
        <DrawerCustomItem focused={compareRoute('Settings')} title="Settings" navigation={navigation}/>
        <DrawerCustomItem focused={compareRoute("Call Customer Care")} title="Call Customer Care" navigation={navigation}/>
        <DrawerCustomItem focused={compareRoute("Contact US / App Help")} title="Contact US / App Help" navigation={navigation}/>
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
