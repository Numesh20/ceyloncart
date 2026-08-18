/**
 * modal.js — Product Detail Modal
 *
 * Opens a rich product detail panel when a user clicks a product card.
 * Features: image display, highlights list, quantity selector,
 * add-to-cart from modal, wishlist toggle, keyboard/ESC close.
 */

import { products, categories } from '../data/products.js';

// ---- State ----
let modalQty = 1;
let currentProduct = null;

// ---- Helpers ----
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating))   stars += '<i class="fa-solid fa-star"></i>';
    else if (i - rating < 1)       stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    else                           stars += '<i class="fa-regular fa-star"></i>';
  }
  return stars;
}

function getCategoryName(id) {
  const cat = categories.find(c => c.id === id);
  return cat ? cat.name : id;
}

// ---- Open Modal ----
export function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentProduct = product;
  modalQty = 1;

  // Populate fields
  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  const setHTML = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = val;
  };

  // Image
  const img = document.getElementById('modalImg');
  if (img) { img.src = product.image; img.alt = product.name; }

  // Badge
  const badge = document.getElementById('modalBadge');
  if (badge) {
    badge.textContent = product.badge || '';
    badge.style.display = product.badge ? 'block' : 'none';
  }

  // Text fields
  setEl('modalProductName', product.name);
  setEl('modalPrice', product.price.toLocaleString());
  setEl('modalDesc', product.description);
  setEl('modalCategoryTag', getCategoryName(product.category));
  setEl('modalQtyValue', '1');

  // Rating
  setHTML('modalRating', `
    <div class="modal-stars">${renderStars(product.rating)}</div>
    <span class="modal-rating-score">${product.rating}</span>
    <span class="modal-rating-count">(${product.reviews} reviews)</span>
  `);

  // Highlights
  const hl = product.highlights || [];
  setHTML('modalHighlights', hl.length
    ? `<ul class="modal-highlights-list">
        ${hl.map(h => `<li><i class="fa-solid fa-circle-check"></i>${h}</li>`).join('')}
      </ul>`
    : ''
  );

  // Reset wishlist button
  const wlBtn = document.getElementById('modalWishlist');
  if (wlBtn) {
    const inWishlist = isInWishlist(product.id);
    wlBtn.innerHTML = `<i class="${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`;
    wlBtn.classList.toggle('active', inWishlist);
  }

  // Show the modal
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// ---- Close Modal ----
export function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    currentProduct = null;
  }
}

// ---- Wishlist Helpers (localStorage) ----
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('ceyloncart_wishlist') || '[]'); }
  catch { return []; }
}

function saveWishlist(list) {
  localStorage.setItem('ceyloncart_wishlist', JSON.stringify(list));
}

function isInWishlist(id) {
  return getWishlist().includes(id);
}

function toggleWishlist(id) {
  let list = getWishlist();
  if (list.includes(id)) {
    list = list.filter(x => x !== id);
  } else {
    list.push(id);
  }
  saveWishlist(list);
  return list.includes(id);
}

// ---- Init Modal Listeners ----
export function initModal(onAddToCart) {
  const overlay  = document.getElementById('modalOverlay');
  const card     = document.getElementById('modalCard');
  const closeBtn = document.getElementById('modalClose');
  const minusBtn = document.getElementById('modalQtyMinus');
  const plusBtn  = document.getElementById('modalQtyPlus');
  const addBtn   = document.getElementById('modalAddCart');
  const wlBtn    = document.getElementById('modalWishlist');

  if (!overlay) return;

  // Close on overlay click (outside card)
  overlay.addEventListener('click', (e) => {
    if (!card?.contains(e.target)) closeModal();
  });

  // Close button
  closeBtn?.addEventListener('click', closeModal);

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Qty minus
  minusBtn?.addEventListener('click', () => {
    if (modalQty > 1) {
      modalQty--;
      const el = document.getElementById('modalQtyValue');
      if (el) el.textContent = modalQty;
    }
  });

  // Qty plus
  plusBtn?.addEventListener('click', () => {
    if (modalQty < 99) {
      modalQty++;
      const el = document.getElementById('modalQtyValue');
      if (el) el.textContent = modalQty;
    }
  });

  // Add to cart (respects qty)
  addBtn?.addEventListener('click', () => {
    if (!currentProduct) return;

    for (let i = 0; i < modalQty; i++) {
      onAddToCart(currentProduct);
    }

    // Button feedback
    addBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
    addBtn.style.background = 'var(--success)';
    setTimeout(() => {
      addBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
      addBtn.style.background = '';
    }, 1500);
  });

  // Wishlist toggle
  wlBtn?.addEventListener('click', () => {
    if (!currentProduct) return;
    const nowIn = toggleWishlist(currentProduct.id);
    wlBtn.innerHTML = `<i class="${nowIn ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`;
    wlBtn.classList.toggle('active', nowIn);

    // Also update the card on the grid if visible
    updateCardWishlistIcon(currentProduct.id, nowIn);
  });
}

// ---- Sync wishlist icon on product card ----
function updateCardWishlistIcon(productId, inWishlist) {
  const card = document.querySelector(`.product-card[data-id="${productId}"] .product-wishlist i`);
  if (card) {
    card.className = inWishlist ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    card.style.color = inWishlist ? '#ef4444' : '';
  }
}

// ---- Restore wishlist icons on page load ----
export function restoreWishlistIcons() {
  const wishlist = getWishlist();
  wishlist.forEach(id => updateCardWishlistIcon(id, true));
}
