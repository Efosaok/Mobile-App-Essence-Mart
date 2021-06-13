import { Alert, Platform } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import * as ImagePicker from 'expo-image-picker';

export const ResizeImage = (selectedPictureUri, userID, cb) => {
  const newWidth = 120;
  const newHeight = 120;
  const compressFormat = 'PNG';
  const quality = 100;
  const rotation = 0;
  const outputPath = null;
  const imageUri = selectedPictureUri;
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
    // resized image uri
    console.log('response', response)
    const {uri} = response;
    // generating image name
    const imageName = `profile${  userID || 'randomId'}`;
    // to resolve file path issue on different platforms
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // setting the image name and image uri in the state
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
          Alert.alert('Permissions denied', 'Sorry, Camera roll permissions is needed!');
        } else {
          const result = await ImagePicker.launchCameraAsync({
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
        Alert.alert('Permissions denied', 'Sorry, Image library permissions is needed!');
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
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
