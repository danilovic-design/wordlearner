import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBQtd_z4BQmUZF3vKM1EC6yiIfozlCE3Rk",
  authDomain: "wordlearner-de3ab.firebaseapp.com",
  projectId: "wordlearner-de3ab",
  storageBucket: "wordlearner-de3ab.appspot.com",
  messagingSenderId: "388850798655",
  appId: "1:388850798655:web:a86b718be7bcfb0a18e88a",
  measurementId: "G-QWTPYXNZPH",
};

const app = initializeApp(firebaseConfig);

// eslint-disable-next-line
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
