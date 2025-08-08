// Enhanced mobile nav toggle with improved accessibility and animations
const navToggle = document.getElementById('nav-toggle');
const navLinksMenu = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');

// Improved mobile navigation functions
function closeMobileNav() {
    navLinksMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-nav-open');
    if (navOverlay) navOverlay.classList.remove('open');
}

function openMobileNav() {
    navLinksMenu.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-nav-open');
    if (navOverlay) navOverlay.classList.add('open');
}

// Enhanced navigation with touch support
if (navToggle && navLinksMenu && navOverlay) {
    navToggle.addEventListener('click', function() {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        if (!expanded) {
            openMobileNav();
        } else {
            closeMobileNav();
        }
    });

    // Close nav on link click (mobile) with smooth scroll
    navLinksMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    closeMobileNav();
                    setTimeout(() => {
                        target.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            } else {
                closeMobileNav();
            }
        });
    });

    // Close nav on overlay click/touch
    navOverlay.addEventListener('click', closeMobileNav);
    navOverlay.addEventListener('touchstart', closeMobileNav);

    // Close nav on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navLinksMenu.classList.contains('open')) {
            closeMobileNav();
        }
    });

    // Handle swipe gestures for mobile nav
    let touchStartX = 0;
    let touchEndX = 0;

    navLinksMenu.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    navLinksMenu.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 100) { // Swipe left to close
            closeMobileNav();
        }
    });
}

// Enhanced scroll-based navbar behavior
let lastScrollY = window.scrollY;

function updateNavbar() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Auto-hide navbar on scroll down (mobile)
    if (window.innerWidth <= 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', updateNavbar);
window.addEventListener('resize', updateNavbar);
// Certifications section entrance animation
function revealCerts() {
    document.querySelectorAll('.cert-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            card.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealCerts);
window.addEventListener('DOMContentLoaded', revealCerts);

// Cert card hover ripple effect
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        card.style.boxShadow = '0 8px 32px #5e5ee544, 0 2px 8px #5e5ee533';
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});
// Section entrance animation
function revealSections() {
    document.querySelectorAll('.section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// Project card ripple effect
document.querySelectorAll('.project-item').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--ripple-x', x + 'px');
        card.style.setProperty('--ripple-y', y + 'px');
    });
});

// Contact social icon hover animation
document.querySelectorAll('.social-links a img').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.22) rotate(-8deg)';
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = '';
    });
});
// Animated background dots
function createAnimatedDots() {
    const bg = document.querySelector('.animated-bg');
    if (!bg) return;
    const colors = ['#5e5ee5', '#b3b3ff', '#23234a', '#fff'];
    for (let i = 0; i < 18; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        const size = Math.random() * 32 + 18;
        dot.style.width = dot.style.height = size + 'px';
        dot.style.left = Math.random() * 100 + 'vw';
        dot.style.top = Math.random() * 100 + 'vh';
        dot.style.background = colors[Math.floor(Math.random() * colors.length)];
        dot.style.animationDuration = (6 + Math.random() * 6) + 's';
        dot.style.opacity = 0.12 + Math.random() * 0.18;
        bg.appendChild(dot);
    }
}
window.addEventListener('DOMContentLoaded', createAnimatedDots);

// Skill icon hover animation (pop effect)
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        const icon = skill.querySelector('.skill-icon');
        if (icon) icon.style.transform = 'scale(1.22) rotate(8deg)';
    });
    skill.addEventListener('mouseleave', () => {
        const icon = skill.querySelector('.skill-icon');
        if (icon) icon.style.transform = '';
    });
});
// Hero typing effect
const typedTitle = document.getElementById('typed-title');
if (typedTitle) {
    const titles = [
        'Full Stack Developer',
        'JavaScript Enthusiast',
        'UI/UX Explorer',
        'Open Source Contributor'
    ];
    let idx = 0, char = 0, isDeleting = false;
    function type() {
        const current = titles[idx % titles.length];
        if (!isDeleting) {
            typedTitle.textContent = current.substring(0, char + 1);
            char++;
            if (char === current.length) {
                isDeleting = true;
                setTimeout(type, 1200);
                return;
            }
        } else {
            typedTitle.textContent = current.substring(0, char - 1);
            char--;
            if (char === 0) {
                isDeleting = false;
                idx++;
            }
        }
        setTimeout(type, isDeleting ? 60 : 90);
    }
    setTimeout(type, 800);
}

