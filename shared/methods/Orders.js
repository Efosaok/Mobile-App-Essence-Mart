import firebase from "../firebase";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const createOrder = (cart, user) => { 
  return firebase
  .firestore()
  .collection('orders')
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
  .collection("orders")
  .where("userId", "==", userId)
  .orderBy('status', 'asc')
  .get()
  // .orderBy("email", "asc")
}

export const getOrder = (orderId) => { 
  return firebase
  .firestore()
  .collection(`orders/${orderId}`)
  // .orderBy("email", "asc")
}
