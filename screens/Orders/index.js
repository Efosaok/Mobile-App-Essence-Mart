import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Block, Text, theme } from 'galio-framework';
import History from './History'
import Ongoing from './Ongoing'
import Draft from './Draft'

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <SafeAreaView style={styles.container}>
      <Block flex style={styles.wrapper}>
        <Tab.Navigator
          initialRouteName="Ongoing"
          tabBarOptions={{
            activeTintColor: theme.COLORS.PRIMARY,
            inactiveTintColor: theme.COLORS.MUTED,
            labelStyle: { fontSize: 12, fontWeight: 'bold', },
            // style: { backgroundColor: 'powderblue', },
            indicatorStyle: { backgroundColor: theme.COLORS.PRIMARY },
          }}
        >
          <Tab.Screen
            name="Ongoing"
            component={Ongoing}
            options={{ tabBarLabel: 'Ongoing' }}
          />
          <Tab.Screen
            name="History"
            component={History}
            options={{ tabBarLabel: 'History' }}
          />
          <Tab.Screen
            name="Draft"
            component={Draft}
            options={{ tabBarLabel: 'Draft' }}
          />
        </Tab.Navigator>
      </Block>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 85,
  },
  wrapper: {
    paddingBottom: 10
  },
});

export default MyTabs;
