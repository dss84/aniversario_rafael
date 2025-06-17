// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 50, // Reduzido de 100 para 50
    delay: 0
});
    
    // Initialize countdown timer for July 19, 2025, 15:00
    new CountdownTimer('2025-07-19T15:00:00', 'countdown');
    
    // Initialize other components
    new MobileMenu();
    new RSVPForm();
    new SmoothScroll();
    new GalleryViewer();
    new HeaderScroll();
    
    // Add some interactive effects
    addInteractiveEffects();
});

// Countdown Timer
class CountdownTimer {
    constructor(targetDate, elementId) {
        this.targetDate = new Date(targetDate).getTime();
        this.elementId = elementId;
        this.init();
    }

    init() {
        this.updateCountdown();
        this.interval = setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            this.showEventStarted();
            clearInterval(this.interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.updateDisplay(days, hours, minutes, seconds);
    }

    updateDisplay(days, hours, minutes, seconds) {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = this.formatNumber(days);
        if (hoursEl) hoursEl.textContent = this.formatNumber(hours);
        if (minutesEl) minutesEl.textContent = this.formatNumber(minutes);
        if (secondsEl) secondsEl.textContent = this.formatNumber(seconds);
    }

    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }

    showEventStarted() {
        const countdownEl = document.getElementById('countdown');
        const messageEl = document.getElementById('countdown-message');
        
        if (countdownEl) countdownEl.style.display = 'none';
        if (messageEl) messageEl.style.display = 'block';
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.header__mobile-toggle');
        this.nav = document.querySelector('.header__nav');
        this.init();
    }

    init() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }
    }

    toggleMenu() {
        if (this.nav) {
            this.nav.classList.toggle('header__nav--active');
            this.toggle.classList.toggle('header__mobile-toggle--active');
        }
    }
}

// RSVP Form Handler
class RSVPForm {
    constructor() {
        this.form = document.getElementById('rsvpForm');
        this.successMessage = document.getElementById('rsvpSuccess');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Simulate form submission
        this.showLoading();
        
        setTimeout(() => {
            this.showSuccess();
        }, 1500);
    }

    showLoading() {
        const button = this.form.querySelector('.rsvp__button');
        if (button) {
            button.innerHTML = '<span class="rsvp__button-text">Enviando...</span><span class="rsvp__button-icon">⏳</span>';
            button.disabled = true;
        }
    }

    showSuccess() {
        if (this.form && this.successMessage) {
            this.form.style.display = 'none';
            this.successMessage.style.display = 'block';
            
            // Scroll to success message
            this.successMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Gallery Image Viewer
class GalleryViewer {
    constructor() {
        this.init();
    }

    init() {
        const galleryItems = document.querySelectorAll('.gallery__item');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => this.viewImage(item));
        });
    }

    viewImage(item) {
        const img = item.querySelector('img');
        if (img) {
            // Simple alert for demo - in production, you'd use a modal
            const imgSrc = img.src;
            const imgAlt = img.alt;
            
            // Create a simple modal effect
            this.createModal(imgSrc, imgAlt);
        }
    }

    createModal(src, alt) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.image-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="image-modal__backdrop">
                <div class="image-modal__content">
                    <img src="${src}" alt="${alt}" class="image-modal__image">
                    <button class="image-modal__close">&times;</button>
                </div>
            </div>
        `;

        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const backdrop = modal.querySelector('.image-modal__backdrop');
        backdrop.style.cssText = `
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        `;

        const content = modal.querySelector('.image-modal__content');
        content.style.cssText = `
            position: relative;
            background: white;
            border-radius: 10px;
            overflow: hidden;
        `;

        const image = modal.querySelector('.image-modal__image');
        image.style.cssText = `
            width: 100%;
            height: auto;
            display: block;
        `;

        const closeBtn = modal.querySelector('.image-modal__close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);

        // Close handlers
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        // ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// Header Scroll Effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        if (this.header) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            this.header.style.background = 'linear-gradient(135deg, rgba(220, 20, 60, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)';
            this.header.style.backdropFilter = 'blur(10px)';
        } else {
            this.header.style.background = 'linear-gradient(135deg, #dc143c 0%, #1e3a8a 100%)';
            this.header.style.backdropFilter = 'none';
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize countdown timer for July 19, 2025, 15:00
    new CountdownTimer('2025-07-19T15:00:00', 'countdown');
    
    // Initialize other components
    new MobileMenu();
    new RSVPForm();
    new SmoothScroll();
    new GalleryViewer();
    new HeaderScroll();
    
    // Add some interactive effects (SEM O PARALLAX PROBLEMÁTICO)
    addInteractiveEffects();
});

// Additional Interactive Effects (SEM PARALLAX NO HERO)
function addInteractiveEffects() {
    // REMOVIDO: Parallax effect for hero section que estava causando o problema
    // const hero = document.querySelector('.hero');
    // if (hero) {
    //     window.addEventListener('scroll', () => {
    //         const scrolled = window.pageYOffset;
    //         const rate = scrolled * -0.5;
    //         hero.style.transform = `translateY(${rate}px)`;
    //     });
    // }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.details__card, .gallery__item, .countdown__item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add mobile menu styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .header__nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, rgba(220, 20, 60, 0.98) 0%, rgba(30, 58, 138, 0.98) 100%);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .header__nav--active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .header__mobile-toggle--active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .header__mobile-toggle--active span:nth-child(2) {
            opacity: 0;
        }
        
        .header__mobile-toggle--active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Inject mobile menu styles
const styleElement = document.createElement('style');
styleElement.textContent = mobileMenuStyles;
document.head.appendChild(styleElement);