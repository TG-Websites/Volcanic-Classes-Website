// Mobile menu toggle
      const mobileMenuBtn = document.getElementById("mobile-menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");

      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      // Image slider functionality
      let currentSlide = 0;
      const slides = document.querySelectorAll(".slide");
      const dots = document.querySelectorAll(".slider-dot");
      const slider = document.getElementById("imageSlider");

      function showSlide(index) {
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dots.forEach((dot, i) => {
          if (i === currentSlide) {
            dot.classList.remove("opacity-50");
            dot.classList.add("opacity-100");
          } else {
            dot.classList.remove("opacity-100");
            dot.classList.add("opacity-50");
          }
        });
      }

      function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }

      // Auto-slide every 5 seconds
      setInterval(nextSlide, 5000);

      // Dot click handlers
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index);
        });
      });

      // Testimonials slider functionality
      let currentTestimonial = 0;
      const testimonialSlides = document.querySelectorAll(".testimonial-slide");
      const testimonialDots = document.querySelectorAll(".testimonial-dot");
      const testimonialSlider = document.getElementById("testimonialSlider");
      const prevBtn = document.getElementById("prevTestimonial");
      const nextBtn = document.getElementById("nextTestimonial");

      function showTestimonial(index) {
        if (testimonialSlides.length === 0) return;

        currentTestimonial = index;
        if (testimonialSlider) {
          testimonialSlider.style.transform = `translateX(-${
            currentTestimonial * 100
          }%)`;
        }

        // Update dots
        testimonialDots.forEach((dot, i) => {
          if (i === currentTestimonial) {
            dot.classList.remove("bg-gray-300");
            dot.classList.add("bg-volcanic-red");
          } else {
            dot.classList.remove("bg-volcanic-red");
            dot.classList.add("bg-gray-300");
          }
        });
      }

      function nextTestimonial() {
        if (testimonialSlides.length === 0) return;
        currentTestimonial =
          (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
      }

      function prevTestimonial() {
        if (testimonialSlides.length === 0) return;
        currentTestimonial =
          (currentTestimonial - 1 + testimonialSlides.length) %
          testimonialSlides.length;
        showTestimonial(currentTestimonial);
      }

      // Event listeners for testimonial navigation
      if (nextBtn) nextBtn.addEventListener("click", nextTestimonial);
      if (prevBtn) prevBtn.addEventListener("click", prevTestimonial);

      // Dot click handlers for testimonials
      testimonialDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showTestimonial(index);
        });
      });

      // Auto-slide testimonials every 6 seconds
      if (testimonialSlides.length > 0) {
        setInterval(nextTestimonial, 6000);
        // Initialize first testimonial
        showTestimonial(0);
      }

      // Video category dropdown functionality
      const videoCategory = document.getElementById("videoCategory");
      videoCategory.addEventListener("change", function () {
        const selectedCategory = this.value;
        // Here you would typically load different videos based on selection
        console.log("Selected category:", selectedCategory);
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });