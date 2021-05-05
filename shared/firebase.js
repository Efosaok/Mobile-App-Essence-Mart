import firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyBauGsHuWeyS1c9T3G8pjcihSrSeN2EQAw",
  authDomain: "essence-mart-mobile.firebaseapp.com",
  projectId: "essence-mart-mobile",
  storageBucket: "essence-mart-mobile.appspot.com",
  messagingSenderId: "92687243799",
  appId: "1:92687243799:web:73ee1db98f485bc25c1a52",
  measurementId: "G-H83BCQM74Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export default firebase;
