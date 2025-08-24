// Toggle nav menu
const toggleMenu = () => {
  const navLinks = document.querySelector('.nav-links');
  navLinks?.classList.toggle('active');
};

// Dark Mode Toggle
const toggleDarkMode = () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
};

//LINKING DYNAMIC DESTINATION DETAILS PAGE WITH INDEX HTML
// Make destination cards clickable to open details page
document.querySelectorAll('#destinations .card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.id;
    if (id) {
      window.location.href = `destination_details.html?id=${encodeURIComponent(id)}`;
    }
  });
});

// Navigate to details page on dropdown change
document.getElementById("searchBtn").addEventListener("click", function () {
  const dropdown = document.getElementById("dropdown");
  const selectedValue = dropdown.value;

  if (selectedValue) {
    // Redirect with query param just like grid panels
    window.location.href = `destination_details.html?id=${selectedValue}`;
  } else {
    alert("Please select a destination first!");
  }
});



// Toggle favorite for destinations
const toggleFavorite = (id, iconElement) => {
  let favorites = JSON.parse(localStorage.getItem('favoriteDestinations')) || [];
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
    iconElement.textContent = '♡';
    iconElement.classList.remove('favorited');
  } else {
    favorites.push(id);
    iconElement.textContent = '♥';
    iconElement.classList.add('favorited');
  }
  localStorage.setItem('favoriteDestinations', JSON.stringify(favorites));
};

// Profile menu toggle
const toggleProfileMenu = () => {
  const dropdown = document.getElementById('profileDropdown');
  dropdown?.classList.toggle('show');
};

// Show profile function
const showProfileStatus = () => {
  alert('Please Log in first!');
};

// Close profile dropdown when clicking outside
document.addEventListener('click', (e) => {
  const profileMenu = document.querySelector('.profile-menu');
  const dropdown = document.getElementById('profileDropdown');
  
  if (profileMenu && !profileMenu.contains(e.target)) {
    dropdown?.classList.remove('show');
  }
});

// Initialize on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  // Restore dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  // Initialize favorite icons from localStorage
  const favorites = JSON.parse(localStorage.getItem('favoriteDestinations')) || [];
  document.querySelectorAll('#destinations .card').forEach(card => {
    const id = card.dataset.id;
    const icon = card.querySelector('.favorite-icon');
    if (!icon || !id) return;

    if (favorites.includes(id)) {
      icon.textContent = '♥';
      icon.classList.add('favorited');
    } else {
      icon.textContent = '♡';
      icon.classList.remove('favorited');
    }
    icon.addEventListener('click', () => toggleFavorite(id, icon));
  });

  // Date picker validation
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');
  if (startDate && endDate) {
    endDate.addEventListener('change', () => {
      const start = new Date(startDate.value);
      const end = new Date(endDate.value);
      if (end < start) {
        alert("End date must be after start date.");
        endDate.value = "";
      }
    });
  }
});
