import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
} from 'react-native';

// galio components
import {
  Text, Block,
} from 'galio-framework';
import axios from "axios";

import { Button, Icon } from '../../components';
import { nowTheme , Images } from "../../constants";

import { useCartContext } from '../../context/CartContext';
import ItemGroup from '../../components/cart/ItemGroup';
import Loader from '../../components/Loader';
import { currencies } from '../../constants/currencies';
import { useUserContext } from '../../context/UserContext';
// import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

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

const Quantity = (item) => Number(item.quantity || 1)
const IndexedPrice = (item) => Number(item.price || 0);

const OrderInformation = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { user } = useUserContext()
  const { navigation, full } = props;
  const imageStyles = [full ? styles.fullImage : styles.horizontalImage];
  const { order, initailizeCartPayment, addToCart } = useCartContext();

  const isDraft = order && order.status === 'DRAFT';
  const cta = isDraft ? 'Order Now' : 'Re-Order'
  const cta2 = isDraft ? 'View' : 'Rating';
  const uid = order && order.uid;
  const items = order && order.cart && order.cart.map((item) => Quantity(item) * IndexedPrice(item));
  const total = items && items.reduce((prev, amt) => Number(amt) + prev, 0);

  const showScreen = () => errorMessage && Alert.alert(null, errorMessage, [
      { text: "OK", onPress: () => setErrorMessage("") }
    ])

  const {
    buttonContainerStyle, 
    closeButtonStyle, 
    checkoutButtonStyle } = styles;

  const currencyType = () => {
    const item = order && order.cart && order.cart[0];
    let { currency } = item;
    currency = currency.trim()
    if (currency) {
      return getCurrencySymbol(currency)
    }
    setErrorMessage('It seems curriency was not found')
    throw new Error('It seems curriency was not found')
  }

  const handleRatingOrViewOrder = () => {
    if (isDraft) {
      setIsLoading(true)
      addToCart(order && order.cart)
      setIsLoading(false)
      navigation.navigate('Shopping', { screen: 'Cart', params: { isDraft, uid } });
    } else {
      navigation.navigate('TrackOrder', { screen: 'Rating', params: { uid } });
    }
  }

  /**
   * Generate Paystack checkout transaction key
   * @param {*} cb
   * @returns {void}
   */
  const generateCartKey = async () => {
    try {
      setIsLoading(true)
      const from = currencyType() || 'EUR';
      const amountInNaira = currencies[from] * total;
      const FloatTotal = parseFloat(amountInNaira).toFixed(2)
      // eslint-disable-next-line radix
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
        addToCart(order && order.cart)
        navigation.navigate('Shopping', { screen: 'Checkout', params: { isDraft, uid } });
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

  // TODO: clear cart on this screen or on Navigating to this screen
  return (
    <Block flex >
      {showScreen()}
      {isLoading && <Loader isLoading={isLoading} />}
      <Block center style={[styles.container]}>
        <Block row space="between" style={{ width }}>
          <Block>
            <Text style={[styles.articleButton, { letterSpacing: .021 }]} size={22} bold>
              Order Information
            </Text>
          </Block>

          <Block flex right style={{ alignSelf: 'start', paddingTop: 7 }}>
            <Text style={styles.articleButton} size={12}>
              <Text color={nowTheme.COLORS.PRIMARY} bold>ID:{' '}</Text>
              <Text size={12}>44r466</Text>
            </Text>
          </Block>
        </Block>

        <Block row space="between" style={{ width }}>
          <Block>
            <Text style={styles.articleButton} size={14}>
              Delivery to
            </Text>
          </Block>

          <Block flex right style={{ alignSelf: 'start', paddingTop: 7 }}>
            <Text style={styles.articleButton} color={nowTheme.COLORS.PRIMARY} size={12}>
              Add new address
            </Text>
          </Block>
        </Block>

        <Block row style={styles.addressSection}>
          <TouchableWithoutFeedback>
            <Block flex={0.5} style={styles.imageContainer}>
              <Image resizeMode="cover" source={Images.OrderAddressOnMap} style={imageStyles} />
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Block space="evenly" flex style={{ paddingLeft: 10 }}>
              <Block row>
                <Icon
                  name="pin-32x"
                  family="NowExtra"
                  style={{ paddingRight: 5, paddingTop: 10 }}
                />
                <Text size="13" style={[styles.articleButton, { flex: 0.8, paddingTop: 7, paddingBottom: 15 }]} color={nowTheme.COLORS.BLACK}>
                  76A Eighn Avenue, Adora Mercy, New York
                </Text>
              </Block>
              <Block row>
                <Icon
                  name="single"
                  family="NowExtra"
                  style={{ paddingRight: 5, paddingTop: 5 }}
                />
                <Text size="13" bold muted style={[styles.articleButton, { paddingTop: 3, paddingBottom: 5 }]}>
                  Beatrice Owen
                </Text>
              </Block>
              <Block row>
                <Icon
                  name="alert-circle-i2x"
                  family="NowExtra"
                  style={{ paddingRight: 5, paddingTop: 5 }}
                />
                <Text bold muted size="13" style={[styles.articleButton, { paddingTop: 3, paddingBottom: 5 }]}>
                  +(234) 81 617 7762
                </Text>
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
      </Block>

      <Block row space="evenly">
        <Text size="13" bold muted style={[styles.articleButton, { paddingTop: 3, paddingBottom: 5 }]}>
          Delivery Time
        </Text>
        <Text size="13" bold muted style={[styles.articleButton, { paddingTop: 3, paddingBottom: 5 }]}>
          10:11 AM
        </Text>
        <Text size="13" bold muted style={[styles.articleButton, { paddingTop: 3, paddingBottom: 5 }]}>
          OCT 6, 2020
        </Text>
        <Text size="13" bold color={nowTheme.COLORS.PRIMARY} style={[styles.articleButton, { paddingTop: 3, paddingBottom: 5 }]}>
          Edit
        </Text>
      </Block>

      <SafeAreaView style={styles.commentSection}>
        <Block flex={3.1} center style={[styles.container, {paddingTop: 10,}]}>
          <ItemGroup carts={order && order.cart} />
        </Block>

        <Block flex={0.1} style={{minHeight: 15}} row>
          <Text size="13" bold style={[styles.articleButton, { paddingTop: 3, paddingBottom: 5, paddingLeft: 22 }]}>
            Note
          </Text>
        </Block>

        <Block flex={0.8} center style={[styles.container, {paddingTop: 10, paddingBottom: 5}]}>
          <Block row style={[styles.addressSection, {borderWidth: 0}]}>
            <DismissKeyboard>
              <TextInput
                style={{ minHeight: 50, backgroundColor: '#eee', padding: 10, width: '100%' }}
                placeholder="Please call me when you come. Thank you!"
                multiline
                numberOfLines={10}
                editable
                maxLength={50}
              />
            </DismissKeyboard>
          </Block>
        </Block>
      </SafeAreaView>

      <Block center style={[styles.container, {paddingTop: 10, paddingBottom: 30 }]}>
        <Block row space="between" style={buttonContainerStyle}>
          <Button onPress={handleRatingOrViewOrder} round size="small" style={closeButtonStyle}>
            <Text bold style={{ fontFamily: 'montserrat-bold' }}>{cta2}</Text>
          </Button>

          <Button round onPress={generateCartKey} style={checkoutButtonStyle}>
            <Text bold style={{ color: '#fff', fontFamily: 'montserrat-bold' }}>{cta}</Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: nowTheme.SIZES.BASE * 0.3,
    paddingHorizontal: nowTheme.SIZES.BASE,
    backgroundColor: nowTheme.COLORS.WHITE,
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: nowTheme.SIZES.BASE,
    paddingHorizontal: nowTheme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7
  },
  addressSection: {
    width: width - (10 * 2),
    marginBottom: nowTheme.SIZES.BASE,
    borderWidth: .41,
    borderColor: nowTheme.COLORS.MUTED,
    borderRadius: 4,
    padding: 4,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden'
  },
  horizontalImage: {
    height: 122,
    width: 'auto'
  },
  fullImage: {
    height: 215
  },
  buttonContainerStyle: {
    width: width - (nowTheme.SIZES.BASE * 2),
    paddingTop: 15,
  },
  closeButtonStyle: {
    // backgroundColor: '#7f8c8d',
    backgroundColor: nowTheme.COLORS.WHITE,
    borderWidth: .41,
    borderColor: nowTheme.COLORS.MUTED,
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
  },
  commentSection: {
    // width: width - (nowTheme.SIZES.BASE * 2)
    flex: 1,
    // paddingBottom: height * 0.1,
    // marginBottom: height * 0.1,
    borderWidth: .41,
    borderColor: nowTheme.COLORS.MUTED,
  }
});

export default OrderInformation;
