// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyAl_8NJCsxaO-J5Aj91vA8u9dar4BQ4Vyw",
  // authDomain: "queuing-system-222ff.firebaseapp.com",
  // projectId: "queuing-system-222ff",
  // storageBucket: "queuing-system-222ff.appspot.com",
  // messagingSenderId: "353391046887",
  // appId: "1:353391046887:web:b0b9fc1d2bd3bcc9fef242",
  // measurementId: "G-GEN7HECK0J"

  apiKey: "AIzaSyDoXO-IlizlyOpm5d409mcqNbLBp9OSaao",
  authDomain: "fir-ab9f0.firebaseapp.com",
  databaseURL: "https://fir-ab9f0-default-rtdb.firebaseio.com",
  projectId: "fir-ab9f0",
  storageBucket: "fir-ab9f0.appspot.com",
  messagingSenderId: "280714248034",
  appId: "1:280714248034:web:1b25a92d725400f406b63b",
  measurementId: "G-4EEM0CZR77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);