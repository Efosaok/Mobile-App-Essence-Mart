import firebase from "../firebase";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj
}

export const createUser = (user) => {
  try {
    return firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({
      ...user.providerData[0],
      uid: user.uid
    }, {merge: true})
    .then((res) => {
      console.log('updateUser -res', res)
      return res
    })
  } catch (error) {
    console.log('createUser - error', error)
  }
}

export const updateUser = (userData, user) => {
  try {
    userData = (userData && userData.providerData && userData.providerData[0]) || userData;
    delete userData.providerId
    delete userData.refreshToken
    delete userData.token

    userData = clean(userData);
    return firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({
      ...userData,
      uid: user.uid
    }, {merge: true})
  } catch (error) {
    console.log('updateUser error', error)
  }
}

export const getUser = (userId) => {
  try {
    return firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .get()
  } catch (error) {
    console.log('getUser - error', error)
  }
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