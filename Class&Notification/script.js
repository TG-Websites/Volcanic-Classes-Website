// API endpoints
const announcementsAPI = "http://localhost:5000/api/announcements";
const classesAPI = "http://localhost:5000/api/schedules";

// Render Announcements
function renderAnnouncements(containerId, announcements) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    announcements.forEach(item => {
        const dateObj = new Date(item.createdAt);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = dateObj.toLocaleString("default", { month: "short" });

        container.innerHTML += `
            <div class="flex items-start border-b pb-3 update-item">
                <div class="text-center mr-4">
                    <div class="text-lg font-bold text-[#ce3852]">${day}</div>
                    <div class="text-sm text-[#ce3852]">${month}</div>
                </div>
                <div>
                   <p class="font-medium text-gray-800 mb-1">${item.title}</p>
                   <p class="text-sm text-gray-500 leading-snug">${item.content}</p>
                </div>
            </div>
        `;
    });
}

// Render Classes (Schedules)
function renderClasses(containerId, classes) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    classes.forEach(item => {
        const dateObj = new Date(item.date);
        const dateObj2 = new Date(item.createdAt);

        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = dateObj.toLocaleString("default", { month: "short" });

        const createdDay = String(dateObj2.getDate()).padStart(2, "0");
        const createdMonth = dateObj2.toLocaleString("default", { month: "short" });
        const createdYear = dateObj2.getFullYear();

        container.innerHTML += `
            <div class="flex items-start border-b pb-3 update-item">
                <div class="text-center mr-4">
                    <div class="text-lg font-bold text-[#ce3852]">${day}</div>
                    <div class="text-sm text-[#ce3852]">${month}</div>
                </div>
                <div>
                    <p class="font-medium text-gray-800">${item.subject || item.course.title}</p>
                    <p class="text-sm text-gray-500">⏰ ${item.time || "Time not set"}</p>
                    <p class="text-sm text-gray-500 border-2 rounded-full px-2 mt-1">
                        Posted on ${createdDay} ${createdMonth} ${createdYear}
                    </p>
                </div>
            </div>
        `;
    });
}

// Fetch Announcements (limit 10)
fetch(announcementsAPI)
    .then(res => res.json())
    .then(data => {
        const items = Array.isArray(data.data) ? data.data.slice(0, 10) : [];
        renderAnnouncements("announcementsList", items);
    })
    .catch(err => console.error(err));

// Fetch Classes (limit 10)
fetch(classesAPI)
    .then(res => res.json())
    .then(data => {
        const items = Array.isArray(data.data) ? data.data.slice(0, 10) : [];
        renderClasses("classesList", items);
    })
    .catch(err => console.error(err));
