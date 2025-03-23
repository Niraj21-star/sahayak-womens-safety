import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX3JRHjmnnGf62L0UzRo5MTDMPVsFgNbE",
  authDomain: "sahayak-safety-app.firebaseapp.com",
  projectId: "sahayak-safety-app",
  storageBucket: "sahayak-safety-app.appspot.com",
  messagingSenderId: "174553843597",
  appId: "1:174553843597:web:40654bac9ba1dfebebdfc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { firebaseConfig }; 