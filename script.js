document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION (V2.0) ---
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnngvadv1'; // IMPORTANT: Replace with your Formspree endpoint
    
    const PROGRAMS = [
        { 
            title: 'Personal Training', 
            details: 'Our flagship 1-on-1 program. We start with a comprehensive assessment of your goals, movement patterns, and lifestyle. From there, I design a completely customized workout and nutrition plan. You get my undivided attention during sessions to ensure perfect form and maximum results.',
            features: ['100% Tailored Workouts', 'Full Biometric Assessment', 'Weekly Progress & Form Check-ins']
        },
        { 
            title: 'Group Fitness Classes', 
            details: 'Experience the energy of a group setting. Our classes are designed to be challenging yet scalable for all fitness levels. It\'s a fun, supportive, and high-energy community where you can build strength, burn fat, and make friends.',
            features: ['High-Energy HIIT & Strength Sessions', 'Supportive Community Atmosphere', 'Flexible Class Schedule']
        },
        { 
            title: 'Nutrition Coaching', 
            details: 'Fitness is 80% nutrition. This program focuses on educating you about sustainable eating habits. No crash diets. We develop personalized meal plans based on your preferences, teach you about macros, and provide recipes and grocery lists to make it simple.',
            features: ['Personalized Meal Plans', 'Education on Sustainable Eating', 'Recipes & Grocery Guidance']
        },
        { 
            title: 'Online Coaching', 
            details: 'Get expert coaching from anywhere in the world. This program includes video call sessions, access to our exclusive training app for workout tracking, and constant communication to keep you accountable, no matter where you are.',
            features: ['Train from Anywhere, Anytime', 'Video Call Sessions & Progress Tracking', 'Full Access to Exclusive Training App']
        }
    ];

    const EXERCISES = [
        { name: 'Squats', emoji: '🏋️' }, { name: 'Deadlifts', emoji: '🏋️‍♀️' }, { name: 'Push-Ups', emoji: '💪' },
        { name: 'Pull-Ups', emoji: '🤸' }, { name: 'Kettlebell Swings', emoji: '💣' }, { name: 'Bench Press', emoji: '🏋️' },
        { name: 'Sprints', emoji: '🏃' }, { name: 'Burpees', emoji: '💥' }, { name: 'Planks', emoji: '🧘' }, { name: 'Battle Ropes', emoji: '〰️' }
    ];

    // --- ELEMENT SELECTORS (V2.0 ) ---
    const header = document.getElementById('main-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const accordionContainer = document.querySelector('.accordion');
    const carouselTrack = document.querySelector('.carousel-track');
    const modalOverlay = document.getElementById('contact-modal');
    const modalOpenButtons = document.querySelectorAll('[data-action="open-modal"]');
    const modalCloseButton = document.querySelector('.modal-close');
    const contactForm = document.getElementById('contact-form');

    // --- HEADER & MOBILE NAV (V2.0) ---
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    hamburgerBtn.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
    mobileNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            mobileNav.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // --- ACCORDION FOR PROGRAMS (V2.0) ---
    function setupAccordion() {
        if (!accordionContainer) return;
        accordionContainer.innerHTML = PROGRAMS.map((program, index) => `
            <div class="accordion-item">
                <div class="accordion-header" role="button" aria-expanded="false" aria-controls="content-${index}">
                    <h3>${program.title}</h3>
                    <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </div>
                <div class="accordion-content" id="content-${index}">
                    <div class="accordion-content-inner">
                        <p>${program.details}</p>
                        <ul>
                            ${program.features.map(f => `<li>${f}</li>` ).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');

        const accordionItems = accordionContainer.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                });

                // Open the clicked item if it wasn't already active
                if (!isActive) {
                    item.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }

    // --- INFINITE CAROUSEL ---
    function setupCarousel() {
        if (!carouselTrack) return;
        const allItems = [...EXERCISES, ...EXERCISES];
        carouselTrack.innerHTML = allItems.map(exercise => `
            <div class="carousel-item"><span>${exercise.emoji}</span>${exercise.name}</div>`).join('');
    }

    // --- MODAL HANDLING ---
    function openModal() { /* ... (same as previous version) ... */ }
    function closeModal() { /* ... (same as previous version) ... */ }
    modalOpenButtons.forEach(button => button.addEventListener('click', openModal));
    if (modalCloseButton) modalCloseButton.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modalOverlay.hasAttribute('hidden')) closeModal(); });
    
    // Re-implementing modal functions for clarity
    function openModal() {
        if (!modalOverlay) return;
        modalOverlay.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        modalOverlay.querySelector('input, select, textarea').focus();
    }
    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    // --- FORM HANDLING ---
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) { /* ... (same as previous version) ... */ });
    }
    function validateForm() { /* ... (same as previous version) ... */ }

    // Re-implementing form functions for clarity
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!validateForm()) return;
            const form = e.target;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<div class="spinner"></div>';
            const formData = new FormData(form);
            try {
                const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
                const modalFormContainer = document.getElementById('modal-form-container');
                if (response.ok) {
                    modalFormContainer.innerHTML = `<div class="form-success-message"><h3>Thank You!</h3><p>Your request has been sent. Alex will get back to you within 24 hours.</p></div>`;
                } else { throw new Error('Network response was not ok.'); }
            } catch (error) {
                console.error('Form submission error:', error);
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                alert('There was an error sending your message. Please try again.');
            }
        });
    }
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            const errorElement = field.nextElementSibling;
            if (field.value.trim() === '') {
                field.classList.add('invalid');
                if (errorElement) errorElement.style.display = 'block';
                isValid = false;
            } else {
                field.classList.remove('invalid');
                if (errorElement) errorElement.style.display = 'none';
            }
        });
        return isValid;
    }

    // --- INITIALIZATION (V2.0) ---
    function init() {
        window.addEventListener('scroll', handleScroll);
        setupAccordion();
        setupCarousel();
    }

    init();
});
