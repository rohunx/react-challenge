import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBCnwP1DPXkjDS3x2wWI7Xj-LGug2iRz84",
  authDomain: "react-challenge-4d2f0.firebaseapp.com",
  databaseURL: "https://react-challenge-4d2f0-default-rtdb.firebaseio.com",
  projectId: "react-challenge-4d2f0",
  storageBucket: "react-challenge-4d2f0.firebasestorage.app",
  messagingSenderId: "142251025403",
  appId: "1:142251025403:web:df870526df7193a2c0a15e"
};

export const app = initializeApp(firebaseConfig);