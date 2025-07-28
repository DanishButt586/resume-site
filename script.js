// Mobile nav toggle with overlay and body scroll lock
const navToggle = document.getElementById('nav-toggle');
const navLinksMenu = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');
function closeMobileNav() {
    navLinksMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-nav-open');
    if (navOverlay) navOverlay.classList.remove('open');
}
if (navToggle && navLinksMenu && navOverlay) {
    navToggle.addEventListener('click', function() {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        if (!expanded) {
            navLinksMenu.classList.add('open');
            navToggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('mobile-nav-open');
            navOverlay.classList.add('open');
        } else {
            closeMobileNav();
        }
    });
    // Close nav on link click (mobile)
    navLinksMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    // Close nav on overlay click
    navOverlay.addEventListener('click', closeMobileNav);
    // Close nav on Escape key
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navLinksMenu.classList.contains('open')) closeMobileNav();
    });
}
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

// Animated counter
document.querySelectorAll('.counter').forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-count');
        let count = +counter.textContent;
        if (count < target) {
            counter.textContent = count + 1;
            setTimeout(updateCount, 80);
        } else {
            counter.textContent = target;
        }
    };
    updateCount();
});

// Project Modal
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
const closeModal = document.querySelector('.close-modal');
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', () => {
        modalTitle.textContent = item.getAttribute('data-title');
        modalDesc.textContent = item.getAttribute('data-desc');
        modalLink.href = item.getAttribute('data-link');
        modal.style.display = 'flex';
        modal.focus();
    });
    item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            item.click();
        }
    });
});
if (closeModal) {
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    closeModal.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') modal.style.display = 'none';
    });
}
window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'flex') modal.style.display = 'none';
});
modal && modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
});

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
