/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { lazy } from 'react';
import { Block } from "galio-framework";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import { Header} from '../components';
import { nowTheme } from "../constants";
import { useUserContext } from '../context/UserContext';
import { useCartContext } from '../context/CartContext';
// screens
import Home from '../screens/Home';
import Onboarding from '../screens/Onboarding';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Stores from '../screens/Stores';
import Store from '../screens/Store';

import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Checkout from '../screens/Checkout';

const CartScreen = lazy(() => import('../screens/Cart'));
const Settings = lazy(() => import('../screens/Settings/Settings'));
const OrderConfirmed = lazy(() => import('../screens/Order/OrderConfirmed'));
const OrderTracking = lazy(() => import('../screens/Orders'));
const OrderInformation = lazy(() => import('../screens/Order/OrderInformation'));
const CustomOrders = lazy(() => import('../screens/CustomOrders/Views'));
const EditCustomOrders = lazy(() => import('../screens/CustomOrders/Edit'));
const Notification = lazy(() => import('../screens/Settings/Notification'));
const Rating = lazy(() => import('../screens/Rating'));

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CheckoutStack(props) {
  return (
    <Stack.Navigator initialRouteName="Cart" mode="card" headerMode="screen">
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation, scene, route }) => (
            <Header
              // transparent
              title="Shopping Cart"
              navigation={navigation}
              scene={scene}
              route={route}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // transparent
              title="Checkout"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="OrderConfirmed"
        component={OrderConfirmed}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // transparent
              title="Confirmed Order"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function OrderStack(props) {
  return (
    <Stack.Navigator initialRouteName="Cart" mode="card" headerMode="screen">
      <Stack.Screen
        name="Order"
        component={OrderTracking}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // transparent
              title="Order"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="OrderInformation"
        component={OrderInformation}
        options={{

          // header: ({ navigation, scene }) => (
          //   <Header
          //     // transparent
          //     title="Order"
          //     navigation={navigation}
          //     scene={scene}
          //   />
          // ),
          // headerTransparent: true

          headerTitleStyle: { display: 'none' },
          headerBackTitleStyle:{ color: nowTheme.COLORS.PRIMARY, display: 'none' },
          headerTintColor: nowTheme.COLORS.PRIMARY,
        }}
      />
      <Stack.Screen
        name="Rating"
        component={Rating}
        options={{

          // header: ({ navigation, scene }) => (
          //   <Header
          //     // transparent
          //     title="Order"
          //     navigation={navigation}
          //     scene={scene}
          //   />
          // ),
          // headerTransparent: true

          headerTitle: "Rate your order",
          // headerTitleStyle: { display: 'none' },
          headerBackTitleStyle:{ color: nowTheme.COLORS.PRIMARY, display: 'none' },
          headerTintColor: nowTheme.COLORS.PRIMARY,
        }}
      />
    </Stack.Navigator>
  );
}

function OrdersStack(props) {
  return (
    <Stack.Navigator initialRouteName="Cart" mode="card" headerMode="screen">
      <Stack.Screen
        name="CustomOrders"
        component={CustomOrders}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              // transparent
              title="Custom Orders"
              navigation={navigation}
              hideTitle
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="CustomOrdersEdit"
        component={EditCustomOrders}
        options={{
          // header: ({ navigation, scene }) => (
          //   <Header
          //     // transparent
          //     title="Edit Custom Orders"
          //     navigation={navigation}
          //     // hideTitle
          //     isBack
          //     scene={scene}
          //   />
          // ),
          // headerTransparent: true

          // headerTitleStyle: { display: 'none' },
          headerBackTitleStyle:{ color: nowTheme.COLORS.PRIMARY, display: 'none' },
          headerTintColor: nowTheme.COLORS.PRIMARY,
          headerTitle: "Custom Orders"
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator initialRouteName="Register" mode="card" headerMode="screen">
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              transparent
              title="Create Account"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              transparent
              title="Account Login"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="ViewProfile" mode="card" headerMode="screen">
      <Stack.Screen
        name="ViewProfile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Edit Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}


function SettingsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Main" mode="card" headerMode="screen">
      <Stack.Screen
        name="Main"
        component={Settings}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Settings"
              context
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="NotificationsSettings"
        component={Notification}
        options={{
          // headerTitleStyle: { display: 'none' },
          headerBackTitleStyle:{ color: nowTheme.COLORS.PRIMARY, display: 'none' },
          headerTintColor: nowTheme.COLORS.PRIMARY,
          headerTitle: "Notifications Settings"
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              context
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}

function StoresStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Stores"
        component={Stores}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Stores"
              context
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}


function StoreStack(props) {
  const { store } = useCartContext()
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Store"
        component={Store}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title={(store && store.title) || "Store"}
              context
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  const { isAuthenticated } = useUserContext();
  const { route } = props;
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  const renderAccount = () => {
    try {
      if (isAuthenticated) {
        return <Drawer.Screen name="Profile" component={ProfileStack} />
      }
      return <Drawer.Screen name="Account" component={AccountStack} />
    } catch (error) {
      console.log('AppStack - renderAccount', error)
      return error;
    }
  }

  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={propsDrawer => <CustomDrawerContent routeName={routeName} {...propsDrawer} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      {renderAccount()}
      <Drawer.Screen name="Stores" component={StoresStack} />
      <Drawer.Screen name="TrackOrder" component={OrderStack} />
      <Drawer.Screen name="Orders" component={OrdersStack} />
      <Drawer.Screen name="Store" component={StoreStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
      <Drawer.Screen name="Shopping" component={CheckoutStack} />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

