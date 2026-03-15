// Particle Effects Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        
        let size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
    }
}
createParticles();

// Theme Toggle Setup
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-mode');
    
    // Switch icon and save to local storage
    if (document.documentElement.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('portfolio-theme', 'light');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('portfolio-theme', 'dark');
    }
});



// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.innerHTML = navLinks.classList.contains('nav-active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Remove active class from all links
            document.querySelectorAll('.nav-links li a').forEach(link => link.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            window.scrollTo({
                top: targetElement.offsetTop - 70, // 70px offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    const isLightMode = document.documentElement.classList.contains('light-mode');
    
    if (window.scrollY > 50) {
        navbar.style.background = isLightMode ? 'rgba(248, 250, 252, 0.95)' : 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = isLightMode ? 'rgba(248, 250, 252, 0.85)' : 'rgba(15, 23, 42, 0.7)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    }
});

// "View Experience" button custom transition
const viewExpBtn = document.getElementById('view-experience-btn');
const homeSection = document.getElementById('home');
const expSection = document.getElementById('experience');

viewExpBtn.addEventListener('click', () => {
    // Add slide left animation to home content
    const heroContent = document.querySelector('.hero-content');
    heroContent.classList.add('slide-left-fade');
    
    // Smooth scroll to experience section after slight delay
    setTimeout(() => {
        window.scrollTo({
            top: expSection.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Remove class after animation completes so it's ready if scrolled back up
        setTimeout(() => {
            heroContent.classList.remove('slide-left-fade');
        }, 800);
    }, 300);
});

// Intersection Observer for scroll animations (fade in effect)
const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Optional: stop observing once shown
            // observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

hiddenElements.forEach(el => observer.observe(el));

// Highlight Navigation Menu on Scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Image Modal Preview for Experience Section
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.modal-close');
const expImages = document.querySelectorAll('.exp-img-wrapper');

expImages.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        const imgSrc = wrapper.getAttribute('data-img');
        modal.style.display = 'block';
        modalImg.src = imgSrc;
        // Stop body scrolling
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 3D Hover Effect for Project Cards & Hero Card
const projectCards = document.querySelectorAll('.project-card');
const heroCard = document.querySelector('.hero-image-wrapper');

function apply3DEffect(card) {
    if (!card) return;
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // max rotation 5deg
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
}

projectCards.forEach(apply3DEffect);
apply3DEffect(heroCard);

// Typing Effect for Dev Role
const typingTextMenu = ["Software Engineer", "Frontend Developer", "UI/UX Designer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeEffect() {
    const currentWord = typingTextMenu[textIndex];
    if (!typingElement) return;

    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2500; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTextMenu.length;
        typeSpeed = 800; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the typing effect when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    if(typingElement) {
        setTimeout(typeEffect, 1000); // initial delay
    }
});
