import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Block, theme, Text, Button } from "galio-framework";
import CartComponent from "../components/cart";
import Loader from '../components/Loader';
import axios from "axios";
import { useCartContext } from '../context/CartContext';

const { width } = Dimensions.get('screen');

export default function Cart({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { cart, initailizeCartPayment } = useCartContext()

  const Quantity = (item) => Number(item.quantity || 1)

  const getCurrency = (price, currency, num) => price.includes(currency) ? price.split(currency)[1] : (num || 0)
  const getPrice = (price) => getCurrency(price, '$', getCurrency(price, '£'))
  const IndexedPrice = (item) => Number((item.price && getPrice(item.price)) || 0);

  const items = cart && cart.map((item) => Quantity(item) * IndexedPrice(item));
  const total = items && items.reduce((prev, amt) => Number(amt) + prev, 0);

  console.log('total', total)

  const showScreen = () => {
    errorMessage && Alert.alert(null, errorMessage, [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ])
  }

  /**
   * Generate Paystack checkout transaction key
   * @param {*} cb
   * @returns {void}
   */
  const generateCartKey = async (cb) => {
    setIsLoading(true)
    const params = {
      email: "customer@email.com",
      // TODO: integrate exchange rate
      amount: parseInt(total).toFixed(2),
    }

    const options = {
      url: 'https://api.paystack.co/transaction/initialize',
      method: 'POST',
      data: params,
      headers: {
        Authorization: 'Bearer sk_test_596f74c8f5735986902eb2e4260eff33b2304649',
        'Content-Type': 'application/json'
      }
    }

    return await axios(options)
    .then((res) => {
      console.log('res.data -res.data', res.data)
      initailizeCartPayment(res.data)
      setIsLoading(false)
      if (cb) return cb()
    })
    .catch((error) => {
      console.log('error', JSON.stringify(error))
      setErrorMessage(error.message || error)
      setIsLoading(false)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      {showScreen()}
      {isLoading && <Loader isLoading={isLoading} />}
      <Block flex center style={styles.wrapper}>
        <Block flex row style={{ marginTop: 2, marginVertical: 8, }}>
          <CartComponent generateCartKey={generateCartKey} />
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
    // marginHorizontal: 5,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  wrapper: {
    paddingBottom: 10
  }
})
