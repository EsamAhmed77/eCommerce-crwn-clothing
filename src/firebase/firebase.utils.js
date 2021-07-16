import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { fireEvent } from "@testing-library/react";

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
