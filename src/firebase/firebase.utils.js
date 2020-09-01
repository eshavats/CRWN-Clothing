import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCMYwYRxAorBP_sDaYBeeHjHhBf_URehYg",
  authDomain: "crwn-db-b5317.firebaseapp.com",
  databaseURL: "https://crwn-db-b5317.firebaseio.com",
  projectId: "crwn-db-b5317",
  storageBucket: "crwn-db-b5317.appspot.com",
  messagingSenderId: "683775902537",
  appId: "1:683775902537:web:1ddaced7a397650cb31098",
  measurementId: "G-KD9TCX6Y8J",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = await firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user!", error.message);
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
