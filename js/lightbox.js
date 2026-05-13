/* ============================================================
   LIGHTBOX — Fullscreen Gallery for Project Images
   ============================================================ */

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');

  if (!lightbox || !lightboxImg) return;

  let currentImages = [];
  let currentIndex = 0;

  // Add click listeners to all project faders
  const faders = document.querySelectorAll('.project-fader');
  faders.forEach(fader => {
    fader.addEventListener('click', (e) => {
      // Find all images within this specific fader
      const imgs = Array.from(fader.querySelectorAll('.fader-img'));
      if (imgs.length === 0) return;

      // Extract their source URLs
      currentImages = imgs.map(img => img.src);
      
      // Determine which image was clicked, if possible
      const clickedSrc = e.target.src;
      currentIndex = currentImages.indexOf(clickedSrc);
      if (currentIndex === -1) currentIndex = 0; // fallback to first image

      openLightbox();
    });
  });

  function openLightbox() {
    updateImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateImage() {
    if (currentImages.length === 0) return;
    lightboxImg.src = currentImages[currentIndex];
    
    // Hide nav buttons if there's only 1 image
    const showNav = currentImages.length > 1;
    btnPrev.style.display = showNav ? 'flex' : 'none';
    btnNext.style.display = showNav ? 'flex' : 'none';
  }

  function nextImage(e) {
    if (e) e.stopPropagation();
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateImage();
  }

  function prevImage(e) {
    if (e) e.stopPropagation();
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateImage();
  }

  // Event Listeners
  btnClose.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', nextImage);
  btnPrev.addEventListener('click', prevImage);

  // Close when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLightbox);
} else {
  initLightbox();
}
