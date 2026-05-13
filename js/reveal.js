/* ============================================================
   REVEAL — Scroll Reveal & Skill Bar Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ── Scroll reveal ──
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Force hero reveals immediately
    document.querySelectorAll('#hero .reveal').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 100);
    });

    // ── Skill bar animations ──
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-bar-fill');
                fills.forEach(fill => {
                    const w = fill.dataset.width;
                    setTimeout(() => {
                        fill.style.width = w + '%';
                        fill.classList.add('animated');
                    }, 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));
});
