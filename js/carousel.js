/* ============================================================
   CAROUSEL — Affiliations Infinite Step Carousel
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('marqueeTrack');
    const outer = document.getElementById('marqueeContainer');
    
    if (!track || !outer) return;

    const originals = Array.from(track.querySelectorAll('.org-card'));
    const N = originals.length;
    if (N === 0) return;

    // Clone cards and prepend them (for seamless left side)
    const prependClones = originals.map(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        return clone;
    });
    // Insert prepended clones before the first child
    prependClones.reverse().forEach(clone => {
        track.insertBefore(clone, track.firstChild);
    });

    // Clone cards and append them (for seamless right side)
    originals.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    // Now track has: [clones] [originals] [clones]
    // Total = 3 * N cards
    const all = Array.from(track.querySelectorAll('.org-card'));

    // Start in the middle set (the originals), at the center card
    let idx = N + Math.floor(N / 2);
    let paused = false;
    let jumping = false;

    function centerOn(i, instant) {
        // Mark active and queue classes based on distance
        all.forEach((c, j) => {
            const dist = Math.abs(j - i);
            c.classList.remove('org-active', 'org-queue-1', 'org-queue-2', 'org-queue-3', 'org-hidden');
            if (dist === 0) {
                c.classList.add('org-active');
            } else if (dist === 1) {
                c.classList.add('org-queue-1');
            } else if (dist === 2) {
                c.classList.add('org-queue-2');
            } else if (dist === 3) {
                c.classList.add('org-queue-3');
            } else {
                c.classList.add('org-hidden');
            }
        });

        const doSlide = () => {
            const card = all[i];
            if (!card) return;
            const tx = outer.offsetWidth / 2
                     - card.offsetLeft
                     - card.offsetWidth / 2;
            track.style.transform = `translateX(${tx}px)`;
        };

        if (instant) {
            track.style.transition = 'none';
            void track.offsetWidth;
            doSlide();
            requestAnimationFrame(() => requestAnimationFrame(() => {
                track.style.transition = '';
            }));
        } else {
            requestAnimationFrame(doSlide);
        }
    }

    function step() {
        if (paused || jumping) return;

        idx++;
        centerOn(idx, false);

        // When we reach the end of the append-clones set,
        // silently jump back to the same position in the originals set
        if (idx >= N * 2) {
            jumping = true;
            setTimeout(() => {
                idx = idx - N;
                centerOn(idx, true);
                jumping = false;
            }, 420);
        }
    }

    // Boot centered immediately
    setTimeout(() => centerOn(idx, true), 40);

    // Step every 3 seconds
    setInterval(step, 3000);

    // Pause while hovering
    outer.addEventListener('mouseenter', () => { paused = true;  });
    outer.addEventListener('mouseleave', () => { paused = false; });
});
