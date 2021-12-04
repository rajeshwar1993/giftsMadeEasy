// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBAj4aaE3TjfI-HLHQ1dV-kWFkfPEakJj0',
  authDomain: 'giftsmadeeasy-75edd.firebaseapp.com',
  projectId: 'giftsmadeeasy-75edd',
  storageBucket: 'giftsmadeeasy-75edd.appspot.com',
  messagingSenderId: '385319281790',
  appId: '1:385319281790:web:09cf5db61d552102d5e42f',
  measurementId: 'G-L8F47TF6GC'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
