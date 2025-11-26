# 🌍 Travel Planner

![Website](https://img.shields.io/badge/Website-TravelPlanner-blue)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-yellow)
![HTML](https://img.shields.io/badge/HTML5-orange)
![CSS](https://img.shields.io/badge/CSS3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-yellowgreen)

A simple web-based travel planner that helps users explore destinations, build itineraries, track budgets, save favorites, and write travel notes. Built with **HTML, CSS, JavaScript**, and **Firebase**.

---

## 🚀 Features

**Implemented features:**

- 🔐 **User Authentication** – Login & Signup using Firebase  
- 🗺️ **Destination Search & Explore** – Browse travel destinations  
- 📅 **Itinerary Builder** – Predefined day-wise itineraries for 1–7 days  
- 🧮 **Budget & Expense Tracker** – Plan your trip expenses  
- ❤️ **Save Favorites** – Save destinations to your favorite list (requires login)  
- 📝 **Travel Notes** – Keep personal notes or journals for your trips (requires login)  
- 🌐 **Responsive Design** – Works on desktop and mobile devices  

> Note: Dark mode and navbar are only on the homepage. Only 9 destinations are included to avoid huge permutations in itineraries.

---

## 🗂️ Project Structure

**HTML Pages:**  

- `index.html` – Homepage with navbar, search, and dark mode  
- `login.html` / `signup.html` – User authentication  
- `favouritelist.html` – Shows user’s favorite destinations  
- `destination_details.html` – Destination details and favorite button  
- `itinerary.html` – Predefined itineraries (1–7 days, 9 destinations)  
- `b_tracker.html` – Budget and expense tracker  
- `travelnotes.html` – User travel notes  
- `travelnotessection.html` – Internal JS for travel notes  

**JavaScript Files:**  

- `firebase.js` – Firebase config and authentication logic  
- `app.js` – Handles login, signup, and auth state management for navbar, favorites, and travel notes  
- `script.js` – Homepage component logic  
- `data.js` – Destination data for destination details  
- `destination_details.js` – Logic for destination details page
- Some pages use internal JS

**CSS:**  

- Some pages use internal CSS, while others use external stylesheets  

---

## 🔧 How to Use

1. Clone the repository:
   ```bash
    git clone https://github.com/Samriddhi-HTML-Group-Project/TravelPlanner.git
2. Open index.html in your browser
3. Use Login/Signup to access features like favorites and travel notes
4. Explore destinations, build itineraries, track budget, and save notes

## 🛠️ Technologies Used

Frontend: HTML, CSS, JavaScript, Git

Backend & Auth: Firebase Authentication & Firestore

Responsive Design: Works on desktop and mobile devices

## ⚠️ Notes

Favorites and travel notes require user login

Predefined itineraries are static; "number of people" input is for demonstration only

Only 9 destinations are included for simplicity

