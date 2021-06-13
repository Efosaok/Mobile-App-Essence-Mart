import firebase from "../firebase";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

const db = firebase.firestore();

export const createCurrency = (body, user) => db.collection('Currencies')
  .add({
    ...body,
    status: 'ACTIVE',
    userId: user.uid,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })

export const getCurrencies = () => db.collection("Currencies")
  .get()

export const getCurrency = (currencyId) => db.collection(`Currencies/${currencyId}`)

export const updateCurrencies = (currencies) => { 
  if (Array.isArray(currencies)) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < currencies.length; index++) {
      return db.collection(`Currencies/${currencies[index].id}`)
      // .onSnapshot((context, snap) => {
        
      // })
    }
  }
}

