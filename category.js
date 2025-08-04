document.addEventListener('DOMContentLoaded', async () => {
    const courseListContainer = document.getElementById('course-list');
    const courseListContainerForMobile = document.getElementById('mobile-course-list');

    if (!courseListContainer) {
        console.error('Element with id "course-list" not found.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/categories/distinct-courses');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            courseListContainer.innerHTML = ''; // Clear existing content
            courseListContainerForMobile.innerHTML = ''; // Clear existing content
            data.data.forEach(item => {
                const baseUrl = window.location.origin + "/Volcanic-Classes-Website"
                const categoryHtml = `
                    <a href="${baseUrl}/courses/course-detail.html?courseId=${item.course.id}"
                        class="block px-4 py-3 text-sm text-volcanic-blue hover:bg-volcanic-red hover:text-white transition-colors border-b border-gray-100 last:border-b-0">
                        <div class="font-semibold">${item.course.title}</div>
                        <div class="text-xs text-gray-500 hover:text-white">${item.course.subtitle}</div>
                    </a>`;

                courseListContainer.innerHTML += categoryHtml;
                courseListContainerForMobile.innerHTML += categoryHtml;
            });
        } else {
            courseListContainer.innerHTML = '<p>No course categories found.</p>';
            courseListContainerForMobile.innerHTML = '<p>No course categories found.</p>';
        }

    } catch (error) {
        console.error('Error fetching distinct course categories:', error);
        courseListContainer.innerHTML = '<p>Failed to load course categories. Please try again later.</p>';
        courseListContainerForMobile.innerHTML = '<p>Failed to load course categories. Please try again later.</p>';
    }
});