// Toggle nav menu
const toggleMenu = () => {
  const navLinks = document.querySelector('.nav-links');
  navLinks?.classList.toggle('active');
};

// Modal open/close
const openModal = () => {
  const modal = document.getElementById('loginModal');
  if (modal) modal.style.display = 'flex';
};

const closeModal = () => {
  const modal = document.getElementById('loginModal');
  if (modal) modal.style.display = 'none';
};

// Close modal when clicking outside modal content
window.addEventListener('click', (event) => {
  const modal = document.getElementById('loginModal');
  if (modal && event.target === modal) {
    modal.style.display = 'none';
  }
});

// Dark Mode Toggle
const toggleDarkMode = () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
};

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

// Scroll progress bar only (no scroll-to-top button)
window.addEventListener('scroll', () => {
  const scroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scroll / height) * 100;

  const scrollProgress = document.getElementById("scrollProgress");
  if (scrollProgress) {
    scrollProgress.style.width = `${scrolled}%`;
  }
});

// Preloader hide on page load
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.style.display = "none";
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

  // Dropdown Toggle Logic
  const dropdownBtn = document.querySelector('.custom-dropdown button');
  const dropdownList = document.querySelector('.custom-dropdown .dropdown-options');

  if (dropdownBtn && dropdownList) {
    dropdownBtn.addEventListener('click', () => {
      dropdownList.classList.toggle('hidden');
    });

    dropdownList.querySelectorAll('li').forEach(option => {
      option.addEventListener('click', () => {
        dropdownBtn.textContent = option.textContent;
        dropdownList.classList.add('hidden');
      });
    });

    // Close dropdown on outside click
    window.addEventListener('click', (e) => {
      if (!dropdownBtn.contains(e.target) && !dropdownList.contains(e.target)) {
        dropdownList.classList.add('hidden');
      }
    });
  }
});
