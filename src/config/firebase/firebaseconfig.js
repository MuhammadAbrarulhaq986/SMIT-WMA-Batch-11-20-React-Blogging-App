// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
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

export default app