// Enhanced animated counter with intersection observer
document.querySelectorAll('.counter').forEach(counter => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-count');
                    let count = +counter.textContent;
                    const increment = target / 50; // Smoother animation
                    
                    if (count < target) {
                        counter.textContent = Math.ceil(count + increment);
                        setTimeout(updateCount, 40);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
});

// Enhanced skill bar animations with intersection observer
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const width = skillLevel.getAttribute('data-label');
                skillLevel.style.width = width;
                observer.unobserve(skillLevel);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// Enhanced viewport-based animations
function enhancedRevealAnimations() {
    const elements = document.querySelectorAll('.section, .timeline-item, .cert-card, .project-item, .skill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'reveal');
                // Add stagger effect for child elements
                const children = entry.target.querySelectorAll('.skill, .project-item, .timeline-item, .cert-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible', 'reveal');
                    }, index * 100);
                });
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '-50px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// Enhanced touch and gesture support
function addTouchSupport() {
    let startY = 0;
    let endY = 0;
    
    // Pull-to-refresh like gesture for back to top
    document.addEventListener('touchstart', e => {
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', e => {
        endY = e.changedTouches[0].clientY;
        
        // If swiped up significantly and at bottom of page
        if (startY - endY > 100 && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Enhanced modal support removed - using consolidated modal handling below

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    enhancedRevealAnimations();
    addTouchSupport();
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Track resume downloads
    const downloadLinks = document.querySelectorAll('a[download]');
    downloadLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Track download event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    event_category: 'Resume',
                    event_label: 'PDF Download',
                    value: 1
                });
            }
            console.log('Resume download tracked');
        });
    });
    
    // Track contact form interactions
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_form_submit', {
                    event_category: 'Contact',
                    event_label: 'Form Submission'
                });
            }
        });
    }
    
    // Track project modal views
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', () => {
            const projectTitle = item.getAttribute('data-title');
            if (typeof gtag !== 'undefined') {
                gtag('event', 'project_view', {
                    event_category: 'Projects',
                    event_label: projectTitle
                });
            }
        });
    });
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', debounce(() => {
        // Recalculate animations on resize
        if (window.innerWidth !== window.innerWidth) {
            location.reload();
        }
    }, 250));
    
    // Add performance optimization
    if ('IntersectionObserver' in window) {
        // Use modern intersection observer
        console.log('Using optimized animations');
    } else {
        // Fallback for older browsers
        console.log('Using fallback animations');
        window.addEventListener('scroll', debounce(enhancedRevealAnimations, 16));
    }
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            // Track performance if analytics is available
            if (typeof gtag !== 'undefined' && loadTime > 0) {
                gtag('event', 'timing_complete', {
                    name: 'load',
                    value: Math.round(loadTime)
                });
            }
            
            console.log(`Page load time: ${loadTime}ms`);
        });
    }
});

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Project Modal with scroll position preservation
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
const closeModalBtn = document.querySelector('.close-modal');
let savedScrollPosition = 0;

