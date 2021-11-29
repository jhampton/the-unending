// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// PRODUCTION
const firebaseConfig = {
  apiKey: "AIzaSyBOlXorQp2CzJZ22xwRlOk1ykipqLaCHEc",
  authDomain: "theunending-3b0d9.firebaseapp.com",
  projectId: "theunending-3b0d9",
  storageBucket: "theunending-3b0d9.appspot.com",
  messagingSenderId: "652541855617",
  appId: "1:652541855617:web:b44d852aea5e053b14ca80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
