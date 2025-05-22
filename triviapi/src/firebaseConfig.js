import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCAHmuruypfRs6ORkappnFlnCsSv0NJJBc",
  authDomain: "triviaapi-eed9f.firebaseapp.com",
  projectId: "triviaapi-eed9f",
  storageBucket: "triviaapi-eed9f.firebasestorage.app",
  messagingSenderId: "645643100361",
  appId: "1:645643100361:web:250e5d2bd667763d5b2d18",
  measurementId: "G-JYMHE9B6WS" // Este puedes omitirlo si no usas analytics
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
