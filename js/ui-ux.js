/**
 * UI/UX Enhancements for the Application
 * Handles navbar behavior on mobile devices.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Navbar behavior logic
    const navbarNav = document.getElementById('navbarNav');
    const navLinks = navbarNav.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // 1. Close navbar when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if navbar is expanded (visible on mobile)
            if (navbarNav.classList.contains('show')) {
                // Use Bootstrap's collapse instance to hide it
                // We use the toggler button to find the instance or directly the element
                const bsCollapse = bootstrap.Collapse.getInstance(navbarNav);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    // 2. Close navbar when clicking outside of it
    document.addEventListener('click', (event) => {
        const isClickInsideNavbar = navbarNav.contains(event.target) || navbarToggler.contains(event.target);

        // If click is outside and navbar is open
        if (!isClickInsideNavbar && navbarNav.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarNav);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });
});
