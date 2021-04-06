import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Block, theme, Text, Button } from "galio-framework";
import { useStoreListContext } from '../context/StoreListContext'
import { WebView } from "react-native-webview";
import { nowTheme } from '../constants'
import { script } from './storeScript'
import { useCartContext } from '../context/CartContext';// ES Modules
import Loader from '../components/Loader';

const { width } = Dimensions.get('screen');

const LoadingIndicatorView = () => (
  <Block flex center>
    <ActivityIndicator color={nowTheme.COLORS.PRIMARY} size="large" />
  </Block>
)

export default function DetailsScreen({ navigation }) {
  const { store } = useStoreListContext()
  const { addToCart, cart, setCurrentStore } = useCartContext()
  const [isCheckout, setIsCheckout] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const WEBVIEW_REF = React.createRef()

  const onCheckout = () => {
    console.log('onCheckout', cart)
    if (!isCheckout) {
      setIsCheckout(true)
    } else if (cart && cart.length) {
      navigation.navigate('Shopping', { screen: 'Cart' });
    } else {
      WEBVIEW_REF.current && WEBVIEW_REF.current.postMessage( "Post message from react native" );
    }
  }

  const onNavigationStateChange = state => {
    const { url, title } = state;
    if (!url) return;
    setCurrentStore({ title: title || cart && cart.title })
    console.log('url === store.link', url === store.link, url, store.link)
    if (url === store.link) {
      setIsCheckout(false)
      console.log('onNavigationStateChange --- cart', cart)
			// get transaction reference from url and verify transaction, then redirect
      const redirectTo = 'window.location = "' + store.link + '"';
      WEBVIEW_REF.current && WEBVIEW_REF.current.injectJavaScript(redirectTo);
    }
		
		if(url === 'https://standard.paystack.co/close') {
      // handle webview removal
      // You can either unmount the component, or
      // Use a navigator to pop off the view
    }
  };

  const onMessage = async (e) => {
    setIsLoading(true)
    addToCart([])
    // retrieve event data
    var data = e.nativeEvent.data;
    // maybe parse stringified JSON
    try {
      data = JSON.parse(data)
    } catch ( e ) {
      Alert.alert(null, e.message || e, [{ text: "OK", onPress: () => console.log("OK Pressed") }])
      setIsLoading(false)
    }
    // check if this message concerns us
    if ( 'object' == typeof data && data.carts ) {
      // proceed with URL open request
      addToCart(data.carts)
      setIsLoading(false)
      navigation.navigate('Shopping', { screen: 'Cart' });
    } else {
      console.log('WEBVIEW_REF else statement')

      WEBVIEW_REF.current && WEBVIEW_REF.current.injectJavaScript(script(store));
    }
    setIsLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader isLoading={isLoading} />}
      <Block flex center style={styles.wrapper}>
        <Block center>
          <Button textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
            style={styles.button}
            // onPress={() => props.navigation.navigate('Checkout')}
            onPress={onCheckout}
          >
            PROCEED TO CHECKOUT
          </Button>
        </Block>
        <Block flex row style={{ marginTop: 2, marginVertical: 8, }}>
          <WebView
            ref={WEBVIEW_REF}
            source={{ uri: `${ isCheckout ? store.cartLink : store.link }` }}
            injectedJavaScript={isCheckout ? script(store) : ""}
            javaScriptEnabled={true}
            onMessage={onMessage}
            onNavigationStateChange={onNavigationStateChange}
            // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            injectedJavaScriptForMainFrameOnly={false}
            useWebKit={true}
            javaScriptEnabledAndroid={true}
            renderLoading={LoadingIndicatorView}
            onError={evnt => console.log(evnt.nativeEvent.description)}
            startInLoadingState={true}
          />
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
    marginHorizontal: 5,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  wrapper: {
    paddingBottom: 10
  }
})
