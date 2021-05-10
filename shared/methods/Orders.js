import firebase from "../firebase";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const createOrder = (cart, user, store, quantites, status) => { 
  const { title, cartLink, caption, link } = store;
  return firebase
  .firestore()
  .collection('orders')
  .add({
    cart,
    title,
    caption,
    link,
    cartLink,
    quantites,
    status: status || 'ACTIVE',
    userId: user.uid,
    address: (user.streetAddress1 || '') + ' ' + (user.streetAddress2 || ''),
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
}

export const getOrders = (userId, status) => {
  const orderRef = firebase.firestore().collection("orders");
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
        .get()

    case 'PENDING':
      return query(useStatus)
        .where("status", 'not-in', ['COMPLETED', 'DRAFT'])
        .orderBy("createdAt", "desc")
        .get()

    default:
      return query()
        .where("status", "==", 'COMPLETED')
        .orderBy("createdAt", "desc")
        .get()
  }
}

export const getOrder = (orderId) => { 
  return firebase
  .firestore()
  .collection(`orders/${orderId}`)
  // .orderBy("email", "asc")
}
