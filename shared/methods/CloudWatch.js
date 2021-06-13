import firebase from "../firebase";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

const db = firebase.firestore();

const getID = (strToID = 'random string') => {
  let ID;
  if (strToID && strToID.split('|')[2]) [,, ID] = strToID.split('|')
  if (ID && ID.split('.')[0]) [ID] = ID.split('.')
  if (ID && ID.split('-')) ID = ID.split(' ').join('-')
  return ID
}

const importantWatch = (msg) => msg && (msg.includes('ERROR') || msg.includes('error'))
const CloudWatches = (body) => importantWatch(body) && db.collection('CloudWatches')
  .doc(getID(body))
  .set({
    body,
    time: body.split('|')[0],
    severity: body.split('|')[1],
    message: body.split('|')[2],
    // userId: user.uid,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }, { merge: true })


export default CloudWatches
