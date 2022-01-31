/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAhf3ZAjGgiLrilgEpzGmNBGVYPWO_8XKU',
  authDomain: 'learning-vocabulary-app.firebaseapp.com',
  projectId: 'learning-vocabulary-app',
  storageBucket: 'learning-vocabulary-app.appspot.com',
  messagingSenderId: '711677769727',
  appId: '1:711677769727:web:a008032b255fcd9c2cd9ca'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfXTkAeAAAAAJe4vZnUyHmXZMwN7AW5Afxw3jm7'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

const db = getFirestore();

export default db;
