// Hero Section Animation
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.getElementById('heroContent');
    const changingWord = document.getElementById('changingWord');
    const words = ['Innovation', 'Excellence', 'Quality', 'Expertise'];
    let currentWord = 0;

    // Fade in hero content
    setTimeout(() => {
        heroContent.classList.add('fade-in');
    }, 100);

    // Word carousel
    setInterval(() => {
        currentWord = (currentWord + 1) % words.length;
        changingWord.style.opacity = '0';
        setTimeout(() => {
            changingWord.textContent = words[currentWord];
            changingWord.style.opacity = '1';
        }, 500);
    }, 3000);
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Carousel Functionality
let currentSlide = 0;
const totalSlides = 4; // Total number of slides
const slidesPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

function moveCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    const slideWidth = 100 / slidesPerView;

    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % (totalSlides - slidesPerView + 1);
    } else {
        currentSlide = (currentSlide - 1 + (totalSlides - slidesPerView + 1)) % (totalSlides - slidesPerView + 1);
    }

    track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
}

// Services Section
const services = [
    {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>`,
        title: 'Construction',
        description: 'Full-service construction solutions for commercial and residential projects.',
        details: [
            'New Building Construction',
            'Commercial Development',
            'Industrial Facilities',
            'Residential Complexes'
        ]
    },
    {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/>
        </svg>`,
        title: 'Engineering',
        description: 'Expert engineering services ensuring structural integrity and innovation.',
        details: [
            'Structural Engineering',
            'Civil Engineering',
            'Mechanical Systems',
            'Electrical Design'
        ]
    },
    {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>`,
        title: 'Project Management',
        description: 'Comprehensive project management from inception to completion.',
        details: [
            'Timeline Planning',
            'Resource Allocation',
            'Quality Control',
            'Risk Management'
        ]
    },
    {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/>
        </svg>`,
        title: 'Renovation',
        description: 'Professional renovation services to transform and modernize spaces.',
        details: [
            'Interior Renovation',
            'Exterior Updates',
            'Space Optimization',
            'Modern Upgrades'
        ]
    }
];

// Render Services
document.addEventListener('DOMContentLoaded', () => {
    const servicesGrid = document.getElementById('servicesGrid');
    
    services.forEach((service, index) => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card bg-white p-8 rounded-lg shadow-lg';
        serviceCard.innerHTML = `
            <div class="service-content">
                <div class="mb-4">${service.icon}</div>
                <h3 class="text-xl font-semibold mb-3">${service.title}</h3>
                <p class="text-gray-600 mb-4">${service.description}</p>
                <div class="details hidden mt-6 space-y-4">
                    <h4 class="font-semibold text-blue-600">Key Features:</h4>
                    <ul class="space-y-2">
                        ${service.details.map(detail => `
                            <li class="flex items-center text-gray-700">
                                <span class="bullet-point"></span>
                                ${detail}
                            </li>
                        `).join('')}
                    </ul>
                    <button class="mt-4 text-sm text-blue-600 hover:text-blue-800 font-semibold show-less">
                        Show Less
                    </button>
                </div>
            </div>
        `;

        serviceCard.addEventListener('click', function() {
            const details = this.querySelector('.details');
            const isExpanded = this.classList.contains('expanded');
            
            // Reset all cards
            document.querySelectorAll('.service-card').forEach(card => {
                card.classList.remove('expanded');
                card.querySelector('.details').classList.add('hidden');
            });

            // Expand clicked card if it wasn't expanded
            if (!isExpanded) {
                this.classList.add('expanded');
                details.classList.remove('hidden');
            }
        });

        // Prevent show less button from triggering card collapse
        serviceCard.querySelector('.show-less').addEventListener('click', (e) => {
            e.stopPropagation();
            serviceCard.classList.remove('expanded');
            serviceCard.querySelector('.details').classList.add('hidden');
        });

        servicesGrid.appendChild(serviceCard);
    });
});