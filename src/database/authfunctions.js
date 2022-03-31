import { auth } from "./firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const signUp = (email, password) => {
  console.log("[+] - Signup function executed");
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};
