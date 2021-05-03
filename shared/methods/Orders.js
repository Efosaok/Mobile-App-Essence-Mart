import firebase from "../firebase";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const createOrder = (cart, user) => { 
  return firebase
  .firestore()
  .collection('Orders')
  .add({
    cart,
    status: 'ACTIVE',
    userId: user.uid,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
}

export const getOrders = (userId) => { 
  return firebase
  .firestore()
  .collection("Orders")
  .where("userId", "==", userId)
  .orderBy('status', 'asc')
  // .orderBy("email", "asc")
}

export const getOrder = (orderId) => { 
  return firebase
  .firestore()
  .collection(`Orders/${orderId}`)
  // .orderBy("email", "asc")
}

export const getOrder = (orderId) => { 
  return firebase
  .firestore()
  .collection(`Orders/${orderId}`)
  // .orderBy("email", "asc")
}
