// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
    });
    return true
  } catch (error) {
    return {error: error.message}
  }
};

const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true
  } catch (error) {
    return {error: error.message}
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    return true
  } catch (error) {
    return false
  }
};

export { db, signUp, signIn, signOutUser };
