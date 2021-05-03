import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Block, theme, Text, Button } from "galio-framework";
import CartComponent from "../components/cart";
import Loader from '../components/Loader';
import axios from "axios";
import { useCartContext } from '../context/CartContext';
import { getCurrency as fetchCurrency } from '../shared/methods/Currencies';

const { width } = Dimensions.get('screen');

let keepCount = 100;

export default function Cart({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [loop, setLoop] = useState();
  const { cart, initailizeCartPayment } = useCartContext()

  const Quantity = (item) => Number(item.quantity || 1)

  const getCurrency = (price, currency, num) => price.includes(currency) ? price.split(currency)[1] : (num || 0)
  const getPrice = (price) => getCurrency(price, '$', getCurrency(price, '£'))
  const IndexedPrice = (item) => Number((item.price && getPrice(item.price)) || 0);

  const items = cart && cart.map((item) => Quantity(item) * IndexedPrice(item));
  const total = items && items.reduce((prev, amt) => Number(amt) + prev, 0);

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
      return fetchCurrency(getCurrencySymbol(currency))
      .catch((error) => setErrorMessage(error.message || error))
    }
    setErrorMessage('It seems curriency was not found')
  }

  const timoutLoading = () => {
    keepCount += 100
    setLoop(setInterval(() => {
      keepCount += 100
      if (cart.length || keepCount === 60000) {
        setIsLoading(false)
        clearInterval(loop)
        keepCount = 100
      }
    }, 100));
  }

  useEffect(() => {
    timoutLoading();
    return function cleanup() {
      console.log("cleaning up");
      clearInterval(loop);
      keepCount = 100
    };
  }, [cart])

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

    const currency = currencyType();
    // set endpoint and your API key
    endpoint = 'convert';
    access_key = 'pr_8c79ac77f0a04a1aa6a0aafee7e1d2f9';

    // define from currency, to currency, and amount
    from = currency || 'EUR';
    to = 'NGN';
    amount = '10';

    await axios({
      method: 'GET',
      url: `https://prepaid.currconv.com/api/v7/convert?q=${queryCurrenciesByNaira(from)}&compact=ultra&apiKey=${access_key}`
      // url: `https://openexchangerates.org/api/latest.json?app_id=${access_key}&base=NGN`
      // url: 'http://data.fixer.io/api/latest?access_key=' + access_key + '&base=' + from,
      // url: `http://free.currencyconverterapi.com/api/v5/convert?q=${currency}_NGN&compact=y`
      // url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,
      // url: `https://free.currconv.com/api/v7/convert?q=${currency}_NGN&compact=ultra&apiKey=8597a1ba8ef08e4cad70`
      // url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key +'&from=' + from + '&to=' + to + '&amount=' + amount,
    })
    .then((res) => {
      console.log('res', res)
    })
    .catch((err) => console.log('err', JSON.stringify(err, undefined, 3)))

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
