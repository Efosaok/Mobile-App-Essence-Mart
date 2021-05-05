import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Alert } from 'react-native';
import { Block, theme } from "galio-framework";
import CartComponent from "../components/cart";
import Loader from '../components/Loader';
import axios from "axios";
import { useCartContext } from '../context/CartContext';
// import { getCurrency as fetchCurrency } from '../shared/methods/Currencies';
import { currencies } from '../constants/currencies';
import { useUserContext } from '../context/UserContext';

const { width } = Dimensions.get('screen');

export default function Cart({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { cart, initailizeCartPayment } = useCartContext()
  const { user } = useUserContext()

  const Quantity = (item) => Number(item.quantity || 1)
  const IndexedPrice = (item) => Number(item.price || 0);

  const items = cart && cart.map((item) => Quantity(item) * IndexedPrice(item));
  const total = items && items.reduce((prev, amt) => Number(amt) + prev, 0);
  // TODO: total amount in nigeria currency
  // TODO: Exchange Rate

  const quantites = items && items.reduce((prev, item) => Quantity(item) + prev, 0);
  const showScreen = () => {
    errorMessage && Alert.alert(null, errorMessage, [
      { text: "OK", onPress: () => setErrorMessage("") }
    ])
  }


  const getCurrencySymbol = (currency, setDefault) => {
    if (currency.includes('$')) return 'USD';
    if (currency.includes('£')) return 'EUR';
    if (currency.includes('₦')) return 'NGN';
    if (currency.includes('USD')) return 'USD'
    if (currency.includes('NGN')) return 'NGN'
    if (currency.includes('EUR')) return 'EUR'
    // default
    if(setDefault) return '₦';
  }

  const currencyType = () => {
    const item = cart && cart[0];
    let { currency } = item;
    currency = currency.trim()
    if (currency) {
      return getCurrencySymbol(currency)
    }
    setErrorMessage('It seems curriency was not found')
    throw new Error('It seems curriency was not found')
  }

  /**
   * Generate Paystack checkout transaction key
   * @param {*} cb
   * @returns {void}
   */
  const generateCartKey = async (cb) => {
    try {
      setIsLoading(true)
      const from = currencyType() || 'EUR';
      const amountInNaira = currencies[from] * total;
      const FloatTotal = parseFloat(amountInNaira).toFixed(2)
      const AmountInKobo = parseInt(String(FloatTotal).split('.').join(''))

      const testEmail = "customer@email.com"
      const params = {
        email: user.email || testEmail,
        amount: AmountInKobo,
        currency: 'NGN'
      }

      console.log('params', params)

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
    } catch (error) {
      console.log('error', error)
      setIsLoading(false)
    }
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
