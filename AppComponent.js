import React, { useEffect, useRef, useState } from 'react';
import { Image, BackAndroid } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Analytics from 'expo-firebase-analytics';
// import RNRestart from 'react-native-restart';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider, Toast } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
// import * as SplashScreen from 'expo-splash-screen';
import { setNativeExceptionHandler, setJSExceptionHandler } from "react-native-exception-handler";

import Screens from './navigation/Screens';
import { Images, articles, nowTheme } from './constants';
import { useUserContext } from './context/UserContext';
import { useToastContext } from './context/ToastContext';
import firebase from './shared/firebase'
import { getUser } from './shared/methods/Users';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function AppComponent (props) {
  const navigationRef = useRef();
  const routeNameRef = useRef();
  const [state, setState] = useState({
    isLoadingComplete: false,
    fontLoaded: false
  });

  const { setUser } = useUserContext()
  const { setToast, toast } = useToastContext()

  const cacheProfileImage = async (url) => {
    assetImages.push(url)
    return await Image.prefetch(url)
  }

  const authStateChanged = (user) => {
    try {
      if (user && user.providerData) {
        getUser(user.uid)
        .then((userData) => {
          const data = userData.data()
          setUser({
            ...data,
            ...user.providerData[0],
            emailVerified: user.emailVerified,
            refreshToken: user.refreshToken,
            token: user.accessToken,
            uid: user.uid
          })
        })
        .catch((error) => {
          console.log('getUser error', error)
          setUser({
            ...user.providerData[0],
            emailVerified: user.emailVerified,
            refreshToken: user.refreshToken,
            token: user.accessToken,
            uid: user.uid
          })
        })
        if (user.providerData[0].photoURL) cacheProfileImage(user.providerData[0].photoURL)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const reporter = (error) => {
    // Logic for reporting to devs
    // Example : Log issues to github issues using github apis.
    console.log(error); // sample
  };

  const errorHandler = (error, isFatal) => {
    // This is your custom global error handler
    // You do stuff like show an error dialog
    // or hit google analytics to track crashes
    // or hit a custom api to inform the dev team.
    if (isFatal) {
      reporter(error)
      Alert.alert(
        "Unexpected error occurred",
        `
          Error: ${isFatal ? "Fatal:" : ""} ${e.name} ${e.message}
  
          We have reported this to our team ! Please close the app and start again!
          `,
        [{ text: "Close", onPress: () => BackAndroid.exitApp() }]
      );
    } else {
      console.log(error); // So that we can see it in the ADB logs in case of Android if needed
    }
    console.log('error', error)
  }

  const allowInDevMode = true
  setJSExceptionHandler(errorHandler, allowInDevMode);

  const exceptionhandler = (exceptionString) => {
    // your exception handler code here
    console.log('exceptionString', exceptionString)
  };

  /* - forceAppQuit is an optional ANDROID specific parameter that defines
  //    if the app should be force quit on error.  default value is true.
  //    To see usecase check the common issues section.
  */
  const forceAppQuit = false;
  /**
    // - executeDefaultHandler is an optional boolean (both IOS, ANDROID)
    //   It executes previous exception handlers if set by some other module.
    //   It will come handy when you use any other crash analytics module along with this one
    //   Default value is set to false. Set to true if you are using other analytics modules.
   */
  const executeDefaultHandler = true

  // setNativeExceptionHandler(
  //   exceptionhandler,
  //   forceAppQuit,
  //   executeDefaultHandler
  // );

  useEffect(async () => {
    // await SplashScreen.preventAutoHideAsync();
    let subscribe = firebase.auth().onAuthStateChanged(authStateChanged)
    return subscribe
  }, [])

  const _loadResourcesAsync = async () => {
    await Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
    });

    setState({ fontLoaded: true });
    return Promise.all([...cacheImages(assetImages)]);
  };

  const _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    if (state.fontLoaded) {
      setState({ isLoadingComplete: true })
      //   , async () => {
      //   await SplashScreen.hideAsync();
      // });
    }
  };

  if (!state.isLoadingComplete) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            // The line below uses the expo-firebase-analytics tracker
            // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
            // Change this line to use another Mobile analytics SDK
            setToast({ message: null});
            // await Analytics().logScreenView({
            //   screen_name: currentRouteName,
            //   screen_class: currentRouteName
            // });
          }

          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}
      >
        <GalioProvider theme={nowTheme}>
          <Block flex>
            {/* TODO: Remove and integrate Alert for successful Checkout -- tobe done on Checkout */}
            <Toast textStyle={{textAlign: 'center'}} color="success" isShow={!!toast.message} positionIndicator="top">{toast.message}</Toast>
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    );
  }
}
