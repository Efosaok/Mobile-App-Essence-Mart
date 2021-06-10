import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';

// galio components
import {
  Text, Block,
} from 'galio-framework';

import { Button } from '../../components';
import { nowTheme } from "../../constants";
import Loader from '../../components/Loader';
// import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');


const defaultData = {
  title: '',
  description: '',
  size: '',
  color: '',
}

const EditCustomOrders = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState({
    isLoading: false,
    isLoaded: false,
    ...defaultData
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')

  const cta = 'Add'
  const cta2 = 'Cancel';

  const showScreen = () => errorMessage && Alert.alert(null, errorMessage, [
      { text: "OK", onPress: () => setErrorMessage("") }
    ])

  const {
    buttonContainerStyle, 
    closeButtonStyle, 
    checkoutButtonStyle } = styles;


  const handleRatingOrViewOrder = () => {
    // if (isDraft) {
    //   setIsLoading(true)
    //   addToCart(order && order.cart)
    //   setIsLoading(false)
    //   navigation.navigate('Shopping', { screen: 'Cart', params: { isDraft, uid } });
    // }
  }

  /**
   * Generate Paystack checkout transaction key
   * @param {*} cb
   * @returns {void}
   */
  const generateCartKey = async () => {
    // try {
    //   setIsLoading(true)
    //   const from = currencyType() || 'EUR';
    //   const amountInNaira = currencies[from] * total;
    //   const FloatTotal = parseFloat(amountInNaira).toFixed(2)
    //   const AmountInKobo = parseInt(String(FloatTotal).split('.').join(''))

    //   const testEmail = "customer@email.com"
    //   const params = {
    //     email: user.email || testEmail,
    //     amount: AmountInKobo,
    //     currency: 'NGN'
    //   }

    //   console.log('params', params)

    //   const options = {
    //     url: 'https://api.paystack.co/transaction/initialize',
    //     method: 'POST',
    //     data: params,
    //     headers: {
    //       Authorization: 'Bearer sk_test_596f74c8f5735986902eb2e4260eff33b2304649',
    //       'Content-Type': 'application/json'
    //     }
    //   }

    //   return await axios(options)
    //   .then((res) => {
    //     console.log('res.data -res.data', res.data)
    //     initailizeCartPayment(res.data)
    //     setIsLoading(false)
    //     addToCart(order && order.cart)
    //     navigation.navigate('Shopping', { screen: 'Checkout', params: { isDraft, uid } });
    //   })
    //   .catch((error) => {
    //     console.log('error', JSON.stringify(error))
    //     setErrorMessage(error.message || error)
    //     setIsLoading(false)
    //   })
    // } catch (error) {
    //   console.log('error', error)
    //   setIsLoading(false)
    // }
  }





  // TODO: clear cart on this screen or on Navigating to this screen
  return (
    <Block flex style={{}} >
      {showScreen()}
      {isLoading && <Loader isLoading={isLoading} />}
      <Block center style={[styles.container]}>
          <Text style={styles.articleButton} size={14}>
            Please fill in below information. The important fields are description*, imageUrl*, quantity*, link*, color*, width*,
            size*, brand, price, colarSize, sleeveLength, chestSize, waistElement,
          </Text>
        <Block row style={{ width, paddingTop: 9 }}>
          {/* <Form
            heading="Login"
            action="Login"
            updateInputVal={updateInputVal}
            displayMessage={displayMessage}
            isLoading={state.isLoading}
            loaderMessage=""
            inputData={state}
            onPress={() =>{}}
            // registerContainerStyle={{ maxHeight: 320 }}
            isCustomOrder
          /> */}
        </Block>
      </Block>

      <Block center style={[styles.container, {paddingTop: 10, paddingBottom: 30, position: 'absolute', bottom: 0 }]}>
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
    paddingHorizontal: nowTheme.SIZES.BASE,
    backgroundColor: nowTheme.COLORS.WHITE,
  },
  buttonContainerStyle: {
    width: width - (nowTheme.SIZES.BASE * 2),
    paddingTop: 15,
  },
  closeButtonStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderWidth: .41,
    borderColor: nowTheme.COLORS.MUTED,
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 3,
  }, 
  checkoutButtonStyle: {
    backgroundColor: nowTheme.COLORS.PRIMARY,
    padding: 10,
    borderRadius: 3,
  },
});

export default EditCustomOrders;
