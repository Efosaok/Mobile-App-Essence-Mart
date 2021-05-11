import { Block, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios'
import { useCartContext } from '../context/CartContext';
import Loader from '../components/Loader';
import { useToastContext } from '../context/ToastContext';
import { createOrder, removeOrder } from '../shared/methods/Orders';
import { useUserContext } from '../context/UserContext';
import { useStoreListContext } from '../context/StoreListContext';
import { createPayment, getPaystackResponse } from '../shared/methods/Payment';
import { nowTheme } from '../constants';
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
  const { store } = useStoreListContext()
  const { payment, updateCartPayment, cart, clearCart, order } = useCartContext();
  const { route } = props;
  const uid = route && route.params && route.params.uid
  const isDraft = route && route.params && route.params.isDraft
  const _paymentURL = payment && payment.authorization_url;
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

  const getStore = () => {
    if (isDraft || uid) return order;
    return store;
  }

  const resetStateAndRedirect = (snapshot) => {
    setIsLoading(false)
    setLoaderMessage('')
    clearCart()
    checkoutCount = 0
    setCheckout(false)
    props.navigation.navigate('Shopping', { screen: 'OrderConfirmed', params: { id: snapshot.id } })
  }

  const Quantity = (item) => Number(item.quantity || 1)
  const Price = (item) => Number(item.price || 0);
  const items = cart && cart.map((item) => Quantity(item) * Price(item));
  const quantites = items && items.reduce((prev, item) => Quantity(item) + prev, 0);

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
        setIsLoading(false)
        setErrorMessage('')
        console.log('axios response - res.data', res.data)
        const { data } = res.data
        const Resonse = getPaystackResponse(data);
        console.log('√ Resonse', Resonse)
        const { status } = Resonse;
        updateCartPayment({ data: Resonse })
        setIsLoading(true)
        if (status !== 'success') {
          return setToast({ message: `Sorry!, We can't proceed with your order due to payment failure`, type: 'error'})
        }
        createPayment(user, Resonse)
        .then((paymentSnapshot) => {
          const paymentId = paymentSnapshot.id;
          const currentStore = { ...getStore(), paymentId }
          setLoaderMessage('Sending your order')
          createOrder(cart, user, currentStore, quantites)
          .then(async(snapshot) => {
            setToast({ message: `Your Order has been placed successfuly
              We\'d redirect you shortly`, type: 'success'})
            console.log('order', order && order.id)
            if (isDraft && uid) await removeOrder(order.id)
            resetStateAndRedirect(snapshot)
          })
        })
      })
      .catch((error) => {
        checkoutCount = 0;
        console.log('error - getPaymentInfo 2222', JSON.stringify(error));
        setErrorMessage(error.message || error)
        setLoaderMessage('')
        setIsLoading(false)
      })
    } catch (error) {
      console.log('getPaymentInfo - Checkout', error)
      checkoutCount = 0;
      setIsLoading(false)
    }
  }

  const onNavigationStateChange = async state => {
    try {
      const { url } = state;
      if (!url) return;
      if (matchUrl(url)) checkoutCount += 1
      if(checkoutCount > 1 && !hasCheckout && matchUrl(url)) {
        console.log('url', url, checkoutCount)
        setCheckout(true)
        getPaymentInfo()
      }
    } catch (error) {
      console.log('onNavigationStateChange - Checkout', error)
    }
  };

  if (!_paymentURL) {
    return (
      <Block flex row style={{ marginTop: 40, marginVertical: 8, }}>
        <Text color={nowTheme.COLORS.ERROR}>Unable to Process the payment, Pleas try again.</Text>
      </Block>
    )
  }

  return (
    <Block flex row style={{ marginTop: 40, marginVertical: 8, }}>
      {showScreen()}
      {isLoading && <Loader text={loaderMessage} isLoading={isLoading} />}
      <WebView
        ref={WEBVIEW_REF}
        source={{ uri: _paymentURL }}
        style={{ marginTop: 40 }}
        onNavigationStateChange={ onNavigationStateChange }
      />
    </Block>
  );
}
