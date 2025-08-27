document.addEventListener('DOMContentLoaded', async () => {
    const courseListContainer = document.getElementById('course-list');
    const courseListContainerForMobile = document.getElementById('mobile-course-list');
    const courseSelect = document.querySelector('select[name="courseInterest"]');
    const sidebarCourseList = document.getElementById('sidebar-course-list');
    const courseCardsContainer = document.getElementById('course-cards'); // <-- NEW

    if (!courseListContainer) {
        console.error('Element with id "course-list" not found.');
        return;
    }

    try {
        const response = await fetch('https://back.volcanicclasses.org/api/courses');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            // Clear existing content
            courseListContainer.innerHTML = '';
            courseListContainerForMobile.innerHTML = '';
            if (sidebarCourseList) sidebarCourseList.innerHTML = '';
            if (courseCardsContainer) courseCardsContainer.innerHTML = '';

            // Reset dropdown
            if (courseSelect) {
                courseSelect.innerHTML = '<option value="">Select Course</option>';
            }

            data.data.forEach(item => {
                const baseUrl = window.location.origin;

                // For dropdowns (existing)
                const categoryHtml = `
                    <a href="${baseUrl}/courses/course-detail.html?courseId=${item._id}"
                        class="block px-4 py-3 text-sm text-volcanic-blue hover:bg-[#CE3852] hover:text-white transition-colors border-b border-gray-100 last:border-b-0">
                        <div class="font-semibold">${item.title}</div>
                        <div class="text-xs text-gray-500 hover:text-white">${item.subtitle || ''}</div>
                    </a>`;

                courseListContainer.innerHTML += categoryHtml;
                courseListContainerForMobile.innerHTML += categoryHtml;

                // For sidebar list (existing)
                if (sidebarCourseList) {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${baseUrl}/courses/course-detail.html?courseId=${item._id}" 
                        class="text-gray-300 hover-text-volcanic">${item.title}</a>`;
                    sidebarCourseList.appendChild(li);
                }

                // For select dropdown (existing)
                if (courseSelect) {
                    const option = document.createElement('option');
                    option.value = item._id;
                    option.textContent = item.title;
                    courseSelect.appendChild(option);
                }

                // ✅ NEW: For course cards
                if (courseCardsContainer) {
                    const card = document.createElement('div');
                    card.className = "bg-white shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-105";

                    card.innerHTML = `
                      <!-- Image -->
                      <div class="h-48 w-full overflow-hidden">
                       <img src="${item.bannerImageUrl || 'https://via.placeholder.com/400x200'}" alt="${item.title}" class="w-full h-full object-cover">
                    </div>

                     <!-- Content -->
                    <div class="p-6">
                  <h3 class="text-xl font-bold text-gray-800 mb-3">${item.title}</h3>
                   <p class="text-gray-600 mb-4 test-sm line-clamp-3">${item.description || "Detailed course description coming soon."}</p>
            
                    <a href="${baseUrl}/courses/course-detail.html?courseId=${item._id}">
                   <button class="w-full bg-volcanic-red text-white py-2 rounded-lg bg-red-600 transition-colors">
                    Explore More
                   </button>
                   </a>
                  </div>
                   `;

                    courseCardsContainer.appendChild(card);
                }

            });
        } else {
            courseListContainer.innerHTML = '<p>No course categories found.</p>';
            courseListContainerForMobile.innerHTML = '<p>No course categories found.</p>';
            if (sidebarCourseList) sidebarCourseList.innerHTML = '<li>No courses available</li>';
            if (courseSelect) {
                courseSelect.innerHTML = '<option value="">No courses available</option>';
            }
            if (courseCardsContainer) {
                courseCardsContainer.innerHTML = '<p>No courses available</p>';
            }
        }

    } catch (error) {
        console.error('Error fetching distinct course categories:', error);
        courseListContainer.innerHTML = '<p>Failed to load course categories. Please try again later.</p>';
        courseListContainerForMobile.innerHTML = '<p>Failed to load course categories. Please try again later.</p>';
        if (sidebarCourseList) sidebarCourseList.innerHTML = '<li>Failed to load courses</li>';
        if (courseSelect) {
            courseSelect.innerHTML = '<option value="">Failed to load courses</option>';
        }
        if (courseCardsContainer) {
            courseCardsContainer.innerHTML = '<p>Failed to load courses</p>';
        }
    }
});