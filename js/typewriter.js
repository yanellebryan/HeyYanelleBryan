/* ============================================================
   TYPEWRITER — Hero Section Text Animation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const roles = [
        'CS Student & Developer',
        'Flutter Mobile Developer',
        'Computer Vision Engineer',
        'Full Stack Developer',
        'Problem Solver',
    ];
    let roleIndex = 0;
    let charIndex  = 0;
    let deleting   = false;
    const typeEl   = document.getElementById('typewriter');

    if (!typeEl) return;

    function type() {
        const current = roles[roleIndex];
        if (!deleting) {
            typeEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            typeEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(type, deleting ? 48 : 80);
    }

    setTimeout(type, 600);
});
