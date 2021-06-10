import React, { memo, useEffect } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import { Images, nowTheme } from "../constants";
import { HeaderHeight } from '../constants/utils';
import { useUserContext } from '../context/UserContext';


const { height, width } = Dimensions.get('screen');
const getStartedStyle = { fontFamily: 'montserrat-bold', fontSize: 14 }
const getStartedLogoStyle = { width: 115, height: 124, bottom: 200, position: 'absolute' }
const getStartedBackgroundStyle = { flex: 1, height, width, zIndex: 1 }
const getStartedContainerStyle = {
  marginTop: theme.SIZES.BASE * 2.5,
  marginBottom: theme.SIZES.BASE * 2
}
const getStartedHeadingStyle = {
  fontFamily: 'montserrat-regular', bottom: 50, position: 'absolute', letterSpacing: 2, paddingHorizontal: 20, textAlign: 'center'
}

const Onboarding = memo(() => {
  const navigation = useNavigation();
  const { isAuthenticated } = useUserContext()
  const { navigate } = navigation
  const gotoRoute = () => navigate('App')

  useEffect(() => {
    try {
      if (isAuthenticated) navigate('App')
    } catch (error) {
      console.log('Onboarding - isAuthenticated', error)
    }
  }, [isAuthenticated, navigate])

  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Block flex>
        <ImageBackground
          source={Images.Onboarding}
          style={getStartedBackgroundStyle}
        />
        <Block space="between" style={styles.padded}>
          <Block>
            <Block middle>
              <Image source={Images.NowLogo} style={getStartedLogoStyle} />
            </Block>
            <Block>
              <Block middle>
                <Text
                  style={getStartedHeadingStyle}
                  color="white"
                  size={44}
                >
                  Essence
                  Global Mart
                </Text>
              </Block>
            </Block>
            <Block
              row
              style={getStartedContainerStyle}
            >
              <Button
                shadowless
                style={styles.button}
                color={nowTheme.COLORS.PRIMARY}
                onPress={gotoRoute}
              >
                <Text
                  style={getStartedStyle}
                  color={theme.COLORS.WHITE}
                >
                  GET STARTED
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
})

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
});
