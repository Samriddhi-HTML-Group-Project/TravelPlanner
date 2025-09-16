import { Destinations } from './data.js';
import { auth , db } from "./firebase.js";
// Import Firestore and Auth functions
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";



document.addEventListener('DOMContentLoaded', () => {

    //for avoiding fraction of delay during auth state check
    const destnAppEl = document.getElementById("destn-app");
    const destnLoadingEl = document.getElementById("destn-loadingScreen");

    const params = new URLSearchParams(window.location.search);
    const destinationId = params.get("id");
    const destination = Destinations.find(dest => dest.id === destinationId);
    if (destination) {
        //destination title
        document.getElementById("destn-title").textContent = destination.title || '';

        //destination description
        document.getElementById("destn-description").textContent = destination.description || '';

        //highlights
        const highlightsList = document.getElementById("highlights-list");
        highlightsList.innerHTML = "";
        if (destination.highlights && destination.highlights.length > 0) {
            destination.highlights.forEach(highlight => {
                const li = document.createElement("li");
                li.className = "highlight-card";
                li.textContent = highlight;
                highlightsList.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.className = "highlight-card";
            li.textContent = "No highlights available.";
            highlightsList.appendChild(li);
        }

        //Images, one main and other 2 side by side sub images
        const mainImg = document.getElementById("main-img");
        const sideImg1 = document.getElementById("side-img-1");
        const sideImg2 = document.getElementById("side-img-2");
        mainImg.innerHTML = destination.images && destination.images[0] ? `<img src="${destination.images[0]}" alt="${destination.title}">` : '<span style="color:#bbb;font-style:italic;">No image</span>';
        sideImg1.innerHTML = destination.images && destination.images[1] ? `<img src="${destination.images[1]}" alt="${destination.title}">` : '<span style="color:#bbb;font-style:italic;">No image</span>';
        sideImg2.innerHTML = destination.images && destination.images[2] ? `<img src="${destination.images[2]}" alt="${destination.title}">` : '<span style="color:#bbb;font-style:italic;">No image</span>';



        // Favorite button logic: 
        const favBtn = document.getElementById('favBtn');
        let isFav = false;

        // --- Function to check if this destination is already in user's favorites ---
        const checkFav = async () => {
            if (!auth.currentUser) return; // No user logged in 

            const userDocRef = doc(db, "users", auth.currentUser.uid); // Reference to or pointing to current user's document
            const userDocSnap = await getDoc(userDocRef); //fetching all the fields from users or simply snapping the unique user documents

            if (userDocSnap.exists()) {
                // If user doc exists, check the 'favs' array
                const favsArray = userDocSnap.data().favs || [];
                isFav = favsArray.includes(destination.id); //returns true if the current destination id exists in the favorites array
                favBtn.classList.toggle('active', isFav); // to keep  heart toggled red when page loads if favorited in firebase
            } else {
                // If user doc doesn't exist, create it with empty favs array
                await setDoc(userDocRef, { favs: [] }); // This is for new users who don’t have a document in Firestore yet.
                                                        // It creates the document for the user and initializes the favs array as empty.
                                                        // If you don’t do this, getDoc will return nothing and favs will be undefined.
                isFav = false;
            }
        };

        // --- Call checkFav whenever auth state changes ---
        onAuthStateChanged(auth, () => {
            destnLoadingEl.style.display = "none";
            destnAppEl.style.display = "block";
            checkFav(); // to check the fav status in firebase and sync it with firestore database
        });

        // --- Handle favorite button click ---
        favBtn.addEventListener('click', async () => {
            if (!auth.currentUser) {
                alert("Please log in to save favorites!");
                return;
            }

            const userDocRef = doc(db, "users", auth.currentUser.uid);

            if (!isFav) { // !isFav --> !0 --> 1 --> true
                // Add destination ID to favs array
                await updateDoc(userDocRef, { favs: arrayUnion(destination.id) });//adds the current destination id to the favorites array
                isFav = true; //--> isFav becomes 1
            } else {
                // Remove destination ID from favs array
                await updateDoc(userDocRef, { favs: arrayRemove(destination.id) });//removes the current destination id from the favorites array
                isFav = false; // --> isFav becomes 0
            }

            // Update heart button visually
            favBtn.classList.toggle('active', isFav); //red heart if isFav = 1, otherwise no 
            //so basically, if the heart is not red and user clicks, then if condition runs and heart toggles red 
            //and if the heart is already red and user clicks, then else condition runs and heart toggles normal/hollow 
        });



    } else {
        document.getElementById("destn-title").textContent = "Destination Not Found";
        document.getElementById("destn-description").textContent = "Sorry, we couldn't find details for this destination.";
        document.getElementById("main-img").innerHTML = '';
        document.getElementById("side-img-1").innerHTML = '';
        document.getElementById("side-img-2").innerHTML = '';
        const highlightsList = document.getElementById("highlights-list");
        highlightsList.innerHTML = '';
    }
});
