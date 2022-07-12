import { auth } from "./firebaseconfig";

import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword,
  sendPasswordResetEmail,
  getAuth,
  deleteUser,
} from "firebase/auth";

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email, password, persistence) => {
  if (persistence) {
    await setPersistence(auth, browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  } else {
    return signInWithEmailAndPassword(auth, email, password);
  }
};

export const logOut = () => {
  return signOut(auth);
};

export const changeUserPassword = (newPassword) => {
  const user = auth.currentUser;

  return updatePassword(user, newPassword);
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const deleteUserAccount = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return deleteUser(user);
};
