// JavaScript Document
/*
 * MATAF FST 2026 - Interactive & Animation Scripts (Optimized for Mobile & 60fps)
 */

document.addEventListener('DOMContentLoaded', function(){
    // Create glowing particles (optimized: 6 lightweight particles on mobile, 20 on desktop)
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const isMobile = window.innerWidth <= 768;
        const particleCount = isMobile ? 6 : 20;
        const colors = ['#ff2a9d', '#00f0ff', '#a855f7', '#ffffff', '#70f7ff'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = (Math.random() * 12) + 's';
            particle.style.animationDuration = (Math.random() * 8 + (isMobile ? 14 : 10)) + 's';

            const chosenColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.setProperty('--particle-color', chosenColor);

            particlesContainer.appendChild(particle);
        }
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        const mobileLinks = document.querySelectorAll('.nav-links a');
        if (mobileLinks.length) {
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }
    }

    // Active navigation highlighting & navbar scroll effect (Throttled for 60fps)
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 120;
        if (!sections || sections.length === 0) return;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop || 0;
            const sectionHeight = section.offsetHeight || 0;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (currentNav) currentNav.classList.add('active');
            }
        });
    }

    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const navbar = document.getElementById('navbar');
                if (navbar) {
                    if (window.scrollY > 40) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }
                if (sections && sections.length) updateActiveNav();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    if (sections && sections.length) updateActiveNav();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Feature tabs functionality
    const tabs = document.querySelectorAll('.tab-item');
    const panels = document.querySelectorAll('.content-panel');
    if (tabs && tabs.length) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                const targetPanel = document.getElementById(tabId);
                if (targetPanel) targetPanel.classList.add('active');
            });
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Pesan terkirim! Panitia akan segera menghubungi Anda.");
            this.reset();
        });
    }

    // Initialize particles (lightweight)
    createParticles();
});