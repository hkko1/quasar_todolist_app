// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcJK_Ocx60_ZeEgNVJMGfpcWJrAe7iKE0',
  authDomain: 'quasartodolist.firebaseapp.com',
  projectId: 'quasartodolist',
  storageBucket: 'quasartodolist.appspot.com',
  messagingSenderId: '1011463570363',
  appId: '1:1011463570363:web:ef02b610f336d0fc8c7a9e',
  measurementId: 'G-TQZ7YENRT0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
