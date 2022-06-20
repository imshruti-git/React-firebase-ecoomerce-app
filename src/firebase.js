// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBguUV8y2YDz__KsPSSGh2aYmpdk2nAvzw",
  authDomain: "ecommerce-react-208fd.firebaseapp.com",
  projectId: "ecommerce-react-208fd",
  storageBucket: "ecommerce-react-208fd.appspot.com",
  messagingSenderId: "517994201988",
  appId: "1:517994201988:web:3eda9f0ba433a56cd993d1"
};


//const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const fbDatabase = getDatabase(app);
// const fs = getFirestore(app);
// const storage = getStorage(app);

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const fs = getFirestore(app);
// const storage = getStorage(app);
const fs = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export {auth, fs, storage};