// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Animation for Hero Section
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ['DevOps Engineer', 'Cloud Specialist', 'Security Enthusiast', 'SEO Expert'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Smooth scrolling for anchor links
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

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to my newsletter!');
        newsletterForm.reset();
    });
}

// Animate skill bars on scroll
const skillSection = document.querySelector('#skills');
const progressBars = document.querySelectorAll('.skill-progress');

function checkScroll() {
    if (!skillSection) return;
    
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos) {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
        window.removeEventListener('scroll', checkScroll);
    }
}

window.addEventListener('scroll', checkScroll);

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.project-card, .blog-card, .skill-category, .timeline-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Dark mode toggle (optional feature)
const createDarkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.classList.add('dark-mode-toggle');
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 100;
        box-shadow: var(--shadow-lg);
        transition: all 0.3s ease;
    `;
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggle.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
    
    document.body.appendChild(toggle);
};

// Uncomment to enable dark mode toggle
// createDarkModeToggle();

// Project filtering (optional)
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lazy loading images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Dynamic year in footer
const yearSpan = document.querySelector('.current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Back to top button
const createBackToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.classList.add('back-to-top');
    btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 80px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--secondary-color);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 100;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(btn);
};

createBackToTop();

// Console welcome message
console.log('%c👋 Welcome to Umair Nasir\'s Portfolio!', 'font-size: 20px; color: #2563eb; font-weight: bold;');
console.log('%c🚀 DevOps Engineer | Cloud Specialist | Security Enthusiast', 'font-size: 14px; color: #10b981;');