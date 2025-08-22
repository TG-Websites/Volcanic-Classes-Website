document.addEventListener('DOMContentLoaded', async () => {
    const courseListContainer = document.getElementById('course-list');
    const courseListContainerForMobile = document.getElementById('mobile-course-list');
    const courseSelect = document.querySelector('select[name="courseInterest"]'); // <-- Select box

    if (!courseListContainer) {
        console.error('Element with id "course-list" not found.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/courses');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            // Clear existing content
            courseListContainer.innerHTML = '';
            courseListContainerForMobile.innerHTML = '';
            
            // Clear existing options except first one ("Select Course")
            if (courseSelect) {
                courseSelect.innerHTML = '<option value="">Select Course</option>';
            }

            data.data.forEach(item => {
                const baseUrl = window.location.origin;
                const categoryHtml = `
                    <a href="${baseUrl}/courses/course-detail.html?courseId=${item._id}"
                        class="block px-4 py-3 text-sm text-volcanic-blue hover:bg-volcanic-red hover:text-white transition-colors border-b border-gray-100 last:border-b-0">
                        <div class="font-semibold">${item.title}</div>
                        <div class="text-xs text-gray-500 hover:text-white">${item.subtitle}</div>
                    </a>`;

                courseListContainer.innerHTML += categoryHtml;
                courseListContainerForMobile.innerHTML += categoryHtml;

                // Add to select dropdown
                if (courseSelect) {
                    const option = document.createElement('option');
                    option.value = item._id;  // You can use item.title if you prefer
                    option.textContent = item.title;
                    courseSelect.appendChild(option);
                }
            });
        } else {
            courseListContainer.innerHTML = '<p>No course categories found.</p>';
            courseListContainerForMobile.innerHTML = '<p>No course categories found.</p>';
            if (courseSelect) {
                courseSelect.innerHTML = '<option value="">No courses available</option>';
            }
        }

    } catch (error) {
        console.error('Error fetching distinct course categories:', error);
        courseListContainer.innerHTML = '<p>Failed to load course categories. Please try again later.</p>';
        courseListContainerForMobile.innerHTML = '<p>Failed to load course categories. Please try again later.</p>';
        if (courseSelect) {
            courseSelect.innerHTML = '<option value="">Failed to load courses</option>';
        }
    }
});
