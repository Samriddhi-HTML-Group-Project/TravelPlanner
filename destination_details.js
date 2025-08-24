import { Destinations } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const destinationId = params.get("id");
    const destination = Destinations.find(dest => dest.id === destinationId);
    if (destination) {
        document.getElementById("destn-title").textContent = destination.title || '';
        document.getElementById("destn-description").textContent = destination.description || '';
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
        const mainImg = document.getElementById("main-img");
        const sideImg1 = document.getElementById("side-img-1");
        const sideImg2 = document.getElementById("side-img-2");
        mainImg.innerHTML = destination.images && destination.images[0] ? `<img src="${destination.images[0]}" alt="${destination.title}">` : '<span style="color:#bbb;font-style:italic;">No image</span>';
        sideImg1.innerHTML = destination.images && destination.images[1] ? `<img src="${destination.images[1]}" alt="${destination.title}">` : '<span style="color:#bbb;font-style:italic;">No image</span>';
        sideImg2.innerHTML = destination.images && destination.images[2] ? `<img src="${destination.images[2]}" alt="${destination.title}">` : '<span style="color:#bbb;font-style:italic;">No image</span>';

        // Favorite button logic: hollow heart, fill red on click
        const favBtn = document.querySelector('.heart-btn');
        let isFav = false;
        favBtn.classList.remove('active');
        favBtn.addEventListener('click', function() {
            isFav = !isFav;
            favBtn.classList.toggle('active', isFav);
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
