import React from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useCartContext } from '../context/CartContext';
// import axios from 'axios'
// https://medium.com/react-native-nigeria/integrating-payment-in-your-react-native-application-in-nigeria-53962aa116c6

export default function Checkout(props) {
  const { payment } = useCartContext();
  const WEBVIEW_REF = React.createRef()
  // const authorization_url = 'https://checkout.paystack.com/luKuasMan';
  const callback_url = 'https://yourcallback.com';

  const onNavigationStateChange = state => {
 
    const { url } = state;
    if (!url) return;
    if (url === callback_url) {
			// get transaction reference from url and verify transaction, then redirect
      const redirectTo = 'window.location = "' + callback_url + '"';
      WEBVIEW_REF.injectJavaScript(redirectTo);
    }

	if(url === 'https://standard.paystack.co/close') {
      // handle WEBVIEW_REF removal
      // You can either unmount the component, or
      // Use a navigator to pop off the view
    }
  };

  if (!payment) {
    return Alert.alert(null, 'Unable to Process the payment, Pleas try again.', [
      { text: "OK", onPress: () => props.navigation.navigate('Shopping', { screen: 'Cart' }) }
    ])
  }

  return (
    <WebView
      ref={WEBVIEW_REF}
      source={{ uri: payment.authorization_url }}
      style={{ marginTop: 40 }}
      onNavigationStateChange={ onNavigationStateChange }
    />
  );
}
