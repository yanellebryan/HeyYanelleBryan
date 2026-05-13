/* ============================================================
   NAVBAR — Scroll Effect & Mobile Menu Toggle
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('nav-mobile');

    // ── Navbar scroll effect ──
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        }
    }, { passive: true });

    // ── Mobile menu toggle ──
    if (hamburger && navMobile) {
        hamburger.addEventListener('click', () => {
            const open = navMobile.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', open);
            const spans = hamburger.querySelectorAll('span');
            
            if (open) {
                spans[0].style.transform = 'translateY(7px) rotate(45deg)';
                spans[1].style.opacity  = '0';
                spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
            } else {
                spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                navMobile.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.querySelectorAll('span').forEach(s => { 
                    s.style.transform = ''; 
                    s.style.opacity = ''; 
                });
            });
        });
    }
});
