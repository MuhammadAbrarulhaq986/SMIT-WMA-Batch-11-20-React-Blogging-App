// * Import necessary Firebase modules
import {
    getAuth, // * Get the authentication object
    createUserWithEmailAndPassword, // * Create a new user with email and password
    signInWithEmailAndPassword, // * Sign in a user with email and password
    signOut, // * Sign out the current user
} from "firebase/auth";

import app from "./firebaseconfig"; // * Import the Firebase app instance

import {
    getFirestore, // * Get the Firestore database instance
    collection, // * Get a reference to a Firestore collection
    addDoc, // * Add a new document to a Firestore collection
    getDocs, // * Get all documents from a Firestore collection
    query, // * Create a query to filter Firestore documents
    where, // * Filter Firestore documents based on a condition
    deleteDoc, // * Delete a Firestore document
    doc, // * Get a reference to a Firestore document
    updateDoc, // * Update a Firestore document
} from "firebase/firestore";

import {
    getDownloadURL, // * Get the download URL of a file in Firebase Storage
    getStorage, // * Get the Firebase Storage instance
    ref, // * Create a reference to a file in Firebase Storage
    uploadBytes, // * Upload a file to Firebase Storage
} from "firebase/storage";

// * Initialize the authentication object
const auth = getAuth(app);

// * Initialize the Firestore database instance
const db = getFirestore(app);

// * Initialize the Firebase Storage instance
const storage = getStorage(app);

// * Register a new user with email and password
let signUpUser = (obj) => {
    // * Return a promise that resolves with the user's ID
    return new Promise((resolve, reject) => {
        // * Create a new user with email and password
        createUserWithEmailAndPassword(auth, obj.email, obj.password)
            .then(async (res) => {
                // * Get the user's ID
                resolve((obj.id = res.user.uid));
                // * Delete the password from the user object
                delete obj.password;
                // * Add the user to the Firestore database
                await addDoc(collection(db, "users"), obj)
                    .then((res) => {
                        console.log("User   added to database successfully");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                // * Reject the promise with the error message
                reject(err.message);
            });
    });
};

// * Sign in a user with email and password
let loginUser = (obj) => {
    // * Return a promise that resolves with the user's data
    return new Promise((resolve, reject) => {
        // * Sign in the user with email and password
        signInWithEmailAndPassword(auth, obj.email, obj.password)
            .then(async () => {
                // * Get the user's data from the Firestore database
                const q = query(collection(db, "users"), where("id", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // * Resolve the promise with the user's data
                    resolve(doc.data());
                });
            })
            .catch((err) => {
                // * Reject the promise with the error
                reject(err);
            });
    });
};

// * Sign out the current user
const signOutUser = () => {
    // * Return a promise that resolves with a success message
    return new Promise((resolve, reject) => {
        // * Sign out the current user
        signOut(auth)
            .then(() => {
                // * Resolve the promise with a success message
                resolve("User   signed out successfully");
            })
            .catch((error) => {
                // * Reject the promise with the error
                reject(error);
            });
    });
};

// * Get the current user
const getCurrentUser = () => {
    // * Return the current user
    return auth.currentUser;
};

// * Add a new document to a Firestore collection
const sendData = (obj, colName) => {
    // * Return a promise that resolves with a success message
    return new Promise((resolve, reject) => {
        // * Add the document to the Firestore collection
        addDoc(collection(db, colName), obj)
            .then((res) => {
                // * Resolve the promise with a success message
                resolve("Data sent to database successfully");
            })
            .catch((err) => {
                // * Reject the promise with the error
                reject(err);
            });
    });
};

// * Get all documents from a Firestore collection
const getData = (colName, uid) => {
    // * Return a promise that resolves with the documents
    return new Promise(async (resolve, reject) => {
        // * Create an array to store the documents
        const dataArr = [];

        // * Create a query to filter the documents
        const q = query(collection(db, colName), where("uid", "==", uid));

        // * Get the documents from the Firestore collection
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // * Add the document to the array
            dataArr.push(doc.data());
            // * Resolve the promise with the documents
            resolve(dataArr);
        });
        // * Reject the promise with an error message
        reject("Error occurred");
    });
};

// * Get all documents from a Firestore collection
const getAllData = (colName) => {
    // * Return a promise that resolves with the documents
    return new Promise(async (resolve, reject) => {
        // * Create an array to store the documents
        const dataArr = [];

        // * Get the documents from the Firestore collection
        const querySnapshot = await getDocs(collection(db, colName));
        querySnapshot.forEach((doc) => {
            // * Add the document to the array
            const obj = { ...doc.data(), documentId: doc.id };
            dataArr.push(obj);
            // * Resolve the promise with the documents
            resolve(dataArr);
        });
        // * Reject the promise with an error message
        reject("Error occurred");
    });
};

// * Delete a Firestore document
const deleteDocument = async (id, name) => {
    // * Return a promise that resolves with a success message
    return new Promise((resolve, reject) => {
        // * Delete the document from the Firestore collection
        deleteDoc(doc(db, name, id));
        // * Resolve the promise with a success message
        resolve("Document deleted");
        // * Reject the promise with an error message
        reject("Error occurred");
    });
};

// * Update a Firestore document
const updateDocument = async (obj, id, name) => {
    // * Return a promise that resolves with a success message
    return new Promise((resolve, reject) => {
        // * Update the document in the Firestore collection
        const update = doc(db, name, id);
        updateDoc(update, obj);
        // * Resolve the promise with a success message
        resolve("Document updated");
        // * Reject the promise with an error message
        reject("Error occurred");
    });
};

// * Upload a file to Firebase Storage
async function uploadImage(files, email) {
    // * Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, email);
    try {
        // * Upload the file to Firebase Storage
        const uploadImg = await uploadBytes(storageRef, files);
        // * Get the download URL of the file
        const url = await getDownloadURL(storageRef);
        console.log(url);
        // * Return the download URL
        return url;
    } catch (error) {
        console.log(error);
    }
};

// * Initialize Firebase
const init = async () => {
    try {
        // * Initialize Firebase
        await app;
        console.log("Firebase initialized successfully");
    } catch (error) {
        console.log("Error initializing Firebase:", error);
    }
};

// * Reset Firebase
const reset = async () => {
    try {
        // * Reset Firebase
        await signOutUser();
        console.log("Firebase reset successfully");
    } catch (error) {
        console.log("Error resetting Firebase:", error);
    }
};

// * Export the Firebase methods
export {
    auth,
    db,
    signUpUser,
    loginUser,
    signOutUser,
    getCurrentUser,
    sendData,
    getData,
    getAllData,
    deleteDocument,
    updateDocument,
    uploadImage,
    init,
    reset,
}; 