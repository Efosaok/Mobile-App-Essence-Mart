import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image, ImageBackground, Alert } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { useUserContext } from '../context/UserContext';
import firebase from '../shared/firebase';
import Form from '../components/Form';
import { TakePicture, SelectImage } from '../shared/file_upload';
import { useProfileContext } from '../context/ProfileContext';

const { width, height } = Dimensions.get('screen');
const defaultData = {
  email: '',
  photoURL: '',
  displayName: '',
  phoneNumber: '',
  streetAddress: '',
  streetAddress2: '',
}

const thumbMeasure = (width - 48 - 32) / 3;

const EditProfile = ({ navigation }) => {
  const { user, updateUser } = useUserContext();
  const { setProfile, profile, profileError, profileLoading, loadingMessage } = useProfileContext()
  const [loaderMessage, setLoaderMessage] = useState('');
  const [message, setMessage] = useState('')
  const [state, setState] = useState({
    isLoading: false,
    isLoaded: false
  })

  useEffect(() => {
    setProfile({ ...defaultData, ...user })
  }, [])

  const updateInputVal = (val, prop) => {
    const currentState = {...profile};
    currentState[prop] = val;
    setProfile(currentState);
  }

  const displayMessage = () => {
    profileError &&  Alert.alert(null, `${profileError}`, [
      { text: "OK", onPress: () => setMessage("") }
    ]);
  }

  const BlobImage = async(imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = 'profile_' + user.uid;
    var ref =  firebase.storage().ref().child(filename);
    return ref.put(blob);
  }

  const handleUploading = async (e) => {
    try {
      console.log('Gallery', e)
      setState({ ...state, isLoading: true });
      BlobImage(e)
      .then((res) => {
        const filename = 'profile_' + user.uid;
        setLoaderMessage('Uploading your picture')
        firebase.storage().ref(filename).getDownloadURL()
        .then((photoURL) => {
          setProfile({ ...profile, photoURL })
          setLoaderMessage('Updating your profile')
          firebase.auth().currentUser.updateProfile({ photoURL })
          .then(() => {
            updateUser({ photoURL })
            firebase.auth().currentUser.reload()
            setState({ ...state, isLoading: false, photoURL });
            Alert.alert(
              'Photo uploaded!',
              'Your photo has been uploaded to Firebase Cloud Storage!'
            );
          })
          .catch(() => setState({ ...state, isLoading: false, photoURL }))
        })
        .catch((err) => {
          setState({ ...state, isLoading: false })
          Alert.alert(null, err.message || err);
        })
      })
      .catch((err) => {
        setState({ ...state, isLoading: false })
        Alert.alert(null, err.message || err);
      })
    } catch (error) {
      console.log('EditProfile - error', error)
    }
  }

  const uploadOptions = () => {
    Alert.alert(null, "Select or take a picture", [
      { text: "Camera", onPress: () => TakePicture(handleUploading) },
      { text: "Gallery", onPress: () => SelectImage(handleUploading) }
    ])
  };

  return (
    <Block style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    }} >
      <Block flex={0.6} >
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block flex style={styles.profileCard}>
            <Block style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}>
              <Block middle style={{ top: height * 0.15 }}>
                <Image source={(profile && profile.photoURL) ? {uri: profile.photoURL} : Images.ProfilePicture} style={styles.avatar} />
                <Button
                  color="WARNING"
                  style={{ height: 30, paddingHorizontal: 5, elevation: 0 }}
                  textStyle={{ fontSize: 14 }}
                  onPress={() => uploadOptions()}
                  round
                >
                  Change Profile Photo
                </Button>
              </Block>
              <Block style={{ top: height * 0.2 }}>
                <Block middle >
                  <Text
                    style={{
                      fontFamily: 'montserrat-bold',
                      marginBottom: theme.SIZES.BASE / 2,
                      fontWeight: '900',
                      fontSize: 26
                    }}
                    color='#ffffff'
                    >
                    {(user && user.displayName) || "Teni Makanaki"}
                  </Text>

                  <Text
                    size={16}
                    color="white"
                    style={{
                      marginTop: 5,
                      fontFamily: 'montserrat-bold',
                      lineHeight: 20,
                      fontWeight: 'bold',
                      fontSize: 18,
                      opacity: .8
                    }}
                  >
                    {user && user.emailVerified && "Verified" }
                  </Text>
                </Block>
                <Block style={styles.info}>
                  {/* <Block row space="around"> */}

                  <Form
                    heading="Login"
                    action="Login"
                    updateInputVal={updateInputVal}
                    onAuthSuggestionAction={() => navigation.navigate('Account', { screen: 'Register' })}
                    authSuggestionDescription="Need an account? "
                    authSuggestionAction="Register"
                    displayMessage={displayMessage}
                    isLoading={state.isLoading || profileLoading}
                    loaderMessage={profileLoading ? loadingMessage : loaderMessage}
                    inputData={profile || {}}
                    isEditProfile
                  />
                  </Block>
                {/* </Block> */}
              </Block>

            </Block>

          </Block>
        </ImageBackground>
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
    // marginTop: 30,
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
    borderWidth: 0,
    // resizeMode: 'contain'
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

export default EditProfile;
