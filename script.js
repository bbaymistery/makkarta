/* ============================================================
   MAKKARTA – JavaScript (Pagination + Mobile Nav)
   ============================================================ */

let currentPage = 0;
const totalPages = 7;

const pageLabels = [
  'Ana Səhifə',
  'Personita',
  'Qrup Terapiyası',
  'Qamçı və Kökə',
  'Travma Planı I',
  'Travma Planı II',
  'Məşq Texnikaları',
  'Əlavə Texnikalar'
];

// ── Pagination numbers ─────────────────────────
function buildPagNumbers() {
  const container = document.getElementById('pagNumbers');
  if (!container) return;
  container.innerHTML = '';
  // Loop from 1 to totalPages instead of 0 for bottom pagination
  // Bottom pagination usually makes sense for notes (1-6). Wait, let's include 0 as 'Home' icon.
  for (let i = 0; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'pag-num' + (i === currentPage ? ' active' : '');
    btn.textContent = i === 0 ? '🏠' : i;
    btn.setAttribute('aria-label', pageLabels[i]);
    btn.addEventListener('click', () => goToPage(i));
    container.appendChild(btn);
  }
}

// ── Go to a page ───────────────────────────────
function goToPage(n) {
  if (n < 0 || n > totalPages) return;

  // Hide current page
  document.querySelector(`.page[data-page="${currentPage}"]`)?.classList.remove('active');
  document.querySelector(`.nav-link[data-page="${currentPage}"]`)?.classList.remove('active');
  document.querySelector(`#mobileNav .nav-link[data-page="${currentPage}"]`)?.classList.remove('active');

  currentPage = n;

  // Show new page
  const newPage = document.querySelector(`.page[data-page="${currentPage}"]`);
  if (newPage) {
    newPage.classList.add('active');
    // Re-trigger animation
    newPage.style.animation = 'none';
    newPage.offsetHeight; // reflow
    newPage.style.animation = '';
  }

  // Update nav links
  document.querySelector(`.nav-link[data-page="${currentPage}"]`)?.classList.add('active');
  document.querySelector(`#mobileNav .nav-link[data-page="${currentPage}"]`)?.classList.add('active');

  // Update prev/next buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.disabled = currentPage === 0;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;

  // Rebuild page numbers
  buildPagNumbers();

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile nav if open
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav.classList.contains('open')) {
    mobileNav.classList.remove('open');
  }
}

// ── Change page (prev/next) ────────────────────
function changePage(delta) {
  goToPage(currentPage + delta);
}

// ── Nav link clicks ────────────────────────────
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = parseInt(link.getAttribute('data-page'));
    if (!isNaN(page)) goToPage(page);
  });
});

// ── Hamburger toggle ───────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger?.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// ── Init ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildPagNumbers();
  const prevBtn = document.getElementById('prevBtn');
  if (prevBtn) prevBtn.disabled = true;
});
