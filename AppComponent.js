import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';

import Screens from './navigation/Screens';
import { Images, articles, nowTheme } from './constants';
import { useUserContext } from './context/UserContext';
import firebase from './shared/firebase'

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
  const [state, setState] = useState({
    isLoadingComplete: false,
    fontLoaded: false
  });

  const { setUser } = useUserContext()

  const authStateChanged = (user) => {
    setUser({
      ...user.providerData[0],
      emailVerified: user.emailVerified,
      refreshToken: user.refreshToken,
      token: user.accessToken,
      uid: user.uid
    })
  }

  useEffect(() => {
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
      setState({ isLoadingComplete: true });
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
      <NavigationContainer>
        <GalioProvider theme={nowTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    );
  }
}
