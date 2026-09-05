// JavaScript Document
/*
 * MATAF FST 2026 - Interactive & Animation Scripts
 */

document.addEventListener('DOMContentLoaded', function(){
    // Create rich glowing cyber particles matching IG aesthetic
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = 45;
        const colors = ['#ff2a9d', '#00f0ff', '#a855f7', '#ffffff', '#ff6fd8', '#70f7ff'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = (Math.random() * 14) + 's';
            particle.style.animationDuration = (Math.random() * 10 + 12) + 's';

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

    // Active navigation highlighting
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

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        if (sections && sections.length) updateActiveNav();
    });

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

    // Initialize particles
    createParticles();

    // Text rotation with character animation
    const textSets = document.querySelectorAll('.text-set');
    if (textSets && textSets.length) {
        let currentIndex = 0;
        let isAnimating = false;

        function wrapTextInSpans(element) {
            if (!element) return;
            const text = element.textContent || '';
            element.innerHTML = text.split('').map((char, i) =>
                `<span class="char" style="animation-delay: ${i * 0.04}s">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
        }

        function animateTextIn(textSet) {
            if (!textSet) return;
            const glitchText = textSet.querySelector('.glitch-text');
            const subtitle = textSet.querySelector('.subtitle');
            
            wrapTextInSpans(glitchText);
            if (glitchText) glitchText.setAttribute('data-text', glitchText.textContent || '');
            
            if (subtitle) setTimeout(() => subtitle.classList.add('visible'), 700);
        }

        function animateTextOut(textSet) {
            if (!textSet) return;
            const chars = textSet.querySelectorAll('.char');
            const subtitle = textSet.querySelector('.subtitle');
            
            chars.forEach((char, i) => {
                char.style.animationDelay = `${i * 0.02}s`;
                char.classList.add('out');
            });
            
            if (subtitle) subtitle.classList.remove('visible');
        }

        function rotateText() {
            if (isAnimating || textSets.length <= 1) return;
            isAnimating = true;

            const currentSet = textSets[currentIndex];
            const nextIndex = (currentIndex + 1) % textSets.length;
            const nextSet = textSets[nextIndex];

            animateTextOut(currentSet);

            setTimeout(() => {
                if (currentSet) currentSet.classList.remove('active');
                if (nextSet) nextSet.classList.add('active');
                animateTextIn(nextSet);

                currentIndex = nextIndex;
                isAnimating = false;
            }, 600);
        }

        // Initialize first text set
        if (textSets[0]) {
            textSets[0].classList.add('active');
            animateTextIn(textSets[0]);
        }

        // Start rotation after initial display only if multiple sets exist
        if (textSets.length > 1) {
            setTimeout(() => {
                setInterval(rotateText, 5000);
            }, 4000);
        }

        // Subtle random glitch twitch
        setInterval(() => {
            const glitchTexts = document.querySelectorAll('.glitch-text');
            glitchTexts.forEach(text => {
                if (Math.random() > 0.9) {
                    text.style.animation = 'none';
                    setTimeout(() => {
                        text.style.animation = '';
                    }, 180);
                }
            });
        }, 3000);
    }
});