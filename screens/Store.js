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

const WHITELIST = ["file://", 'http://', 'https://'];

export default function DetailsScreen({ navigation }) {
  const WEBVIEW_REF = React.createRef()
  const { store } = useStoreListContext()
  const { addToCart, cart, setCurrentStore } = useCartContext()
  // TODO: Remove is checkout is not neccessary
  const [isCheckout, setIsCheckout] = useState(false)
  const [currentURL, setCurrentURL] = useState(store.link)
  const [URLs, setURLs] = useState([store.link])
  const [isLoading, setIsLoading] = useState(false)
  const [buttonProps, setButtonProps] = useState({ cancelled: false, showButton: false })// cancel loading button
  const [message, setMessage] = useState('')

  const updateBooleanProps = (show, cancel, checkout) => {
    setButtonProps({ showButton: show, cancelled: cancel })
    setIsCheckout(checkout)
  }

  useEffect(() => {
    updateBooleanProps(false, null, false);
    setIsLoading(true);
    setCurrentURL(store.link)
    setURLs([...URLs, store.link])
    const redirectTo = 'window.location = "' + currentURL + '"';
    WEBVIEW_REF.current && WEBVIEW_REF.current.injectJavaScript(redirectTo);
    setIsLoading(false);
    addToCart([])
    return () => {}
  }, [store])


  const onCheckout = () => {
    setCurrentURL(store.cartLink)
    updateBooleanProps(true, false, true);
    WEBVIEW_REF.current && WEBVIEW_REF.current.postMessage( "Checkout" );
  }

  const onCancelLoading = () => {
    setMessage('We did something wrong!\nSending report to the team');
    // TODO: Remove timeout and do proper reporting, maybe to crashlytics or dedicated API
    const timeout = setTimeout(() => {
      updateBooleanProps(false, true, false);
      setMessage('');
      clearTimeout(timeout);
    }, 3000);
  }

  const onNavigationStateChange = state => {
    const { url, title } = state;
    if (!url) return;
    setCurrentStore({ title: title || cart && cart.title })
    setURLs([...URLs, url])
  }

  var $urlPattern = new RegExp('^' + store.cartLink, 'i');
  const matchUrl = (value, vm) => {
    return $urlPattern.test(value)
  }

  const getLastVisitedURL = () => {
    return URLs[URLs.length - 1];
  }

  const getCarts = (data) => {
    const lastVisitedURL = getLastVisitedURL()
    if ( 'object' == typeof data && data.carts ) {
      console.log('matchUrl(lastVisitedURL)', matchUrl(lastVisitedURL))
      console.log('store.cartLink', store.cartLink)
      console.log('lastVisitedURL', lastVisitedURL)
      console.log('buttonProps.cancelled', buttonProps.cancelled)
      console.log('isCheckout', isCheckout)
      setIsLoading(false)
      if (data.carts && data.carts.length) {
        addToCart(data.carts)
        setMessage('')
        updateBooleanProps(false, false, false);
        navigation.navigate('Shopping', { screen: 'Cart' });
      } else if (!buttonProps.cancelled && isCheckout && matchUrl(lastVisitedURL)) {
        setMessage(message || 'Ouch!, It seems we couldn\'t get your item out. \n Please sit back while we retry');
        updateBooleanProps(true, false, true);
        setIsLoading(true);
        WEBVIEW_REF.current && WEBVIEW_REF.current.postMessage( "Checkout" );
        // WEBVIEW_REF.current && WEBVIEW_REF.current.injectJavaScript(script(store));
      }
    }
  }

  const onMessage = async (e) => {
    setIsLoading(true);
    try {
      var data = e.nativeEvent.data || [];
      data = JSON.parse(data);
      // console.log('e.nativeEvent', e.nativeEvent)
      getCarts(data); // end the loading in getCarts
    } catch ( e ) {
      console.log('e.message ', JSON.parse(e.message) || JSON.parse(e))
      // Alert.alert(null, e.message || e, [{ text: "OK", onPress: () => console.log("OK Pressed") }])
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && 
        <Loader
          showButton={buttonProps.showButton}
          text={message}
          isLoading={isLoading}
          onPress={onCancelLoading}
        />}
      <Block flex center style={styles.wrapper}>
        <Block center>
          <Button textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
            style={styles.button}
            onPress={onCheckout}
          >
            PROCEED TO CHECKOUT
          </Button>
        </Block>
        <Block flex row style={{ marginTop: 2, marginVertical: 8, }}>
          <WebView
            ref={WEBVIEW_REF}
            source={{ uri: currentURL }}
            injectedJavaScript={script(store, store.cartElementClass)}
            javaScriptEnabled={true}
            onMessage={onMessage}
            onNavigationStateChange={onNavigationStateChange}
            injectedJavaScriptForMainFrameOnly={false}
            useWebKit={true}
            originWhitelist={WHITELIST}
            javaScriptEnabledAndroid={true}
            renderLoading={LoadingIndicatorView}
            onError={evnt => console.log('error webview', evnt.nativeEvent.description)}
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
