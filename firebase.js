// Firebase SDK import:
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
// import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Your Firebase config:
const firebaseConfig = {
  apiKey: "AIzaSyArRz5wwUPM57peXc-jnBE1niFqBwzUUF4",
  authDomain: "travelplanner-2d0f9.firebaseapp.com",
  projectId: "travelplanner-2d0f9",
  storageBucket: "travelplanner-2d0f9.firebasestorage.app",
  messagingSenderId: "605600608208",
  appId: "1:605600608208:web:bc0c3e24c3e20d2ec653d5",
  measurementId: "G-53239MZGY7"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export them for reuse
export { auth, db }; //NOTE NO NEED TO import "app" in other js files i.e. this line "const app = initializeApp(firebaseConfig);"
                        //cuz all the other js files use the app as global object, and initializing the app, auth and db
                        // - once is enough cuz we just need to import firebase.js to other files,
                        //  objects like: getAuth() and getFirestore() are not needed to import from url instead can be imported 
                        //  directly from the firebase.js
                        // while other objects maybe needed to be imported from url like: setDoc() , arrayRemove() etc 

//gimme ur gmail or google account so that i can add it to our firebase project 
//travelplanner-2d0f9--> this is our unique travel project in google firebase
//
//                                          travelplanner-2d0f9
//                                                  └── Authentication
//                                                  └── Firestore 
//
//Authentication
//  └──login
//  └──signup
//  └──authStateManagement
//
//Firestore (travelplanner-2d0f9)
// └── users (collection)
//     └─ userUID (document)
//         ├─ favs: ["destId1", "destId2"]
//         ├─ travelNotes: [{destinationID, note, date}]
//         ├─ itinerary: [...]
//         └─ budget: [...]

