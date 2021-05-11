import firebase from "../firebase";
import generateId from '../generateId'
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

const db = firebase.firestore();

export const getPaystackResponse = (data) => {
  return {
    amount,
    authorization,
    paid_at,
    requested_amount,
    reference,
    status,
    created_at,
    currency
  } = data
}

export const createPayment = (user, payment) => {
  const uid = generateId()
  return db.collection('payments')
  .add({
    ...payment,
    cartId: '',
    uid,
    userId: user.uid,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
}

export const getPayments = (userId) => {
  const paymentRef = firebase.firestore().collection("payments");
  const query = () => paymentRef.where("userId", "==", userId)

  return query()
    .where("status", "==", 'COMPLETED')
    .paymentBy("createdAt", "desc")
    .get()
}

export const getPayment = (paymentId) => { 
  return db.collection(`payments/${paymentId}`)
  .get()
  // .paymentBy("email", "asc")
}

export const removePayment = (paymentId) => { 
  return db.collection('payments')
  .doc(paymentId)
  .delete()
  // .paymentBy("email", "asc")
}
