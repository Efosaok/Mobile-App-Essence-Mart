import { Block } from 'galio-framework';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios'
import { useCartContext } from '../context/CartContext';
import Loader from '../components/Loader';
import { useToastContext } from '../context/ToastContext';
import { createOrder } from '../shared/methods/Orders';
import { useUserContext } from '../context/UserContext';
// https://medium.com/react-native-nigeria/integrating-payment-in-your-react-native-application-in-nigeria-53962aa116c6

const verifyTransaction = (reference) => `https://api.paystack.co/transaction/verify/${reference}`

let checkoutCount = 0;

export default function Checkout(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [loaderMessage, setLoaderMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [hasCheckout, setCheckout] = useState(false)
  const { setToast } = useToastContext()
  const { user } = useUserContext()
  const { payment, updateCartPayment, cart } = useCartContext();
  // const {} = use
  const WEBVIEW_REF = React.createRef()
  // const authorization_url = 'https://checkout.paystack.com/luKuasMan';
  const callback_url = 'https://standard.paystack.co/close';
  var $urlPattern = new RegExp('^' + callback_url, 'i');
  const matchUrl = (value, vm) => {
    return $urlPattern.test(value)
  }

  const showScreen = () => {
    errorMessage && Alert.alert(null, errorMessage, [
      { text: "OK", onPress: () => setErrorMessage("") }
    ])
  }

  const getPaymentInfo = async () => {
    try {
      setIsLoading(true)
      setLoaderMessage('Please wait while we verify your payment')
      const options = {
        url: verifyTransaction(payment.reference),
        method: 'GET',
        headers: {
          Authorization: 'Bearer sk_test_596f74c8f5735986902eb2e4260eff33b2304649',
          'Content-Type': 'application/json'
        }
      }
      await axios(options)
      .then((res) => {
        setToast({ message: `Your Order has been placed successfuly
          We\'d redirect you to history`, type: 'success'})
        setIsLoading(false)
        setErrorMessage('')
        setLoaderMessage('')
        updateCartPayment(res.data)
        createOrder(cart, user)
        const timeout = setTimeout(() => {
          clearTimeout(timeout)
          checkoutCount = 0
          // setMessage('')
          props.navigation.navigate('Shopping', { screen: 'Cart' })
        }, 5000);
      })
      .catch((error) => {
        console.log('error', JSON.stringify(error))
        setErrorMessage(error.message || error)
        setLoaderMessage('')
        setIsLoading(false)
      })
    } catch (error) {
      console.log('getPaymentInfo - Checkout', error)
    }
  }

  const onNavigationStateChange = async state => {
    try {
      const { url } = state;
      if (!url) return;
      console.log('url', url)
      if (matchUrl(url)) checkoutCount += 1
      if(checkoutCount > 1 && !hasCheckout && matchUrl(url)) {
        setCheckout(true)
        getPaymentInfo()
      }
    } catch (error) {
      console.log('onNavigationStateChange - Checkout', error)
    }
  };

  if (!payment) {
    try {
      <Block flex row style={{ marginTop: 40, marginVertical: 8, }}>
        {Alert.alert(null, 'Unable to Process the payment, Pleas try again.', [
          { text: "OK", onPress: () => props.navigation.navigate('Shopping', { screen: 'Cart' }) }
        ])}
      </Block>
    } catch (error) {
      <Block flex row style={{ marginTop: 40, marginVertical: 8, }}>
        {console.log('if (!payment) - error', error)}
      </Block>
    }
  }

  return (
    <Block flex row style={{ marginTop: 40, marginVertical: 8, }}>
      {showScreen()}
      {isLoading && <Loader text={loaderMessage} isLoading={isLoading} />}
      <WebView
        ref={WEBVIEW_REF}
        source={{ uri: payment.authorization_url }}
        style={{ marginTop: 40 }}
        onNavigationStateChange={ onNavigationStateChange }
      />
    </Block>
  );
}
