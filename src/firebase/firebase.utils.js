import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCQHjsv6lmgce2BVqEXqZKxL5hJ0g7AbeU",
    authDomain: "sketcher-db.firebaseapp.com",
    databaseURL: "https://sketcher-db.firebaseio.com",
    projectId: "sketcher-db",
    storageBucket: "sketcher-db.appspot.com",
    messagingSenderId: "887293817700",
    appId: "1:887293817700:web:6677d9adf8aafac4160071",
    measurementId: "G-RED33CLYVY"
  };


  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;
