// Countdown Timer Class
class CountdownTimer {
    constructor(targetDate, elementId) {
        this.targetDate = new Date(targetDate).getTime();
        this.element = document.getElementById(elementId);
        this.messageElement = document.getElementById('countdown-message');
        
        if (this.element) {
            this.start();
        }
    }
    
    start() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }
    
    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            this.showMessage();
            clearInterval(this.interval);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    showMessage() {
        if (this.element && this.messageElement) {
            this.element.style.display = 'none';
            this.messageElement.style.display = 'block';
        }
    }
}

// RSVP Form Class
class RSVPForm {
    constructor() {
        this.form = document.getElementById('rsvpForm');
        this.successMessage = document.getElementById('rsvpSuccess');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(() => {
            this.form.style.display = 'none';
            this.successMessage.style.display = 'block';
        }, 1000);
    }
}

// Smooth Scroll Class
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Gallery Viewer Class
class GalleryViewer {
    constructor() {
        this.init();
    }
    
    init() {
        const galleryItems = document.querySelectorAll('.gallery__item');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    this.openModal(img.src, img.alt);
                }
            });
        });
    }
    
    openModal(src, alt) {
        // Simple modal implementation
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="gallery-modal__backdrop">
                <div class="gallery-modal__content">
                    <img src="${src}" alt="${alt}">
                    <button class="gallery-modal__close">&times;</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('gallery-modal__close')) {
                document.body.removeChild(modal);
            }
        });
    }
}

// Header Scroll Class
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        if (this.header) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }
}

// Mobile Menu Function (SIMPLES)
function initMobileMenu() {
    const mobileToggle = document.querySelector('.header__mobile-toggle');
    const navMenu = document.querySelector('.header__nav');
    const body = document.body;

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.header__nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
}

// Interactive Effects
function addInteractiveEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.details__card, .gallery__item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize countdown timer for July 19, 2025, 15:00
    new CountdownTimer('2025-07-19T15:00:00', 'countdown');
    
    // Initialize Mobile Menu (função simples)
    initMobileMenu();
    
    // Initialize other components
    new RSVPForm();
    new SmoothScroll();
    new GalleryViewer();
    new HeaderScroll();
    
    // Add interactive effects
    addInteractiveEffects();
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});