// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDasbZ3tu8rGPIHbuWKvDNUqK9ZS6yloNw',
  authDomain: 'leotube-35b74.firebaseapp.com',
  projectId: 'leotube-35b74',
  storageBucket: 'leotube-35b74.appspot.com',
  messagingSenderId: '495443390630',
  appId: '1:495443390630:web:20ff32f418f3fcc62ac467',
  measurementId: 'G-078QH07Z9Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
