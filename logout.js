// logout.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYEQz3BF7HHAYq4OuYAaSBhncFj9oc8AQ",
    authDomain: "calmguard-4affd.firebaseapp.com",
    databaseURL: "https://calmguard-4affd-default-rtdb.firebaseio.com",
    projectId: "calmguard-4affd",
    storageBucket: "calmguard-4affd.appspot.com",
    messagingSenderId: "647620250169",
    appId: "1:647620250169:web:8b7a7da6381a0ee6c3dbe8",
    measurementId: "G-HRCVMKDQBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Logout function
function logout() {
    signOut(auth)
        .then(() => {
            console.log("User signed out");
            // Redirect to your logout page or homepage
            window.location.href = "front.html";
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
}

export default logout;
