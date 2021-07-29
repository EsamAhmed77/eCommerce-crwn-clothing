import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { fireEvent } from "@testing-library/dom";

const config = {
  apiKey: "AIzaSyDuSouocv1Mk180b-hFndjjIMJWpsW3bIE",
  authDomain: "crwn-clothing-c653e.firebaseapp.com",
  projectId: "crwn-clothing-c653e",
  storageBucket: "crwn-clothing-c653e.appspot.com",
  messagingSenderId: "291354260979",
  appId: "1:291354260979:web:0eafd4dc27c4a695f98e86",
  measurementId: "G-43CXV1X3X2",
};

firebase.initializeApp(config);

//function that takes the user an d any additional data
export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  //snapshot has a prop exists to detect the existence of the userAuth doc in the collection
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //sending a request to the collection to set a new doc with the userAuth info
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error message:" + error.message);
    }
  }
  return userRef;
};

//exporting auth and firestore from firebase as we will use it in out app
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//making an instance of GoogleAuthProvider then we set a custom params with prompt the we pass the provider to signinwithpopup
export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// import { fireEvent } from "@testing-library/react";

// const config = ;

// firebase.initializeApp(config);

// export const createUserProfileDoc = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   const userRef = firestore.doc(`users/${userAuth.uid}`);

//   const snapShot = await userRef.get();

//   if (!snapShot.exists) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await userRef.set({
//         displayName,
//         email,
//         createdAt,
//         ...additionalData,
//       });
//     } catch (err) {
//       console.log("error creating user", err.message);
//     }
//   }

//   return userRef;
// };

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);
// export default firebase;
