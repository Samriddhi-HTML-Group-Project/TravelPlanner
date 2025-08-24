// Firebase SDK import:
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


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

// Auth State Management
const loginBtnEl = document.getElementById("navbar-loginBtn");
const logoutBtnEl = document.getElementById("logout-btn");
const userEmailEl = document.getElementById("userEmail");
const profileSectionEl = document.getElementById("profileSection");
const travelStatsEl = document.getElementById("travelStats");
const favListsEl = document.getElementById("favLists");

onAuthStateChanged(auth, (user) => {
  if (user) {
    //  User is logged in
    if (loginBtnEl) loginBtnEl.style.display = "none";
    if (profileSectionEl) userEmailEl.textContent = "Logged in as:\n" + user.email;
    if (favListsEl) favListsEl.style.display = "block";
    if (travelStatsEl) travelStatsEl.style.display = "block";
    if (logoutBtnEl) logoutBtnEl.style.display = "block";

    // Redirect to homepage immediately if user is logged in
    if (window.location.pathname.includes("login.html") || window.location.pathname.includes("signup.html")) {
      window.location.replace("index.html");
    }
  } else {
    //  User is logged out
    if (loginBtnEl) loginBtnEl.style.display = "block";
    if (profileSectionEl) {
      userEmailEl.textContent = "Login to view profile";
      profileSectionEl.onclick = showProfileStatus;
    }
    if (favListsEl) favListsEl.style.display = "none";
    if (travelStatsEl) travelStatsEl.style.display = "none";
    if (logoutBtnEl) logoutBtnEl.style.display = "none";
  }
});


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
        window.location.replace('index.html');
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
        window.location.replace('index.html'); 
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
        window.location.replace('index.html');
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  });
}

