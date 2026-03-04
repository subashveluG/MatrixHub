document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header Scroll Effect
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Set active nav link based on current path
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Simple matching logic. Might need adjustment if you serve from a subfolder.
        if (href === currentPath || (currentPath === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else if (currentPath.includes(href) && href !== 'index.html') {
            link.classList.add('active');
        } else {
            // Also check for exact match ignoring trailing slash
            link.classList.remove('active');
        }
    });

    // Search Overlay Logic
    const searchTrigger = document.getElementById('search-trigger');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.querySelector('.search-input');

    const toggleSearch = (show) => {
        if (!searchOverlay || !searchInput) return;
        if (show) {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInput.focus(), 100);
        } else {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (searchTrigger && searchOverlay) {
        searchTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSearch(true);
        });

        if (searchClose) {
            searchClose.addEventListener('click', () => toggleSearch(false));
        }

        // Close on ESC key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                toggleSearch(false);
            }
        });

        // Close on background click
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                toggleSearch(false);
            }
        });
    }

    // Mobile Menu Logic
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.id = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';

    const navActions = document.querySelector('.nav-actions');
    const navLinksContainer = document.querySelector('.nav-links');

    if (navActions && navLinksContainer) {
        navActions.appendChild(menuToggle);

        const toggleMenu = () => {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        };

        menuToggle.addEventListener('click', toggleMenu);

        // Close menu on link click (important for SPAs or if staying on same page)
        const allNavLinks = navLinksContainer.querySelectorAll('.nav-link');
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close on background click (click outside)
        document.addEventListener('click', (e) => {
            if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target) && navLinksContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
});
