/**
 * ui.js — UI Helpers & Cart Sidebar Rendering
 *
 * STUDY CONCEPT: "Separation of Concerns"
 *
 * This file handles all UI-related updates that are NOT
 * directly related to product data or cart logic.
 * Keeping these in separate files makes code easier to:
 * - Read & understand
 * - Debug when something goes wrong
 * - Update without breaking other features
 */

import {
  getCart,
  getCartCount,
  getCartTotal,
  updateQuantity,
  removeFromCart,
} from './cart.js';

// ---- DOM References (resolved lazily inside functions for safety) ----
function getCartSidebar()  { return document.getElementById('cartSidebar'); }
function getCartOverlay()  { return document.getElementById('cartOverlay'); }
function getCartBadge()    { return document.getElementById('cartBadge'); }
function getCartTotalEl()  { return document.getElementById('cartTotal'); }
function getCartItemsEl()  { return document.getElementById('cartItems'); }
function getNavbar()       { return document.getElementById('navbar'); }

// ---- Cart Sidebar Toggle ----
export function openCart() {
  const cartSidebar = getCartSidebar();
  const cartOverlay = getCartOverlay();
  if (!cartSidebar || !cartOverlay) return;
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

export function closeCart() {
  const cartSidebar = getCartSidebar();
  const cartOverlay = getCartOverlay();
  if (!cartSidebar || !cartOverlay) return;
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

export function toggleCart() {
  const cartSidebar = getCartSidebar();
  if (!cartSidebar) return;
  if (cartSidebar.classList.contains('open')) {
    closeCart();
  } else {
    openCart();
    renderCartUI(); // refresh cart UI every time we open it
  }
}

// ---- Render Cart Items in Sidebar ----
export function renderCartUI() {
  const cartBadge   = getCartBadge();
  const cartTotalEl = getCartTotalEl();
  const cartItemsEl = getCartItemsEl();
  if (!cartBadge || !cartTotalEl || !cartItemsEl) return;

  const items = getCart();

  // Update badge
  const count = getCartCount();
  cartBadge.textContent = count;

  // Update total — fix: use toLocaleString with fractionDigits instead of hardcoded '.00'
  const total = getCartTotal();
  cartTotalEl.textContent = `LKR ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Render items or empty state
  if (items.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your cart is empty.<br/>Add some Sri Lankan goodness!</p>
      </div>
    `;
    return;
  }

  cartItemsEl.innerHTML = items.map(item =>
    `<div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-details">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">LKR ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remove ${item.name}">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>`
  ).join('');

  // Attach event listeners to qty buttons and remove buttons
  cartItemsEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const delta = btn.dataset.action === 'increase' ? 1 : -1;
      updateQuantity(id, delta);
      renderCartUI(); // re-render after state change
    });
  });

  cartItemsEl.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      removeFromCart(id);
      renderCartUI();
    });
  });
}

// ---- Navbar Scroll Effect ----
export function initNavbarScroll() {
  const navbar = getNavbar();
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ---- Smooth scroll for nav links ----
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- Active nav link on scroll ----
export function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
}

// ---- Show a toast notification ----
export function showToast(message) {
  // Remove existing toast if any
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;

  // Inline toast styles (no CSS class needed — self-contained)
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: '#22c55e',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '999px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    zIndex: '9999',
    opacity: '0',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
  });

  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  // Auto-dismiss after 2.5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 350);
  }, 2500);
}

// ---- Show an error toast notification (Bug 2 fix: moved here from main.js) ----
export function showToastError(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: '#ef4444',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '999px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    zIndex: '9999',
    opacity: '0',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)',
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 350);
  }, 2500);
}
