// ====================
// Dark Mode Toggle
// ====================
const themeToggle = document.getElementById('theme-switch');
const htmlElement = document.documentElement;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlElement.setAttribute('data-theme', 'dark');
}

themeToggle?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ====================
// Smooth Scroll & Active Nav Link
// ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================
// Mobile Menu
// ====================
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navLinksContainer?.classList.remove('active');
    });
});

// ====================
// Animated Counter
// ====================
function animateCounter(element, target, isDecimal = false) {
    let current = 0;
    const increment = target / 50;
    const duration = 1000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        if (isDecimal) {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = current.toFixed(1);
            }
        } else {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }
    }, stepTime);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const numberElement = stat.querySelector('.stat-number');
            const target = parseFloat(stat.getAttribute('data-count'));
            const isDecimal = target % 1 !== 0;
            
            animateCounter(numberElement, target, isDecimal);
            counterObserver.unobserve(stat);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    counterObserver.observe(stat);
});

// ====================
// Project Filtering
// ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Refresh scroll reveal after filtering (so new visible cards animate)
        refreshScrollReveal();
    });
});

// ====================
// Video Modal
// ====================
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.close-modal');

function openVideo(videoId) {
    modal.classList.add('active');
    modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    modal.classList.remove('active');
    modalVideo.src = '';
    document.body.style.overflow = '';
}

closeModal?.addEventListener('click', closeVideoModal);

modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeVideoModal();
    }
});

// Add click handlers to play buttons
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const videoId = btn.getAttribute('data-video-id');
        openVideo(videoId);
    });
});

// ====================
// Discord Copy to Clipboard
// ====================
const discordCard = document.getElementById('discord-copy');

discordCard?.addEventListener('click', async (e) => {
    e.preventDefault();
    const discordUsername = discordCard.querySelector('p').textContent;
    
    try {
        await navigator.clipboard.writeText(discordUsername);
        
        // Show feedback
        const tooltip = discordCard.querySelector('.copy-tooltip');
        const originalText = tooltip.textContent;
        tooltip.textContent = 'Copied!';
        tooltip.style.opacity = '1';
        
        setTimeout(() => {
            tooltip.textContent = originalText;
            tooltip.style.opacity = '0';
        }, 1500);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
});

// ====================
// Custom Cursor (Desktop only)
// ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.borderColor = 'var(--accent)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = 'var(--accent)';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}

// ====================
// SCROLL REVEAL ANIMATION
// ====================

// Select all elements with scroll-reveal class
const revealElements = document.querySelectorAll('.scroll-reveal');

// Create Intersection Observer for scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add revealed class to trigger animation
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -50px 0px' // Slight offset for smoother timing
});

// Observe each scroll-reveal element
revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Function to refresh scroll reveal after filtering
function refreshScrollReveal() {
    const visibleCards = document.querySelectorAll('.project-card:not([style*="display: none"])');
    
    visibleCards.forEach(card => {
        if (!card.classList.contains('revealed')) {
            revealObserver.observe(card);
        }
    });
}

// Run once on load to reveal any elements already in view
window.addEventListener('load', () => {
    revealElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top < windowHeight - 100) {
            element.classList.add('revealed');
            revealObserver.unobserve(element);
        }
    });
});

// Console greeting
console.log('%c🎬 Said | Video Editor Portfolio', 'color: #6366f1; font-size: 16px; font-weight: bold;');