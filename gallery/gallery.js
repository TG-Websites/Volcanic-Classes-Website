const galleryAPI = "http://localhost:5000/api/media";

function renderGallery(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (!items || items.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500">No items found.</p>`;
        return;
    }

    items.forEach(item => {
        const imageUrl = item.url || "placeholder.jpg";
        const category = item.tags || "General";   // 👈 changed tag
        const title = item.title || "Untitled";
        const description = item.content || "No description available.";

        container.innerHTML += `
            <div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div class="relative w-full h-60 sm:h-56 md:h-60 lg:h-64">
                    <img src="${imageUrl}" alt="${title}" class="w-full h-full object-cover">
                    <span class="absolute top-2 left-2 bg-volcanic-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                        ${category}
                    </span>
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-800 truncate">${title}</h3>
                    <p class="text-sm text-gray-500 mt-1 line-clamp-3">${description}</p>
                </div>
            </div>
        `;
    });
}

function fetchGallery(filter = "all") {
    let url = galleryAPI;
    if (filter !== "all") {
        url += `?search=${encodeURIComponent(filter)}`;   
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const items = Array.isArray(data.data) ? data.data : [];
            renderGallery("galleryList", items);
        })
        .catch(err => console.error("Error fetching gallery:", err));
}

// Initial load
fetchGallery();

// Handle filter button clicks
document.addEventListener("click", e => {
    if (e.target.classList.contains("filter-btn")) {
        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active", "border-volcanic-red", "text-volcanic-red");
            btn.classList.add("border-gray-300", "text-gray-600");
        });
        
        e.target.classList.add("active", "border-volcanic-red", "text-volcanic-red");
        e.target.classList.remove("border-gray-300", "text-gray-600");
        
        const filter = e.target.getAttribute("data-filter");
        fetchGallery(filter);
    }
});
