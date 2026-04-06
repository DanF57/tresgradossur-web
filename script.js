/**
 * Tres Grados Sur — Interactivity
 * Mobile-first, progressive enhancement
 */

document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------------------------------
       1. NAVBAR — scroll detection + mobile menu
    ----------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Scroll shadow
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('is-open');
        hamburger.classList.toggle('is-open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('is-open');
            hamburger.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('is-open') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('is-open');
            hamburger.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });


    /* -----------------------------------------------------------------------
       2. SCROLL REVEAL — IntersectionObserver
    ----------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings in same parent
                const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 80}ms`;
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* -----------------------------------------------------------------------
       3. BEER FILTER
    ----------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const beerCards = document.querySelectorAll('.gallery-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Toggle active
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide cards with micro-animation
            beerCards.forEach((card, i) => {
                const category = card.dataset.category;
                const show = filter === 'all' || category === filter;

                if (show) {
                    card.classList.remove('hidden');
                    card.style.animationDelay = `${i * 60}ms`;
                    // Re-trigger reveal
                    card.classList.remove('is-visible');
                    void card.offsetWidth; // reflow
                    card.classList.add('is-visible');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    /* -----------------------------------------------------------------------
       4. FAB PULSE — subtle attention animation after delay
    ----------------------------------------------------------------------- */
    const fab = document.querySelector('.wa-fab');
    if (fab) {
        setTimeout(() => {
            fab.style.animation = 'fab-pulse 2s ease-in-out 3';
        }, 4000);
    }

    // Inject pulse keyframes
    const fabStyle = document.createElement('style');
    fabStyle.textContent = `
        @keyframes fab-pulse {
            0%, 100% { box-shadow: 0 8px 24px rgba(37,211,102,0.35), 0 2px 8px rgba(0,0,0,0.3); transform: scale(1); }
            50% { box-shadow: 0 12px 40px rgba(37,211,102,0.6), 0 4px 16px rgba(0,0,0,0.35); transform: scale(1.08); }
        }
    `;
    document.head.appendChild(fabStyle);

});