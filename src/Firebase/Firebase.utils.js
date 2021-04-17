import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAbJoQUm1CcCM_yABNHhGH8od3ksg23qFE",
  authDomain: "user-contactsa.firebaseapp.com",
  projectId: "user-contactsa",
  storageBucket: "user-contactsa.appspot.com",
  messagingSenderId: "242015092493",
  appId: "1:242015092493:web:4c24b676858d1a747a7a44",
  measurementId: "G-GL19YPCWGL",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email, contactList } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        contactList,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
