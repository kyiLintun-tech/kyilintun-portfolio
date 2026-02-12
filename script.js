document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year in Footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Animate hamburger to X (simple CSS toggle needed or JS animation)
            // For now, let's rely on basic toggle and maybe add CSS transform later if needed
            // But better to add 'aria-expanded' for accessibility
            const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !expanded);
        });
    }

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scrolling for Anchor Links (Polyfill for older browsers/Safari if needed, but CSS scroll-behavior usually works)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjusting for fixed navbar height (approx 80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Reveal animations on scroll
    const sections = document.querySelectorAll('.section');

    const revealSection = (entries, observer) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
        section.classList.add('section-hidden');
    });

    // Add Intersection Observer class for CSS
    // Let's add the styles for this dynamically if not in CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .section-hidden {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s ease-out;
        }
        .section-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);


    // Optional: Add active class to nav links on scroll
    const navItems = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });
});
