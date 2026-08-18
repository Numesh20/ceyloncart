/**
 * main.js — Application Entry Point
 *
 * STUDY CONCEPT: "Entry Point & Module Wiring"
 *
 * In a Vite project, this file is the STARTING POINT of your JavaScript.
 * Vite reads this file first and follows all the `import` statements
 * to bundle everything together.
 *
 * Think of this file as the "conductor" of an orchestra —
 * it doesn't play any instruments itself, it just tells
 * all the other modules WHEN to start and HOW to work together.
 *
 * Flow:
 *  1. Import everything needed
 *  2. Initialize the UI (navbar, scroll effects, etc.)
 *  3. Render the initial categories and products
 *  4. Set up all event listeners (cart, search, etc.)
 */

import './style.css';

// Import modules (functions from other files)
import { renderCategories, renderProducts, setSearchQuery, products } from './modules/products.js';
import { addToCart, getCartCount } from './modules/cart.js';
import {
  toggleCart,
  closeCart,
  renderCartUI,
  initNavbarScroll,
  initSmoothScroll,
  initActiveNavHighlight,
  showToast,
  showToastError,
} from './modules/ui.js';

// ---- App Initialization ----
// This runs when the HTML page has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // 1. Setup UI effects
  initNavbarScroll();
  initSmoothScroll();
  initActiveNavHighlight();

  // 2. Render initial content
  renderCategories();
  renderProducts();

  // 3. Initialize cart badge from saved localStorage state
  const countEl = document.getElementById('cartBadge');
  if (countEl) countEl.textContent = getCartCount();

  // 4. Setup event listeners
  setupCartListeners();
  setupSearchListener();
  setupAddToCartListeners();
  setupNewsletterListener();
  setupShopNowBtn();
  setupMobileMenu(); // Bug 7 fix: wire up mobile hamburger menu
}

// ---- Cart Event Listeners ----
function setupCartListeners() {
  const cartBtn    = document.getElementById('cartBtn');
  const cartClose  = document.getElementById('cartClose');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartBtn)    cartBtn.addEventListener('click', toggleCart);
  if (cartClose)  cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Checkout button (for now, just shows a success message)
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      showToast('🎉 Thank you! Your order has been placed.');
      closeCart();
    });
  }
}

// ---- Search Listener ----
function setupSearchListener() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  // 'input' event fires on EVERY keystroke (real-time search!)
  searchInput.addEventListener('input', (e) => {
    setSearchQuery(e.target.value);
  });
}

// ---- Add-to-Cart Delegation ----
// STUDY CONCEPT: "Event Delegation"
// Instead of attaching click listeners to every single product button,
// we attach ONE listener to the parent container (#productsGrid).
// When any button inside is clicked, the event "bubbles up" to the parent.
// We then check if the clicked element IS an add-to-cart button.
// This is much more efficient for dynamically rendered content!
function setupAddToCartListeners() {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;

  productsGrid.addEventListener('click', (e) => {
    // Find the closest .add-to-cart-btn ancestor of the clicked element
    const btn = e.target.closest('.add-to-cart-btn');
    if (!btn) return;

    const productId = parseInt(btn.dataset.productId);
    const product = products.find(p => p.id === productId);

    if (product) {
      addToCart(product);
      renderCartUI(); // update cart count badge and sidebar

      // Visual feedback on button
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
      btn.style.background = 'var(--success)';
      btn.style.color = 'white';
      btn.style.borderColor = 'var(--success)';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 1500);

      // Show toast notification
      showToast(`${product.name} added to cart!`);
    }
  });
}

// ---- Newsletter Listener ----
function setupNewsletterListener() {
  const newsletterBtn   = document.getElementById('newsletterBtn');
  const newsletterInput = document.getElementById('newsletterInput');

  if (!newsletterBtn || !newsletterInput) return;

  newsletterBtn.addEventListener('click', () => {
    const email = newsletterInput.value.trim();
    // Simple email validation using a Regular Expression (regex)
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
      showToastError('Please enter a valid email address.');
      return;
    }

    showToast(`✅ Subscribed! Welcome to CeylonCart, ${email}`);
    newsletterInput.value = '';
  });
}

// ---- Shop Now Button ----
function setupShopNowBtn() {
  const shopNowBtn = document.getElementById('shopNowBtn');
  if (shopNowBtn) {
    shopNowBtn.addEventListener('click', () => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// ---- Mobile Menu Toggle (Bug 7 fix) ----
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks      = document.getElementById('navLinks');
  if (!mobileMenuBtn || !navLinks) return;

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    // Swap icon between bars (closed) and X (open)
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
    mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// NOTE: showToastError has been moved to ui.js and is now imported from there.
// This keeps all toast/UI helpers in a single place (Bug 2 fix).
