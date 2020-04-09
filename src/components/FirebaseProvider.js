import React from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import AppLoading from "../components/AppLoading";

import firebaseConfig from "../config/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const FieldValue = firebase.firestore.FieldValue;
export const storage = firebase.storage();

const FirebaseContext = React.createContext();

export function useFirebase() {
  return React.useContext(FirebaseContext);
}

export default function FirebaseProvider(props) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <AppLoading />;
  }
  return (
    <FirebaseContext.Provider
      value={{
        user
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
}
