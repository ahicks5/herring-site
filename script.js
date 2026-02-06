/**
 * The Last City - Author Website JavaScript
 * ==========================================
 * Vanilla JavaScript - No frameworks required
 */

(function () {
    'use strict';

    // ===========================================
    // DOM Elements
    // ===========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const promoModal = document.getElementById('promoModal');
    const modalClose = document.getElementById('modalClose');
    const promoRibbon = document.getElementById('promoRibbon');
    const ribbonClose = document.getElementById('ribbonClose');
    const copyCodeBtn = document.getElementById('copyCode');

    // ===========================================
    // Configuration
    // ===========================================
    const CONFIG = {
        popupDelay: 3000,           // 3 seconds before popup shows
        scrollOffset: 80,           // Offset for smooth scroll (nav height)
        sessionKey: 'lastCityPopupShown'
    };

    // ===========================================
    // Utility Functions
    // ===========================================

    /**
     * Debounce function for scroll events
     */
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

    /**
     * Check if element is in viewport
     */
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ===========================================
    // Navigation
    // ===========================================

    /**
     * Handle navbar background on scroll
     */
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Smooth scroll to section
     */
    function smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - CONFIG.scrollOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // ===========================================
    // Promo Modal
    // ===========================================

    /**
     * Show the promo modal
     */
    function showPromoModal() {
        promoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Hide the promo modal
     */
    function hidePromoModal() {
        promoModal.classList.remove('active');
        document.body.style.overflow = '';

        // Show the ribbon after closing modal
        showPromoRibbon();

        // Mark popup as shown for this session
        sessionStorage.setItem(CONFIG.sessionKey, 'true');
    }

    /**
     * Initialize popup with delay (only once per session)
     */
    function initPromoPopup() {
        // Check if popup was already shown this session
        if (sessionStorage.getItem(CONFIG.sessionKey)) {
            // Popup was already shown, just show the ribbon
            showPromoRibbon();
            return;
        }

        // Show popup after delay
        setTimeout(showPromoModal, CONFIG.popupDelay);
    }

    // ===========================================
    // Promo Ribbon
    // ===========================================

    /**
     * Show the promo ribbon
     */
    function showPromoRibbon() {
        promoRibbon.classList.add('visible');
    }

    /**
     * Hide the promo ribbon
     */
    function hidePromoRibbon() {
        promoRibbon.classList.remove('visible');
    }

    // ===========================================
    // Copy to Clipboard
    // ===========================================

    /**
     * Copy promo code to clipboard
     */
    async function copyPromoCode() {
        const code = 'LASTCITY10';

        try {
            await navigator.clipboard.writeText(code);

            // Visual feedback
            const originalHTML = copyCodeBtn.innerHTML;
            copyCodeBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            copyCodeBtn.style.color = '#4ade80';

            setTimeout(() => {
                copyCodeBtn.innerHTML = originalHTML;
                copyCodeBtn.style.color = '';
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = code;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }

    // ===========================================
    // Form Handling
    // ===========================================

    /**
     * Handle newsletter form submission
     */
    function handleFormSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to your newsletter service
        // For now, we'll just show a success message
        console.log('Form submitted:', data);

        // Show success feedback
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribed!';
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = '#4ade80';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            form.reset();
        }, 3000);
    }

    // ===========================================
    // Lazy Loading Images
    // ===========================================

    /**
     * Initialize lazy loading for images
     */
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // ===========================================
    // Scroll Animations
    // ===========================================

    /**
     * Initialize scroll-triggered animations
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.section-header, .book-description, .book-sidebar, .author-content, .newsletter-content'
        );

        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
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

            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                animationObserver.observe(el);
            });
        }
    }

    // ===========================================
    // Event Listeners
    // ===========================================

    function initEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', debounce(handleNavbarScroll, 10));

        // Mobile menu toggle
        navToggle.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    closeMobileMenu();
                    smoothScrollTo(href);
                }
            });
        });

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    smoothScrollTo(href);
                }
            });
        });

        // Modal close button
        modalClose.addEventListener('click', hidePromoModal);

        // Close modal when clicking overlay
        promoModal.addEventListener('click', (e) => {
            if (e.target === promoModal) {
                hidePromoModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && promoModal.classList.contains('active')) {
                hidePromoModal();
            }
        });

        // Ribbon click opens modal
        promoRibbon.addEventListener('click', (e) => {
            if (e.target !== ribbonClose && !ribbonClose.contains(e.target)) {
                showPromoModal();
            }
        });

        // Ribbon close button
        ribbonClose.addEventListener('click', (e) => {
            e.stopPropagation();
            hidePromoRibbon();
        });

        // Copy promo code
        copyCodeBtn.addEventListener('click', copyPromoCode);

        // Form submissions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
        });
    }

    // ===========================================
    // Initialize
    // ===========================================

    function init() {
        // Set initial navbar state
        handleNavbarScroll();

        // Initialize event listeners
        initEventListeners();

        // Initialize lazy loading
        initLazyLoading();

        // Initialize scroll animations
        initScrollAnimations();

        // Initialize promo popup (after delay)
        initPromoPopup();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
