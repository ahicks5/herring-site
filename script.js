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
    const bookContainer = document.getElementById('bookContainer');
    const quoteCarousel = document.getElementById('quoteCarousel');

    // ===========================================
    // Configuration
    // ===========================================
    const CONFIG = {
        popupDelay: 3000,
        scrollOffset: 80,
        sessionKey: 'lastCityPopupShown',
        launchDate: new Date('June 30, 2026 00:00:00').getTime(),
        quoteRotateInterval: 5000
    };

    // ===========================================
    // Utility Functions
    // ===========================================

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

    // ===========================================
    // Navigation
    // ===========================================

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

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
    // Parallax Effect
    // ===========================================

    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        function updateParallax() {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.speed) || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }

        window.addEventListener('scroll', debounce(updateParallax, 10));
    }

    // ===========================================
    // 3D Book Effect
    // ===========================================

    function init3DBook() {
        if (!bookContainer) return;

        const book3d = bookContainer.querySelector('.book-3d');
        if (!book3d) return;

        bookContainer.addEventListener('mousemove', (e) => {
            const rect = bookContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateY = (mouseX / rect.width) * 30;
            const rotateX = -(mouseY / rect.height) * 15;

            book3d.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });

        bookContainer.addEventListener('mouseleave', () => {
            book3d.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }

    // ===========================================
    // Countdown Timer
    // ===========================================

    function initCountdown() {
        const daysEl = document.getElementById('countDays');
        const hoursEl = document.getElementById('countHours');
        const minutesEl = document.getElementById('countMinutes');
        const secondsEl = document.getElementById('countSeconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = CONFIG.launchDate - now;

            if (distance < 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ===========================================
    // Quote Carousel
    // ===========================================

    function initQuoteCarousel() {
        if (!quoteCarousel) return;

        const slides = quoteCarousel.querySelectorAll('.quote-slide');
        const dots = quoteCarousel.querySelectorAll('.quote-dot');
        const arrowLeft = quoteCarousel.querySelector('.quote-arrow-left');
        const arrowRight = quoteCarousel.querySelector('.quote-arrow-right');
        let currentSlide = 0;
        let autoRotate;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        function startAutoRotate() {
            autoRotate = setInterval(nextSlide, CONFIG.quoteRotateInterval);
        }

        function stopAutoRotate() {
            clearInterval(autoRotate);
        }

        // Arrow click handlers
        if (arrowLeft) {
            arrowLeft.addEventListener('click', () => {
                stopAutoRotate();
                prevSlide();
                startAutoRotate();
            });
        }

        if (arrowRight) {
            arrowRight.addEventListener('click', () => {
                stopAutoRotate();
                nextSlide();
                startAutoRotate();
            });
        }

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoRotate();
                showSlide(index);
                startAutoRotate();
            });
        });

        // Pause on hover
        quoteCarousel.addEventListener('mouseenter', stopAutoRotate);
        quoteCarousel.addEventListener('mouseleave', startAutoRotate);

        startAutoRotate();
    }

    // ===========================================
    // Share Buttons
    // ===========================================

    function initShareButtons() {
        const shareButtons = document.querySelectorAll('.share-btn');

        shareButtons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const shareType = btn.dataset.share;
                const pageUrl = encodeURIComponent(window.location.href);
                const shareText = encodeURIComponent('Survival demands sacrifice. Freedom demands blood. Check out this dark fantasy novel - The Last City: Age of Darkness!');

                let shareUrl;

                switch (shareType) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}`;
                        window.open(shareUrl, '_blank', 'width=550,height=420');
                        break;

                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                        window.open(shareUrl, '_blank', 'width=550,height=420');
                        break;

                    case 'copy':
                        try {
                            await navigator.clipboard.writeText(window.location.href);
                            const originalHTML = btn.innerHTML;
                            btn.innerHTML = `
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            `;
                            btn.style.backgroundColor = '#4ade80';
                            btn.style.borderColor = '#4ade80';

                            setTimeout(() => {
                                btn.innerHTML = originalHTML;
                                btn.style.backgroundColor = '';
                                btn.style.borderColor = '';
                            }, 2000);
                        } catch (err) {
                            console.error('Failed to copy:', err);
                        }
                        break;
                }
            });
        });
    }

    // ===========================================
    // Character Cards (Mobile Touch)
    // ===========================================

    function initCharacterCards() {
        const cards = document.querySelectorAll('.character-card');

        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                // On mobile/tablet, tap to flip
                if (window.innerWidth < 900) {
                    // Close other cards first
                    cards.forEach(otherCard => {
                        if (otherCard !== this) {
                            otherCard.classList.remove('flipped');
                        }
                    });
                    this.classList.toggle('flipped');
                }
            });
        });

        // Close flipped cards when tapping outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth < 900 && !e.target.closest('.character-card')) {
                cards.forEach(card => card.classList.remove('flipped'));
            }
        });
    }

    // ===========================================
    // Promo Modal
    // ===========================================

    function showPromoModal() {
        promoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hidePromoModal() {
        promoModal.classList.remove('active');
        document.body.style.overflow = '';
        showPromoRibbon();
        sessionStorage.setItem(CONFIG.sessionKey, 'true');
    }

    function initPromoPopup() {
        if (sessionStorage.getItem(CONFIG.sessionKey)) {
            showPromoRibbon();
            return;
        }
        setTimeout(showPromoModal, CONFIG.popupDelay);
    }

    // ===========================================
    // Promo Ribbon
    // ===========================================

    function showPromoRibbon() {
        promoRibbon.classList.add('visible');
    }

    function hidePromoRibbon() {
        promoRibbon.classList.remove('visible');
    }

    // ===========================================
    // Copy to Clipboard
    // ===========================================

    async function copyPromoCode() {
        const code = 'LASTCITY10';

        try {
            await navigator.clipboard.writeText(code);

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

    function handleFormSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

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

    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.section-header, .book-description, .book-sidebar, .author-content, .newsletter-content, .characters-grid'
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
        window.addEventListener('scroll', debounce(handleNavbarScroll, 10));

        navToggle.addEventListener('click', toggleMobileMenu);

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

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    smoothScrollTo(href);
                }
            });
        });

        modalClose.addEventListener('click', hidePromoModal);

        promoModal.addEventListener('click', (e) => {
            if (e.target === promoModal) {
                hidePromoModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && promoModal.classList.contains('active')) {
                hidePromoModal();
            }
        });

        promoRibbon.addEventListener('click', (e) => {
            if (e.target !== ribbonClose && !ribbonClose.contains(e.target)) {
                showPromoModal();
            }
        });

        ribbonClose.addEventListener('click', (e) => {
            e.stopPropagation();
            hidePromoRibbon();
        });

        copyCodeBtn.addEventListener('click', copyPromoCode);

        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
        });
    }

    // ===========================================
    // Initialize
    // ===========================================

    function init() {
        handleNavbarScroll();
        initEventListeners();
        initLazyLoading();
        initScrollAnimations();
        initPromoPopup();

        // New features
        initParallax();
        init3DBook();
        initCountdown();
        initQuoteCarousel();
        initShareButtons();
        initCharacterCards();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
