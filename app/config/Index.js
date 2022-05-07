import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

export const app = initializeApp({
  apiKey: "AIzaSyB0rT58CpuZZpfLYaoyu-omkJvGV2fhO0g",
  authDomain: "surveit-app-128ab.firebaseapp.com",
  projectId: "surveit-app-128ab",
  storageBucket: "surveit-app-128ab.appspot.com",
  messagingSenderId: "840663871741",
  appId: "1:840663871741:web:b1b30c6a90ddb55dbf0e94",
  measurementId: "G-6LLSD2MWVL",
});

export const db = getFirestore(app);