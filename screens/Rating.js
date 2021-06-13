import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Alert,
  SafeAreaView,
} from 'react-native';

// galio components
import {
  Text, Block,
} from 'galio-framework';
import { AirbnbRating } from 'react-native-ratings';

import { Button, Icon } from '../components';
import { Images, nowTheme } from '../constants';
import { useCartContext } from '../context/CartContext';
import Loader from '../components/Loader';
// import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const dismissKeyBoard = () => Keyboard.dismiss()
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={dismissKeyBoard}>{children}</TouchableWithoutFeedback>
);



const Rating = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { navigation, full } = props;
  const imageStyles = [full ? styles.fullImage : styles.horizontalImage];
  const { order } = useCartContext();

  const cta = 'Submit'

  const showScreen = () => errorMessage && Alert.alert(null, errorMessage, [
      { text: "OK", onPress: () => setErrorMessage("") }
    ])

  const {
    buttonContainerStyle, 
    checkoutButtonStyle } = styles;



  /**
   * Generate Paystack checkout transaction key
   * @param {*} cb
   * @returns {void}
   */
  const sendRating = async () => {
    try {
      setIsLoading(true)

      const timeout = setTimeout(() => {
        setIsLoading(false)
        navigation.navigate('TrackOrder', { screen: 'OrderInformation' });
        clearTimeout(timeout)
      }, 2000)
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
        <Block style={styles.topSection}>
          <TouchableWithoutFeedback>
            <ImageBackground
              source={order && order.cart ? { uri: order.cart[0].imageUrl } : Images.OrderAddressOnMap}
              style={styles.imageContainer}
              >
              <Image resizeMode="contain" source={Images.OrderAddressOnMap} style={imageStyles} />
            </ImageBackground>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Block space="evenly" style={{ paddingLeft: 10 }}>
              <Block row>
                <Text center size="16" style={[styles.articleButton, { flex: 1, paddingTop: 7, paddingBottom: 15 }]} color={nowTheme.COLORS.HEADER}>
                  {order.title}
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

      <SafeAreaView style={styles.commentSection}>
        <AirbnbRating
          count={11}
          reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Excellent"]}
          defaultRating={11}
          size={20}
        />
        <Block flex={0.1} style={{maxHeight: 25}} row>
          <Text size="13" bold style={[styles.articleButton, { paddingTop: 3, paddingBottom: 5, paddingLeft: 22 }]}>
            Note
          </Text>
        </Block>

        <Block center style={[styles.container, {paddingTop: 10, paddingBottom: 5}]}>
          <Block row style={[styles.addressSection, {borderWidth: 0}]}>
            <DismissKeyboard>
              <TextInput
                style={{ minHeight: 50, backgroundColor: '#eee', padding: 10, width: '100%' }}
                placeholder="Please call me when you come. Thank you!"
                multiline
                numberOfLines={15}
                editable
                maxLength={60}
              />
            </DismissKeyboard>
          </Block>
        </Block>
      </SafeAreaView>

      <Block center style={[styles.container, {paddingTop: 10, paddingBottom: 30 }]}>
        <Block center style={buttonContainerStyle}>
          <Button round onPress={sendRating} style={checkoutButtonStyle}>
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
  topSection: {
    width,
    marginBottom: nowTheme.SIZES.BASE,
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
    justifyContent: 'flex-end',
    // paddingBottom: height * 0.1,
    // marginBottom: height * 0.1,
    borderWidth: .41,
    borderColor: nowTheme.COLORS.MUTED,
  }
});

export default Rating;
