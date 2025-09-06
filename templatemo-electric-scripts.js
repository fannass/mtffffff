// JavaScript Document

/*

TemplateMo 596 Electric Xtra

https://templatemo.com/tm-596-electric-xtra

*/

// Create floating particles
document.addEventListener('DOMContentLoaded', function(){
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return; // nothing to do on pages without particles

        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

            // Random color tweak
            if (Math.random() > 0.5) {
                particle.style.setProperty('--particle-color', '#00B2FF');
                particle.style.background = '#00B2FF';
            }

            particlesContainer.appendChild(particle);
        }
    }

    // Mobile menu toggle (guarded)
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link (only if links exist)
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
        const scrollPosition = window.pageYOffset + 100;
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

    // Navbar scroll effect (guarded)
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        // Always try to update nav if sections exist
        if (sections && sections.length) updateActiveNav();
    });

    // Initial active nav update (guarded)
    if (sections && sections.length) updateActiveNav();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
                // Remove active class from all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));

                // Add active class to clicked tab and corresponding panel (guarded)
                tab.classList.add('active');
                const targetPanel = document.getElementById(tabId);
                if (targetPanel) targetPanel.classList.add('active');
            });
        });
    }

    // Form submission (guarded)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert("Message sent! We'll get back to you soon.");
            this.reset();
        });
    }

    // Initialize particles
    createParticles();

    // Text rotation with character animation (guarded)
    const textSets = document.querySelectorAll('.text-set');
    if (textSets && textSets.length) {
        let currentIndex = 0;
        let isAnimating = false;

        function wrapTextInSpans(element) {
            if (!element) return;
            const text = element.textContent || '';
            element.innerHTML = text.split('').map((char, i) =>
                `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
        }

        function animateTextIn(textSet) {
            if (!textSet) return;
            const glitchText = textSet.querySelector('.glitch-text');
            const subtitle = textSet.querySelector('.subtitle');
            // Wrap text in spans for animation
            wrapTextInSpans(glitchText);
            if (glitchText) glitchText.setAttribute('data-text', glitchText.textContent || '');
            // Show subtitle after main text
            if (subtitle) setTimeout(() => subtitle.classList.add('visible'), 800);
        }

        function animateTextOut(textSet) {
            if (!textSet) return;
            const chars = textSet.querySelectorAll('.char');
            const subtitle = textSet.querySelector('.subtitle');
            // Animate characters out
            chars.forEach((char, i) => {
                char.style.animationDelay = `${i * 0.02}s`;
                char.classList.add('out');
            });
            // Hide subtitle
            if (subtitle) subtitle.classList.remove('visible');
        }

        function rotateText() {
            if (isAnimating) return;
            isAnimating = true;

            const currentSet = textSets[currentIndex];
            const nextIndex = (currentIndex + 1) % textSets.length;
            const nextSet = textSets[nextIndex];

            // Animate out current text
            animateTextOut(currentSet);

            // After out animation, switch sets
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

        // Start rotation after initial display
        setTimeout(() => {
            setInterval(rotateText, 5000); // Change every 5 seconds
        }, 4000);

        // Add random glitch effect
        setInterval(() => {
            const glitchTexts = document.querySelectorAll('.glitch-text');
            glitchTexts.forEach(text => {
                if (Math.random() > 0.95) {
                    text.style.animation = 'none';
                    setTimeout(() => {
                        text.style.animation = '';
                    }, 200);
                }
            });
        }, 3000);
    }
    // end DOMContentLoaded
});