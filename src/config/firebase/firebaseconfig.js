import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAYXDr27PiN5SPp9OVAKZ1FtkH3PFI47E0",
    authDomain: "react-blogging-app-ed83b.firebaseapp.com",
    databaseURL: "https://react-blogging-app-ed83b-default-rtdb.firebaseio.com",
    projectId: "react-blogging-app-ed83b",
    storageBucket: "react-blogging-app-ed83b.appspot.com",
    messagingSenderId: "43803380838",
    appId: "1:43803380838:web:876720f8b2560e9346b1a7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { analytics, db, auth, storage };