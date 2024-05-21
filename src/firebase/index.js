// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyCs43J5X-vJh_WWwvv8T6fx08DCsY3ODyk",
//   authDomain: "learn-english-40bb4.firebaseapp.com",
//   projectId: "learn-english-40bb4",
//   storageBucket: "learn-english-40bb4.appspot.com",
//   messagingSenderId: "355473983734",
//   appId: "1:355473983734:web:c12ee0364c67302a3444d7",
//   measurementId: "G-Q2HTLRDS1E",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC39sDHnWRjSrgqG5hNYyExSF7u9jiEzfw",
  authDomain: "blog-app-da024.firebaseapp.com",
  projectId: "blog-app-da024",
  storageBucket: "blog-app-da024.appspot.com",
  messagingSenderId: "253445080126",
  appId: "1:253445080126:web:fe0b0495eaf1fb59cb3d6f",
  measurementId: "G-HHHK8PP97W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
