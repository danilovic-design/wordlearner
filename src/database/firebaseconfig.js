import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQtd_z4BQmUZF3vKM1EC6yiIfozlCE3Rk",
  authDomain: "wordlearner-de3ab.firebaseapp.com",
  projectId: "wordlearner-de3ab",
  storageBucket: "wordlearner-de3ab.appspot.com",
  messagingSenderId: "388850798655",
  appId: "1:388850798655:web:a86b718be7bcfb0a18e88a",
  measurementId: "G-QWTPYXNZPH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Get a list of cities from your database
/*async function getCities(db) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}*/
