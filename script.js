/* ============================================================
   RP BOOKS — Main Script
   ============================================================ */

// ---------- Colour palettes for auto-generated covers ----------
const COVER_PALETTES = [
  ['#6C3CE1','#8B5CF6'],['#E11D48','#FB7185'],['#0891B2','#22D3EE'],
  ['#059669','#34D399'],['#D97706','#FBBF24'],['#7C3AED','#A78BFA'],
  ['#DC2626','#F87171'],['#2563EB','#60A5FA'],['#0D9488','#5EEAD4'],
  ['#9333EA','#C084FC'],['#B45309','#FCD34D'],['#4F46E5','#818CF8'],
  ['#BE123C','#FDA4AF'],['#15803D','#86EFAC'],['#1D4ED8','#93C5FD'],
];

function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function getPalette(title) {
  return COVER_PALETTES[hashCode(title) % COVER_PALETTES.length];
}

// ---------- Build a single book card ----------
function createBookCard(book) {
  const [c1, c2] = getPalette(book.title);
  const cat = book.category || '';
  const author = book.author || '';
  const price = book.price || '';
  const avail = book.availability || '';
  const note = book.note || '';
  const link = book.link || '';
  const cover = book.cover || '';
  const isAvailable = avail.toLowerCase().includes('available') && !avail.toLowerCase().includes('out');

  // WhatsApp message
  const waMsg = encodeURIComponent(`Hello RP BOOKS, I want to order/enquire about the book: ${book.title}.`);
  const waLink = `https://wa.me/919734529874?text=${waMsg}`;

  // Cover: use uploaded image if present, else auto-generate
  let coverHTML;
  if (cover) {
    coverHTML = `
      <div class="book-cover" style="background:linear-gradient(135deg,${c1}22,${c2}22)">
        ${cat ? `<span class="cover-cat-badge">${cat}</span>` : ''}
        <img class="cover-image" src="${cover}" alt="${book.title} cover" loading="lazy">
      </div>`;
  } else {
    coverHTML = `
      <div class="book-cover" style="background:linear-gradient(135deg,${c1}22,${c2}22)">
        ${cat ? `<span class="cover-cat-badge">${cat}</span>` : ''}
        <div class="cover-inner" style="background:linear-gradient(160deg,${c1},${c2})">
          <span class="cover-title">${book.title}</span>
          ${author ? `<span class="cover-author">${author}</span>` : ''}
        </div>
      </div>`;
  }

  return `
  <div class="book-card fade-in" data-category="${cat.toLowerCase()}">
    ${coverHTML}
    <div class="book-info">
      <h3>${book.title}</h3>
      ${author ? `<p class="book-meta">by ${author}</p>` : ''}
      ${cat ? `<p class="book-meta">${cat}</p>` : ''}
      ${price ? `<p class="book-price">${price}</p>` : ''}
      ${avail ? `<p class="book-availability ${isAvailable ? 'available' : 'unavailable'}">${avail}</p>` : ''}
      ${note ? `<p class="book-note">${note}</p>` : ''}
      <div class="book-actions">
        <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
          📱 Order Now
        </a>
        ${link ? `<a href="${link}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">🔗 Details</a>` : ''}
      </div>
    </div>
  </div>`;
}

// ---------- Render catalogue ----------
let currentCategory = 'all';
let currentSearch = '';

function renderBooks() {
  const grid = document.getElementById('bookGrid');
  if (!grid) return;

  let filtered = booksData.filter(b => {
    const matchCat = currentCategory === 'all' || (b.category || '').toLowerCase() === currentCategory;
    const matchSearch = !currentSearch || b.title.toLowerCase().includes(currentSearch) ||
      (b.author || '').toLowerCase().includes(currentSearch) ||
      (b.category || '').toLowerCase().includes(currentSearch);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results"><span>📚</span>No books found. Try a different search or category.</div>`;
  } else {
    grid.innerHTML = filtered.map(createBookCard).join('');
  }

  // Trigger fade-in animations
  requestAnimationFrame(() => {
    grid.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  });
}

// ---------- Build category filter buttons ----------
function buildCategoryFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;
  const cats = [...new Set(booksData.map(b => b.category).filter(Boolean))];
  let html = `<button class="cat-btn active" data-cat="all">All</button>`;
  cats.forEach(c => { html += `<button class="cat-btn" data-cat="${c.toLowerCase()}">${c}</button>`; });
  container.innerHTML = html;

  container.addEventListener('click', e => {
    if (!e.target.classList.contains('cat-btn')) return;
    container.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentCategory = e.target.dataset.cat;
    renderBooks();
  });
}

// ---------- Search ----------
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', e => {
    currentSearch = e.target.value.trim().toLowerCase();
    renderBooks();
  });
}

// ---------- Mobile nav ----------
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---------- Scroll-to-top button ----------
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---------- Intersection Observer for fade-in ----------
function initFadeObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ---------- Active nav highlight on scroll ----------
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });
}

// ---------- Floating book icons in hero ----------
function initFloatingBooks() {
  const container = document.querySelector('.floating-books');
  if (!container) return;
  const icons = ['📖','📚','📕','📗','📘','📙','📓','📔'];
  for (let i = 0; i < 14; i++) {
    const span = document.createElement('span');
    span.className = 'book-icon';
    span.textContent = icons[i % icons.length];
    span.style.left = Math.random() * 100 + '%';
    span.style.top = Math.random() * 100 + '%';
    span.style.animationDelay = (Math.random() * 10) + 's';
    span.style.animationDuration = (14 + Math.random() * 10) + 's';
    container.appendChild(span);
  }
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  buildCategoryFilters();
  initSearch();
  renderBooks();
  initNav();
  initScrollTop();
  initFadeObserver();
  initActiveNav();
  initFloatingBooks();
});
