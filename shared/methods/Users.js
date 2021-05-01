import firebase from "../firebase";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const createUser = (user) => { 
  return firebase.firestore().collection('Users').add({
    ...user.providerData[0],
    uid: user.uid
  })
}

// export async function onFacebookButtonPress() {
//   try {
//       // Attempt login with permissions
//     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

//     if (result.isCancelled) {
//       throw 'User cancelled the login process';
//     }

//     // Once signed in, get the users AccesToken
//     const data = await AccessToken.getCurrentAccessToken();

//     if (!data) {
//       throw 'Something went wrong obtaining access token';
//     }

//     // Create a Firebase credential with the AccessToken
//     // const facebookCredential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
//     const provider = new firebase.auth.FacebookAuthProvider();
//     provider.addScope('user_birthday');
//     // provider.setCustomParameters({
//     //   'display': 'popup'
//     // });

//     return firebase
//     .auth()
//     .signInWithRedirect(provider)
//     .then((result) => {
//       /** @type {firebase.auth.OAuthCredential} */
//       var credential = result.credential;

//       // The signed-in user info.
//       var user = result.user;

//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       var accessToken = credential.accessToken;

//       // ...
//       return result
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;

//       // ...
//       throw error 
//     })
//     .finally((final) => {
//       console.log('final', final)
//       return final
//     });

//   // Sign-in the user with the credential
//   // return firebase.auth().signInWithCredential(facebookCredential);
//   } catch (error) {
//     console.log(error)

//     throw error
//   }
// }