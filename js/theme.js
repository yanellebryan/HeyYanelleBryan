/* ============================================================
   THEME — Light / Dark mode toggle
   Portfolio: Yanelle Bryan A.
   ============================================================ */

(function () {
  const STORAGE_KEY = 'yba-theme';
  const html = document.documentElement;

  /**
   * Apply a theme by setting the data-theme attribute on <html>.
   * Light mode is the default — set on first visit unless user has changed it.
   */
  function applyTheme(theme, animate) {
    if (animate) {
      /* Briefly add transitioning class so all elements cross-fade */
      html.classList.add('theme-transitioning');
      setTimeout(() => html.classList.remove('theme-transitioning'), 420);
    }

    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
    }
  }

  /**
   * Toggle between dark and light, persist to localStorage.
   */
  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next, true);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
  }

  /* ── Apply saved preference or default to light on first visit ── */
  (function init() {
    let saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) {}

    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved, false);
    } else {
      /* Default to light mode on first visit */
      applyTheme('light', false);
    }
  })();

  /* ── Wire up button after DOM is ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', toggleTheme);
  });
})();
