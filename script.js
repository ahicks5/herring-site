/* =========================================================
   Chrislyn R. Herring — Author Site (multi-page)
   Shared vanilla JS. Each handler is guarded so the file is
   safe to include on every page.
   ========================================================= */
(function () {
    'use strict';

    document.documentElement.classList.add('js');

    var LAUNCH = new Date('2026-06-30T00:00:00').getTime();

    /* ---------- Nav: scroll shadow + mobile menu ---------- */
    var nav = document.getElementById('nav');
    if (nav) {
        var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 20); };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            var open = menu.classList.toggle('open');
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
        });
        menu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                toggle.classList.remove('open');
                menu.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Countdown (only where present) ---------- */
    var elDays = document.getElementById('cdDays');
    if (elDays) {
        var elHours = document.getElementById('cdHours');
        var elMins = document.getElementById('cdMins');
        var elSecs = document.getElementById('cdSecs');
        var pad = function (n) { return String(n).padStart(2, '0'); };
        var tick = function () {
            var diff = LAUNCH - Date.now();
            if (diff < 0) diff = 0;
            elDays.textContent = pad(Math.floor(diff / 86400000));
            elHours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
            elMins.textContent = pad(Math.floor((diff % 3600000) / 60000));
            elSecs.textContent = pad(Math.floor((diff % 60000) / 1000));
        };
        tick();
        setInterval(tick, 1000);
    }

    /* ---------- Reveal on scroll ---------- */
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- Newsletter / signup forms (placeholder submit) ---------- */
    document.querySelectorAll('form.signup').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            if (!btn) return;
            var label = btn.textContent;
            btn.textContent = 'Subscribed ✓';
            btn.disabled = true;
            setTimeout(function () {
                btn.textContent = label;
                btn.disabled = false;
                form.reset();
            }, 2400);
        });
    });

})();
