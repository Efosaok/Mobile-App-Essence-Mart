import React from 'react';
import { Alert } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import { Block, Text, Button } from 'galio-framework';
import TotalComp from './TotalComponent';
import { useUserContext } from '../../context/UserContext';
import { useLocationContext } from '../../context/LocationContext';
import { nowTheme } from "../../constants";

const Footer = (props) => {
  const { isAuthenticated } = useUserContext();
  const { setLastActivity } = useLocationContext()

  const checkout = () => {
    const { navigation, handleClick } = props;
    if (isAuthenticated) {
      return handleClick(() => navigation.navigate('Shopping', { screen: 'Checkout' }))
    }

    Alert.alert(
      null,
      `Please login before proceeding to checkout`,
      [
        { text: "OK", onPress: () => {
          setLastActivity(['Shopping', { screen: 'Checkout' }])
          navigation.navigate('Account', { screen: 'Login' }) 
        }}
      ]
    );
  }

  const { 
    containerStyle, 
    buttonContainerStyle, 
    closeButtonStyle, 
    checkoutButtonStyle } = styles;
  return (
    <Block style={containerStyle}>
      <TotalComp />
      <Block style={buttonContainerStyle}>
        <Button size="small" style={closeButtonStyle}>
          <Text style={{ color: '#fff', fontFamily: 'montserrat-regular' }}>Close</Text>
        </Button>

        <Button onPress={() => checkout()} style={checkoutButtonStyle}>
          <Text style={{ color: '#fff', fontFamily: 'montserrat-regular' }}>Go to checkout</Text>
        </Button>
      </Block>
    </Block>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  closeButtonStyle: {
    // backgroundColor: '#7f8c8d',
    backgroundColor: nowTheme.COLORS.SECONDARY,
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 3,
  }, 
  checkoutButtonStyle: {
    // backgroundColor: '#f39c12',
    backgroundColor: nowTheme.COLORS.PRIMARY,
    padding: 10,
    // paddingRight: 60,
    // paddingLeft: 60,
    borderRadius: 3,
  }
};

export default withNavigation(Footer);