// Function to preserve scroll position
function lockBodyScroll() {
    try {
        savedScrollPosition = window.scrollY;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollPosition}px`;
        document.body.style.width = '100%';
        document.body.style.left = '0';
    } catch (error) {
        console.error('Error locking body scroll:', error);
        // Fallback: just hide overflow
        document.body.style.overflow = 'hidden';
    }
}

function unlockBodyScroll() {
    try {
        const scrollY = savedScrollPosition;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        document.body.style.left = '';
        
        // Disable smooth scrolling temporarily to prevent conflicts
        const originalBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Use double requestAnimationFrame for reliable DOM update
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo(0, scrollY);
                // Restore smooth scrolling after a short delay
                setTimeout(() => {
                    document.documentElement.style.scrollBehavior = originalBehavior;
                }, 50);
            });
        });
    } catch (error) {
        console.error('Error unlocking body scroll:', error);
        // Fallback: just restore overflow
        document.body.style.overflow = '';
    }
}

function closeProjectModal() {
    if (modal) {
        modal.style.display = 'none';
        unlockBodyScroll();
    }
}

document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', () => {
        modalTitle.textContent = item.getAttribute('data-title');
        modalDesc.textContent = item.getAttribute('data-desc');
        
        // Update modal header icons for each project
        const modalHeader = modal.querySelector('.project-modal-header');
        const modalTitleElem = modal.querySelector('#modal-title');
        
        // Remove any previous IMS icons before the title
        const prevIcons = modal.querySelector('.ims-icons-before-title');
        if (prevIcons) prevIcons.remove();
        
        if (modalTitle.textContent.includes('Food Delivery App')) {
            modalLink.href = 'https://github.com/DanishButt586/Food-Application/tree/main';
            modalHeader.innerHTML = `
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" alt="Android" style="width:40px;margin-right:10px;vertical-align:middle;">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" alt="Kotlin" style="width:40px;margin-right:10px;vertical-align:middle;">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" style="width:40px;margin-right:10px;vertical-align:middle;">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google Maps" style="width:40px;vertical-align:middle;">
            `;
        } else if (modalTitle.textContent.includes('Inventory Management System')) {
            modalLink.href = 'https://github.com/DanishButt586/Inventory-Management-System';
            modalHeader.innerHTML = '';
            // Add IMS icons before the modal title
            const iconsDiv = document.createElement('div');
            iconsDiv.className = 'ims-icons-before-title';
            iconsDiv.style = 'display:flex;gap:10px;margin:0 0 10px 0;justify-content:center;';
            iconsDiv.innerHTML = `
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" style="width:36px;vertical-align:middle;">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" alt="WPF" style="width:36px;vertical-align:middle;">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" alt="SQL Server" style="width:36px;vertical-align:middle;">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" alt="Visual Studio" style="width:36px;vertical-align:middle;">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" style="width:36px;vertical-align:middle;">
            `;
            modalTitleElem.parentNode.insertBefore(iconsDiv, modalTitleElem);
        } else {
            modalLink.href = item.getAttribute('data-link') || '#';
            modalHeader.innerHTML = '';
        }
        
        // Lock scroll and show modal
        lockBodyScroll();
        modal.style.display = 'flex';
        modal.focus();
    });
    
    item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            item.click();
        }
    });
});

// Close modal event listeners
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeProjectModal);
    closeModalBtn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') closeProjectModal();
    });
}

// Close on escape key
window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeProjectModal();
    }
});

// Close on backdrop click
if (modal) {
    modal.addEventListener('click', e => {
        if (e.target === modal) closeProjectModal();
    });
}

// Animated timeline reveal
function revealTimeline() {
    document.querySelectorAll('.timeline-item').forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            item.classList.add('reveal');
        }
    });
}
window.addEventListener('scroll', revealTimeline);
window.addEventListener('DOMContentLoaded', revealTimeline);


// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinksList = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


// Animate skill bars on scroll into view
// Remove JS-driven skill bar animation. Let CSS handle bar fill only.

// Button focus/active interactivity
document.querySelectorAll('button, .project-item').forEach(el => {
    el.addEventListener('mousedown', () => el.classList.add('active'));
    el.addEventListener('mouseup', () => el.classList.remove('active'));
    el.addEventListener('mouseleave', () => el.classList.remove('active'));
});

// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const THEME_KEY = 'resume-theme';

function setTheme(mode) {
    if (mode === 'light') {
        body.classList.add('light-mode');
        themeToggle.textContent = '🌞';
    } else {
        body.classList.remove('light-mode');
        themeToggle.textContent = '🌙';
    }
    localStorage.setItem(THEME_KEY, mode);
    animateSkills();
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// Load theme from localStorage
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === 'light') {
    setTheme('light');
} else {
    setTheme('dark');
}

// Contact form submission (Formspree integration)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Let Formspree handle the submission, but show a success message on response
        const success = contactForm.querySelector('.form-success');
        // Wait for Formspree response
        contactForm.addEventListener('formspree:submit', function() {
            if (success) {
                success.style.display = 'block';
                setTimeout(() => { success.style.display = 'none'; }, 3500);
            }
            contactForm.reset();
        });
    });
}
