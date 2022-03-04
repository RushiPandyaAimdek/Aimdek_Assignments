import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyAMr5z0mikHoXAVl8xXhdwMFiQ0hSRf894",
    authDomain: "e-commerce-a088f.firebaseapp.com",
    projectId: "e-commerce-a088f",
    storageBucket: "e-commerce-a088f.appspot.com",
    messagingSenderId: "145339535587",
    appId: "1:145339535587:web:d67ad094e209560516f5d6",
    measurementId: "G-WLVP5TEGZV"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = firebase.auth();
export default db