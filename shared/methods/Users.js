import firebase from "../firebase";

export const createUser = (user) => {
  return firebase.firestore().collection('Users').add({
    ...user.providerData[0],
    uid: user.uid
  })
}

