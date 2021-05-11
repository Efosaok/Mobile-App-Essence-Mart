import React from 'react';
import { Block } from "galio-framework";
import { Easing, Animated, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// screens
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Articles from '../screens/Articles';
import Onboarding from '../screens/Onboarding';
import Stores from '../screens/Stores';
import Store from '../screens/Store';
import CartScreen from '../screens/Cart';
import Settings from '../screens/Settings';
import Checkout from '../screens/Checkout';
import OrderConfirmed from '../screens/Order/OrderConfirmed';
import OrderTracking from '../screens/Orders';
import OrderInformation from '../screens/Order/OrderInformation';
// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import { Header, Icon} from '../components';
import { nowTheme, tabs } from "../constants";
import { useUserContext } from '../context/UserContext';
import { useCartContext } from '../context/CartContext';
import Dashboard from '../screens/Dashboard';

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ArticlesStack(props) {
  return (
    <Stack.Navigator initialRouteName="Articles" mode="card" headerMode="screen">
      <Stack.Screen name="Articles" component={Articles} options={{
        header: ({ navigation, scene }) => (<Header title="Articles" navigation={navigation} scene={scene} />),
        backgroundColor: '#FFFFFF'
      }} />
    </Stack.Navigator>
  );
}

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
    <Stack.Navigator initialRouteName="Settings" mode="card" headerMode="screen">
      <Stack.Screen
        name="Settings"
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
  const routeName = getFocusedRouteNameFromRoute(props.route) ?? 'Home';

  const renderAccount = () => {
    try {
      if (isAuthenticated) {
        return <Drawer.Screen name="Profile" component={ProfileStack} />
      }
      return <Drawer.Screen name="Account" component={AccountStack} />
    } catch (error) {
      console.log('AppStack - renderAccount', error)
    }
  }

  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent routeName={routeName} {...props} />}
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
      {/* <Drawer.Screen name="Components" component={ComponentsStack} /> */}
      {renderAccount()}
      <Drawer.Screen name="Stores" component={StoresStack} />
      <Drawer.Screen name="TrackOrder" component={OrderStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
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

