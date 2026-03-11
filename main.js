document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Ensure Noise Overlay exists
    if (!document.querySelector('.noise-overlay')) {
        const noise = document.createElement('div');
        noise.className = 'noise-overlay';
        document.body.prepend(noise);
    }

    // Header Blur Effect on Scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Active Link Logic
    const currentPath = window.location.pathname.split('/').pop() || 'home1.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile Menu
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Search Overlay
    const searchTrigger = document.getElementById('search-trigger');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.querySelector('.search-input');

    if (searchTrigger && searchOverlay) {
        searchTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (searchInput) setTimeout(() => searchInput.focus(), 300);
        });

        const closeSearch = () => {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (searchClose) searchClose.addEventListener('click', closeSearch);
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) closeSearch();
        });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSearch();
        });
    }

    // 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card, .app-card, .glass-card:not(.no-tilt)');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });

    // Magnetic Elements
    const magneticElements = document.querySelectorAll('.btn, .logo, .footer-social-link');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0, 0)`;
        });
    });

    // Parallax Grid
    const cyberGrid = document.querySelector('.cyber-grid');
    if (cyberGrid) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            cyberGrid.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Text Split Animation
    const splitTexts = document.querySelectorAll('.split-text');
    splitTexts.forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.className = 'char';
            span.style.animationDelay = `${i * 0.05}s`;
            el.appendChild(span);
        });
    });
    // Back to Top Logic
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Download Modal Logic
    const initDownloadModal = () => {
        // Create modal structure if not exists
        if (!document.getElementById('download-modal-overlay')) {
            const modalHTML = `
                <div id="download-modal-overlay" class="download-modal-overlay">
                    <div class="download-modal glass">
                        <button class="modal-close-btn" id="modal-close"><i class="ph ph-x"></i></button>
                        <img src="" alt="App Icon" class="download-app-icon" id="modal-app-icon">
                        <h2 id="modal-app-title">App Name</h2>
                        <p id="modal-app-desc">Ready to experience something extraordinary? Your download is just a click away.</p>
                        <div class="download-modal-actions">
                            <button class="btn btn-primary" id="confirm-download">Download Now</button>
                            <button class="btn btn-secondary" id="cancel-download">Maybe Later</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        const overlay = document.getElementById('download-modal-overlay');
        const closeBtn = document.getElementById('modal-close');
        const cancelBtn = document.getElementById('cancel-download');
        const confirmBtn = document.getElementById('confirm-download');
        const modalIcon = document.getElementById('modal-app-icon');
        const modalTitle = document.getElementById('modal-app-title');

        const closeModal = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        const setupDownloadButtons = () => {
            const getButtons = document.querySelectorAll('.get-btn');
            getButtons.forEach(btn => {
                // Skip navigation and hero buttons
                if (btn.closest('.nav-actions') || btn.closest('.hero-actions')) return;

                btn.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Try to find app details from parent card
                    const card = btn.closest('.glass-card, .app-card');
                    if (card) {
                        const icon = card.querySelector('.app-icon, img');
                        const title = card.querySelector('h3, h4');

                        if (icon) modalIcon.src = icon.src;
                        if (title) modalTitle.innerText = title.innerText;
                    } else {
                        // Fallback
                        modalTitle.innerText = "Premium Experience";
                        modalIcon.src = "logo.png";
                    }

                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                const originalText = confirmBtn.innerText;
                confirmBtn.innerText = "Starting Download...";
                confirmBtn.style.opacity = "0.7";
                confirmBtn.disabled = true;

                setTimeout(() => {
                    confirmBtn.innerText = "Download Complete!";
                    confirmBtn.style.background = "#10b981";
                    setTimeout(() => {
                        closeModal();
                        // Reset for next time
                        confirmBtn.innerText = originalText;
                        confirmBtn.style.background = "";
                        confirmBtn.style.opacity = "";
                        confirmBtn.disabled = false;
                    }, 1500);
                }, 2000);
            });
        }

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        // Initial setup
        setupDownloadButtons();
    };

    initDownloadModal();
});

