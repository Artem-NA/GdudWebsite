document.addEventListener('DOMContentLoaded', function() {
    // Get necessary elements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const body = document.body;
    let isAnimating = false;

    // Toggle menu function with animation lock
    function toggleMenu(shouldOpen) {
        if (isAnimating) return;

        isAnimating = true;
        
        if (shouldOpen) {
            navbarCollapse.classList.add('show');
            navbarToggler.classList.add('active');
            navbarToggler.setAttribute('aria-expanded', 'true');
            body.style.overflow = 'hidden';
        } else {
            navbarCollapse.classList.remove('show');
            navbarToggler.classList.remove('active');
            navbarToggler.setAttribute('aria-expanded', 'false');
            body.style.overflow = 'auto';
        }

        // Reset animation flag after transition completes
        setTimeout(() => {
            isAnimating = false;
        }, 350); // Match this with your CSS transition duration
    }

    // Toggle menu on burger click
    navbarToggler.addEventListener('click', function(e) {
        e.preventDefault();
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        toggleMenu(!isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navbarCollapse.contains(event.target) || 
                            navbarToggler.contains(event.target);
        
        if (!isClickInside && navbarCollapse.classList.contains('show')) {
            toggleMenu(false);
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                toggleMenu(false);
            }
        });
    });

    // Handle resize events with debounce
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 992 && navbarCollapse.classList.contains('show')) {
                toggleMenu(false);
            }
        }, 250);
    });

    // Set initial ARIA states
    navbarToggler.setAttribute('aria-expanded', 'false');
    navbarToggler.setAttribute('aria-label', 'Toggle navigation');
});