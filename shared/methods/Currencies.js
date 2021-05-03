import firebase from "../firebase";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const createCurrency = (body, user) => { 
  return firebase
  .firestore()
  .collection('Currencies')
  .add({
    ...body,
    status: 'ACTIVE',
    userId: user.uid,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
}

export const getCurrencies = () => { 
  return firebase
  .firestore()
  .collection("Currencies")
  .get()
}

export const getCurrency = (currencyId) => { 
  return firebase
  .firestore()
  .collection(`Currencies/${currencyId}`)
}

export const updateCurrencies = (currencies) => { 
  if (Array.isArray(currencies)) {
    for (let index = 0; index < currencies.length; index++) {
      return firebase
      .firestore()
      .collection(`Currencies/${currencies[index].id}`)
      .onSnapshot((context, snap) => {
        
      })
    }
  }
}

