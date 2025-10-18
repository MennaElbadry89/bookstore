import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAjS2ST5Lc22JLhA4sx6eyFeqnx-C0ZRZY",
  authDomain: "bookstore-21.firebaseapp.com",
  projectId: "bookstore-21",
  storageBucket: "bookstore-21.firebasestorage.app",
  messagingSenderId: "966112172853",
  appId: "1:966112172853:web:e12c85beb385f2da0d0a7c",
  measurementId: "G-FQH3SXB6BQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
