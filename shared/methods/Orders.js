import firebase from "../firebase";
import generateId from '../generateId';
import { documentCounter } from './Count'
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

const db = firebase.firestore();

export const createOrder = (cart, user, store, quantities, status) => { 
  const { title, cartLink, caption, link, paymentId } = store;
  // const uid = generateId()
  return db.collection('orders')
  .add({
    cart,
    uid: generateId(),
    title,
    caption,
    link,
    cartLink,
    quantities,
    paymentId: paymentId || '',
    status: status || 'ACTIVE',
    userId: user.uid,
    address: (user.streetAddress1 || '') + ' ' + (user.streetAddress2 || ''),
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
}

export const getOrders = (userId, status) => {
  const orderRef = db.collection("orders");
  const useStatus = true;
  const query = (byStatus) => {
    if (byStatus) return orderRef.orderBy("status").where("userId", "==", userId)
    return orderRef.where("userId", "==", userId)
  }

  switch (status) {
    case 'DRAFT':
      return query()
        .where("status", "==", 'DRAFT')
        .orderBy("createdAt", "desc")

    case 'PENDING':
      return query(useStatus)
        .where("status", 'not-in', ['COMPLETED', 'DRAFT'])
        .orderBy("createdAt", "desc")

    default:
      return query()
        .where("status", "==", 'COMPLETED')
        .orderBy("createdAt", "desc")
  }
}

export const getOrder = (orderId) => { 
  return db.collection(`orders/${orderId}`)
  .get()
  // .orderBy("email", "asc")
}

export const removeOrder = (orderId) => { 
  return db.collection('orders')
  .doc(orderId)
  .delete()
  // .orderBy("email", "asc")
}

/**
 * Count documents in orders collection.
 */
 export const ordersCounter = () => {
  return db.collection('orders')
    .doc('orders')
    // .where("status", "==", 'DRAFT')
    .onWrite(documentCounter('orders'));
}
