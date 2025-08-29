function renderHero({
    title,
    subtitle,
    description,
    successRate,
    qualifiedCount,
    yearsOfExcellence,
    bannerImageUrl,
    floatingHighlights = []
}) {
    const heroContainer = document.getElementById('hero-section');
    if (!heroContainer) return;

    heroContainer.innerHTML = `
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="text-5xl md:text-6xl font-bold text-volcanic-red mb-6">
          ${title}
        </h1>
        <h2 class="text-3xl md:text-4xl font-semibold text-volcanic-blue mb-8">
          ${subtitle}
        </h2>
        <p class="text-xl text-gray-700 mb-8 leading-relaxed">
          ${description}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <button class="bg-volcanic-red text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-colors text-lg">
            <a href="contact">Start Free Demo</a>
          </button>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-volcanic-red">${successRate}%</div>
            <div class="text-sm text-gray-600">Pass Rate</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-volcanic-blue">${qualifiedCount}</div>
            <div class="text-sm text-gray-600">Board Toppers</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-volcanic-red">${yearsOfExcellence}+</div>
            <div class="text-sm text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>

      <div class="relative">
        <div class="animate-float">
          <img src="${bannerImageUrl}" alt="Banner" class="rounded-2xl shadow-2xl" />
        </div>

        ${floatingHighlights.map((text, idx) => `
          <div class="absolute ${idx === 0 ? '-top-4 -left-4' : '-bottom-4 -right-4'} bg-white p-4 rounded-xl shadow-lg glassmorphism">
            <div class="flex items-center">
              <div class="w-3 h-3 ${idx === 0 ? 'bg-volcanic-red' : 'bg-volcanic-blue'} rounded-full mr-2"></div>
              <span class="text-sm font-semibold">${text}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderInsights({ title, subtitle, examPattern, topicBreakdown }) {
    const container = document.getElementById('about');
    if (!container) return;

    container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-volcanic-red mb-6">${title}</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">${subtitle}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch mb-10">
        <!-- Exam Pattern Column -->
        <div class="bg-gray-50 p-8 rounded-2xl shadow-md h-full flex flex-col justify-between">
          <h3 class="text-3xl font-bold text-volcanic-blue mb-6">JEE Physics Pattern 2025</h3>
          <div class="space-y-5">
            <div class="bg-white p-5 rounded-xl shadow-sm">
              <h4 class="font-bold text-volcanic-red mb-2">Question Format</h4>
              <p class="text-gray-700">${examPattern.questionFormat}</p>
            </div>
            <div class="bg-white p-5 rounded-xl shadow-sm">
              <h4 class="font-bold text-volcanic-blue mb-2">Exam Duration</h4>
              <p class="text-gray-700">${examPattern.duration}</p>
            </div>
            <div class="bg-white p-5 rounded-xl shadow-sm">
              <h4 class="font-bold text-volcanic-red mb-2">Marking System</h4>
              <p class="text-gray-700">${examPattern.markingSystem}</p>
            </div>
          </div>
        </div>

        <!-- Topic Breakdown Column -->
        <div class="bg-gray-50 p-8 rounded-2xl shadow-md h-full flex flex-col justify-between">
          <h3 class="text-2xl font-bold text-volcanic-blue mb-6">Most Important Physics Topics</h3>
          <div class="space-y-3">
            ${topicBreakdown.map((item, index) => `
              <div class="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                <span class="font-medium text-gray-700">${item.topic}</span>
                <span class="${index % 2 === 0 ? 'text-volcanic-red' : 'text-volcanic-blue'} font-semibold">
                  ${item.percentage}%
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPrograms({ title, subtitle, programs, courseId, slug }) {
    const container = document.getElementById('courses');
    if (!container) return;

    container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-volcanic-red mb-6">${title}</h2>
        <p class="text-xl text-gray-600">${subtitle}</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${programs.map((program, i) => `
          <div class="bg-white rounded-2xl shadow-md overflow-hidden card-hover flex flex-col ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}">
            <div class="${program.mode === 'offline' ? 'bg-volcanic-blue' : 'bg-volcanic-red'} h-2"></div>
            <div class="p-8 flex flex-col flex-grow">
              <div class="w-16 h-16 ${program.mode === 'offline' ? 'bg-volcanic-blue' : 'bg-volcanic-red'} rounded-full flex items-center justify-center mb-6">
                <i class="${getProgramIcon(program.mode)} text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-bold ${program.mode === 'offline' ? 'text-volcanic-red' : 'text-volcanic-blue'} mb-4">${program.title}</h3>
              <p class="text-gray-600 mb-6">${program.description}</p>
              <div class="space-y-3 mb-6">
                ${program.features.map(feature => `
                  <div class="flex items-center">
                    <i class="fas fa-check ${program.mode === 'offline' ? 'text-volcanic-blue' : 'text-volcanic-red'} mr-3"></i>
                    <span class="text-sm">${feature}</span>
                  </div>
                `).join('')}
              </div>
              <div class="mt-auto">
                <div class="text-center mb-6">
                  <div class="text-3xl font-bold ${program.mode === 'offline' ? 'text-volcanic-blue' : 'text-volcanic-red'}">₹${program.price.toLocaleString()}</div>
                  <div class="text-sm text-gray-500">${program.priceLabel}</div>
                </div>
                <button class="w-full ${program.mode === 'offline' ? 'bg-volcanic-blue' : 'bg-volcanic-red'} text-white py-3 rounded-lg font-semibold" onclick="enrollNowRedirect('${courseId}','${program.mode}','${slug}')">
                  Enroll Now
                </button>
                <div class="w-full text-center my-2">
                <a href="#contact"  class="w-full text-center ${program.mode === 'offline' ? 'text-volcanic-blue' : 'text-volcanic-red'} font-semibold">
                  Enquiry Now
                </a>
                
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Utility function to get icon class based on mode
function getProgramIcon(mode) {
    switch (mode) {
        case 'online': return 'fas fa-laptop';
        case 'offline': return 'fas fa-chalkboard-teacher';
        case 'hybrid': return 'fas fa-star';
        default: return 'fas fa-book';
    }
}



function renderWhyAndTopics({ title, subtitle, whyChooseUs, topicCoverage }) {
    const container = document.getElementById('why-topics-section');
    if (!container) return;

    container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-volcanic-red mb-6">${title}</h2>
        <p class="text-xl text-gray-600">${subtitle}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-start">
        <!-- Left: Why Choose Us -->
        <div class="flex flex-col justify-start">
          <h3 class="text-3xl font-bold text-volcanic-blue mb-8">Why Choose Volcanic Physics?</h3>
          <div class="space-y-6">
            ${whyChooseUs.map((item, i) => `
              <div class="flex items-start">
                <div class="w-10 h-10 aspect-square ${i % 2 === 0 ? 'bg-volcanic-red' : 'bg-volcanic-blue'} rounded-full flex items-center justify-center text-white mr-4 mt-1">
                  <i class="fas ${item.icon} text-base"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800 mb-1">${item.title}</h4>
                  <p class="text-gray-600 text-sm">${item.description}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Topics Covered -->
        <div class="bg-white p-8 rounded-2xl shadow-md">
          <h3 class="text-2xl font-bold text-volcanic-red mb-6">Physics Topics Covered</h3>
          <div class="space-y-4">
            ${topicCoverage.map((topic, i) => `
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold ${i % 2 === 0 ? 'text-volcanic-blue' : 'text-volcanic-red'} mb-1">${topic.title}</h4>
                <p class="text-sm text-gray-600">${topic.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}


function renderFaculty({ title, subtitle, faculty }) {
    const container = document.getElementById('faculty-section');
    if (!container) return;

    container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-volcanic-red mb-6">${title}</h2>
        <p class="text-xl text-gray-600">${subtitle}</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        ${faculty.map(fac => `
          <div class="bg-white rounded-2xl shadow-md overflow-hidden card-hover">
            <img src="${fac.photoUrl}" alt="${fac.name}" class="w-full h-64 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-volcanic-blue mb-1">${fac.name}</h3>
              <p class="text-volcanic-red font-semibold mb-2">${fac.designation}</p>
              <p class="text-gray-600 text-sm mb-4">${fac.bio}</p>
              <span class="inline-block ${fac.expertiseColor || 'bg-volcanic-red/10 text-volcanic-red'} text-xs font-medium px-3 py-1 rounded-full">
                ${fac.expertise.join(' • ')}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTestimonials({ title, subtitle, testimonials }) {
    const container = document.getElementById('testimonials-section');
    if (!container) return;

    container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-volcanic-red mb-6">${title}</h2>
        <p class="text-xl text-gray-600">${subtitle}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        ${testimonials.map(t => `
          <div class="bg-white rounded-lg shadow-md p-8 card-hover">
            <div class="flex items-center mb-6">
              <img src="${t.photoUrl}" alt="${t.name}" class="w-16 h-16 rounded-full object-cover mr-4" />
              <div>
                <h4 class="font-bold text-volcanic-blue text-lg">${t.name}</h4>
                <p class="text-volcanic-red font-semibold">${t.scoreSummary}</p>
                <p class="text-gray-600 text-sm">${t.subjectScore}</p>
              </div>
            </div>
            <p class="text-gray-700 italic">"${t.quote}"</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
















// coursePageMeta.js

const coursePageMeta = {
    // JEE Course (ObjectId)
    "689038f345e818c1b8687a57": {
        faculty: {
            title: "Meet Our Physics Experts",
            subtitle: "Learn from highly qualified mentors who simplify concepts and boost ranks"
        },
        testimonials: {
            title: "Success Stories",
            subtitle: "Hear from our successful JEE Mains qualifiers"
        },
        whyChooseUs: {
            title: "Master Physics with Our Experts",
            subtitle: "Expert-led Physics coaching for JEE & NEET — driven by 15+ years of experience and a results-focused approach at Volcanic Classes."
        },
        programs: {
            title: "Our JEE Mains Programs",
            subtitle: "Choose from our focused programs—designed to boost your rank with conceptual clarity and expert mentoring"
        },
        insights: {
            title: "JEE Mains 2025 - Volcanic Classes Insights",
            subtitle: "Get the latest exam pattern, topic-wise strategy, and physics blueprint curated by Volcanic’s expert mentors."
        },
        hero: {
            ctaText: "Start Free Trial"
        }
    },

    // Board Exam Course (Slug)
    "6890751645e818c1b8687a65": {
        faculty: {
            title: "Meet Our Faculty",
            subtitle: "Trusted mentors for 11th & 12th board preparation"
        },
        testimonials: {
            title: "Board Toppers Speak",
            subtitle: "Hear from our successful students"
        },
        whyChooseUs: {
            title: "Why Students Trust Us",
            subtitle: "Simplified physics and proven results across all boards"
        },
        programs: {
            title: "Board Coaching Programs",
            subtitle: "Choose the right blend of online and offline classes"
        },
        insights: {
            title: "Board Strategy Insights",
            subtitle: "Stay aligned with the latest board patterns and scoring trends"
        },
        hero: {
            ctaText: "Start Free Demo"
        }
    },

    // NEET Course (Slug)
    "689074bd45e818c1b8687a63": {
        faculty: {
            title: "Our NEET Physics Mentors",
            subtitle: "Trusted teachers focused on NEET Physics preparation and NCERT concepts"
        },
        testimonials: {
            title: "NEET Toppers Speak",
            subtitle: "See how Volcanic helped students crack NEET Physics with top scores"
        },
        whyChooseUs: {
            title: "Why Choose Volcanic for NEET",
            subtitle: "Concept clarity + NCERT edge = Success in NEET Physics"
        },
        programs: {
            title: "NEET Preparation Programs",
            subtitle: "Pick your mode — Online, Offline, or Hybrid"
        },
        insights: {
            title: "NEET 2025 Physics Strategy",
            subtitle: "Understand the marking scheme, trends, and topic weights for NEET"
        },
        hero: {
            ctaText: "Join Free NEET Trial"
        }
    }
};



function getCourseIdFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('courseId');
}

async function loadCourseDetails() {
    const courseId = getCourseIdFromQuery();
    if (!courseId) return alert("No courseId provided.");

    try {
        const res = await fetch(`https://back.volcanicclasses.org/api/courses/${courseId}`);
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();
        const course = data.data;
        const meta = coursePageMeta[courseId] || {}; // fallback to empty if not found
        console.log(course)
        renderHero({
            title: course.title,
            subtitle: course.subtitle,
            description: course.description,
            successRate: course.successRate,
            qualifiedCount: course.qualifiedCount,
            yearsOfExcellence: course.yearsOfExcellence,
            bannerImageUrl: course.bannerImageUrl,
            floatingHighlights: course.floatingHighlights,
            ctaText: meta.hero?.ctaText || "Start Now"
        });

        renderInsights({
            title: meta.insights?.title || "Insights",
            subtitle: meta.insights?.subtitle || "",
            examPattern: course.examPattern,
            topicBreakdown: course.topicBreakdown
        });

        renderPrograms({
            title: meta.programs?.title || "Programs",
            subtitle: meta.programs?.subtitle || "",
            courseId: course._id,
            slug: course.slug,
            programs: course.programs
        });

        renderWhyAndTopics({
            title: meta.whyChooseUs?.title || "Why Choose Us",
            subtitle: meta.whyChooseUs?.subtitle || "",
            whyChooseUs: course.whyChooseUs,
            topicCoverage: course.topicCoverage
        });

        renderFaculty({
            title: meta.faculty?.title || "Our Faculty",
            subtitle: meta.faculty?.subtitle || "",
            faculty: course.faculty
        });

        renderTestimonials({
            title: meta.testimonials?.title || "Testimonials",
            subtitle: meta.testimonials?.subtitle || "",
            testimonials: course.testimonials
        });

    } catch (err) {
        console.error(err);
        alert("Failed to load course details.");
    }
}

function enrollNowRedirect(courseId, programMode, slug) {
    const formUrl = `../form.html?courseId=${encodeURIComponent(courseId)}&mode=${encodeURIComponent(programMode)}&slug=${encodeURIComponent(slug)}`;
    window.location.href = formUrl;
}

window.addEventListener('DOMContentLoaded', loadCourseDetails);
