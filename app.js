// Firebase SDK import:
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


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

// SIGN UP with confirm password
const signupBtn = document.getElementById('signup-btn');
if (signupBtn) {
  signupBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent any form submission
    console.log('Signup button clicked!'); // Debug log
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    console.log('Email:', email, 'Password length:', password.length); // Debug log

    if (password !== confirm) {
      alert('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    console.log('Creating user...'); // Debug log
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed up:', userCredential.user);
        alert('Signup successful! Redirecting to homepage...');
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  });
}

// LOGIN
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent any form submission
    console.log('Login button clicked!'); // Debug log
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log('Attempting login with email:', email); // Debug log

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Logged in:', userCredential.user);
        alert('Login successful! Redirecting to homepage...');
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  });
}

// LOGOUT
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        alert('Logged out successfully!');
        window.location.href = 'login.html';
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  });
}

