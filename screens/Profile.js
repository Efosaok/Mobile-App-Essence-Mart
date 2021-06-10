import React, {  } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Alert } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import { useUserContext } from '../context/UserContext';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const profileEditStyle = { position: 'absolute', width, top: height * 0.6 - 26, zIndex: 99 }
const verifyBtnStyle = { height: 44, marginHorizontal: 5, elevation: 0 }
const profileImageStyle = { position: 'absolute', width, zIndex: 5, paddingHorizontal: 20 }
const setHeight = (h = 0.15) => ({ top: height * h })
const orderStatusBadgeStyle = { fontFamily: 'montserrat-regular' }
const orderStatusStyle = { marginBottom: 4, fontFamily: 'montserrat-bold' }
const editProfileBtnStyle = { width: 114, height: 44, marginHorizontal: 5, elevation: 0 }
const btnTextStyle = { fontSize: 16 }
const verifyBadgeStyle = {
  marginTop: 5,
  fontFamily: 'montserrat-bold',
  lineHeight: 20,
  fontWeight: 'bold',
  fontSize: 18,
  opacity: .8
}
const displayNameStyle = {
  fontFamily: 'montserrat-bold',
  marginBottom: theme.SIZES.BASE / 2,
  fontWeight: '900',
  fontSize: 26
}
const profileStyle = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
}

const Profile = () => {
  const { user, setUser } = useUserContext();
  const navigation = useNavigation();
  const { navigate } = navigation
  const gotoEditProfile = () => navigate('Profile', { screen: 'EditProfile' })

  const sendEmailVerification = () => {
    try {
      const {currentUser} = firebase.auth()
      currentUser.sendEmailVerification()
      .then(() => {
        Alert.alert(null, 'Verification email sent.', [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ])
        const timeout = setTimeout(async() => {
          await currentUser.reload();
          setUser(firebase.auth().currentUser.toJSON());
          clearTimeout(timeout)
        }, 30000);
        // Verification email sent.
      })
      .catch((error) => {
        // Error occurred. Inspect error.code.
        Alert.alert(null, error.message || error, [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ])
      });
    } catch (error) {
      console.log('Profile - sendEmailVerification error', error)
    }
  }

  const getVerificationUI = () => {
    if (user && !user.emailVerified) {
      return (
        <Button
          onPress={sendEmailVerification}
          color="SECONDARY"
          style={verifyBtnStyle}
          textStyle={btnTextStyle}
          round
        >
          Verify my profile
        </Button>
      )
    }
  }

  return (
    <Block style={profileStyle} >
      <Block flex={0.6} >
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block flex style={styles.profileCard}>
            <Block style={profileImageStyle}>
              <Block middle style={setHeight()}>
                <Image source={user.photoURL ? { uri: user.photoURL } : Images.ProfilePicture} style={styles.avatar} />
              </Block>
              <Block style={setHeight(0.2)}>
                <Block middle >
                  <Text
                    style={displayNameStyle}
                    color='#ffffff'
                    >
                    {(user && user.displayName) || "Teni Makanaki"}
                  </Text>

                  <Text
                    size={16}
                    color="white"
                    style={verifyBadgeStyle}
                  >
                    {user && user.emailVerified && "Verified" }
                  </Text>
                </Block>
                <Block style={styles.info}>
                  <Block row space="around">

                    <Block middle>
                      <Text
                        size={18}
                        color="white"
                        style={orderStatusStyle}
                      >
                        --
                      </Text>
                      <Text style={orderStatusBadgeStyle} size={14} color="white">
                        Delivered
                      </Text>
                    </Block>

                    <Block middle>
                      <Text
                        color="white"
                        size={18}
                        style={orderStatusStyle}
                      >
                        --
                      </Text>
                      <Text style={orderStatusBadgeStyle} size={14} color="white">
                        In Progress
                        </Text>
                    </Block>

                    <Block middle>
                      <Text
                        color="white"
                        size={18}
                        style={orderStatusStyle}
                      >
                        --
                      </Text>
                      <Text style={orderStatusBadgeStyle} size={14} color="white">
                        Arrived
                      </Text>
                    </Block>

                  </Block>
                </Block>
              </Block>

            </Block>


            <Block
              middle
              row
              style={profileEditStyle}
            >
              <Button
                onPress={gotoEditProfile}
                style={editProfileBtnStyle}
                textStyle={btnTextStyle}
                round
              >
                Edit
              </Button>
              {getVerificationUI()}
            </Block>
          </Block>
        </ImageBackground>


      </Block>
      <Block />
      <Block flex={0.4} style={{ padding: theme.SIZES.BASE, marginTop: 90}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex style={{ marginTop: 20 }}>
            <Block row style={{ paddingVertical: 14, paddingHorizontal: 15 }} space="between">
              <Text bold size={16} style={{ marginTop: 3, color: nowTheme.COLORS.HEADER }}>
                Other Information
              </Text>
              {/* <Button
                small
                color="transparent"
                textStyle={{ color: nowTheme.COLORS.PRIMARY, fontSize: 14 }}
              >
                View all
                  </Button> */}
            </Block>


            <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15}}>
              <Block row space="between" style={{ flexWrap: 'wrap' }}>
                {/* {Images.Viewed.map((img, imgIndex) => (
                  <Image
                    source={img}
                    key={`viewed-${img}`}
                    resizeMode="cover"
                    style={styles.thumb}
                  />
                ))} */}
                {/* {console.log('histories -- histories', histories)} */}
                {/* {histories && histories.length && histories.map((carts, imgIndex) => (
                  carts && carts[0] && carts[0] && carts[0].cart && carts[0].cart.map(eachCart => (
                    <Image
                      source={eachCart.imageUrl ? { uri: eachCart.imageUrl } : Images.Viewed[0]}
                      key={`viewed-${eachCart.imageUrl}`}
                      resizeMode="cover"
                      style={styles.thumb}
                    />
                  ))
                ))} */}
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>

  )
}





const styles = StyleSheet.create({

  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width,
    height: height * 0.6
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5
  }
});

export default Profile;
