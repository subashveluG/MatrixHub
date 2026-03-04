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
});
