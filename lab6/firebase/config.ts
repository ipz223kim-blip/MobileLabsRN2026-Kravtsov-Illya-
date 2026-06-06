import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAk-G4tHZAdcj3ENuz8Pi27Tgd9FXR6MKU",
  authDomain: "lab6-react-native.firebaseapp.com",
  projectId: "lab6-react-native",
  storageBucket: "lab6-react-native.firebasestorage.app",
  messagingSenderId: "578763491662",
  appId: "1:578763491662:web:abe26483bbadbf2908361f",
  measurementId: "G-GR4S4FTJTP"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;