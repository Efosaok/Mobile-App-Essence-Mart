import { Alert, Platform } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import * as ImagePicker from 'expo-image-picker';

export const ResizeImage = (selectedPictureUri, userID, cb) => {
  let newWidth = 120;
  let newHeight = 120;
  let compressFormat = 'PNG';
  let quality = 100;
  let rotation = 0;
  let outputPath = null;
  let imageUri = selectedPictureUri;
  ImageResizer.createResizedImage(
    imageUri,
    newWidth,
    newHeight,
    compressFormat,
    quality,
    rotation,
    outputPath,
  )
  .then((response) => {
    // response.uri is the URI of the new image that can now be displayed, uploaded...
    //resized image uri
    onsole.log('response', response)
    let uri = response.uri;
    //generating image name
    let imageName = 'profile' + (userID || 'randomId');
    //to resolve file path issue on different platforms
    let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    //setting the image name and image uri in the state
    console.log('uploadUri', uploadUri)
    if (cb) cb({ uploadUri, imageName })
    return { uploadUri, imageName };
  })
  .catch((err) => {
    console.log('image resizing error => ', err);
  });
}

export const TakePicture = async (cb) => {
  try {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        } else {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          console.log(result);

          if (!result.cancelled) {
            if (cb) cb(result.uri)
            return result.uri;
          }
        }
      }
    })();
  } catch (error) {
    console.log('file_upload - TakePicture error', error)
  }
};

export const SelectImage = async (cb) => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          if (cb) cb(result.uri)
          return result.uri;
        }
      }
    }
  })();
};

export default {
  TakePicture,
  SelectImage,
  ResizeImage,
}
