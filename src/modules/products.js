/**
 * products.js (module) — Product Rendering & Filtering Logic
 *
 * STUDY CONCEPT: "Dynamic DOM Manipulation"
 *
 * The DOM (Document Object Model) is the browser's internal
 * representation of your HTML page as a tree of objects.
 * JavaScript can read, create, update and delete DOM elements.
 *
 * Here we use `innerHTML` with JavaScript "template literals"
 * (the backtick ` strings) to dynamically inject HTML into the page.
 * This is how modern web apps work — rendering UI from data.
 */

import { products, categories } from '../data/products.js';

// ---- State ----
let activeCategory = 'all';
let searchQuery = '';

// ---- Star Rating Helper ----
function renderStars(rating) {
  // Create 5 star icons; full stars are solid gold, empty ones are outlined
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<i class="fa-solid fa-star"></i>';
    } else if (i - rating < 1) {
      stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    } else {
      stars += '<i class="fa-regular fa-star"></i>';
    }
  }
  return stars;
}

// ---- Render Category Cards ----
export function renderCategories() {
  const categoriesGrid = document.getElementById('categoriesGrid');
  if (!categoriesGrid) return;

  categoriesGrid.innerHTML = categories.map(cat => {
    // We add the 'active' CSS class conditionally using a ternary operator
    const isActive = cat.id === activeCategory ? 'active' : '';
    return `
      <div
        class="category-card ${isActive}"
        data-category="${cat.id}"
        role="button"
        aria-pressed="${isActive ? 'true' : 'false'}"
        tabindex="0"
      >
        <span class="category-icon">${cat.icon}</span>
        <span class="category-name">${cat.name}</span>
      </div>
    `;
  }).join('');
  // STUDY NOTE: .map() creates a NEW array of HTML strings.
  // .join('') stitches them all into one big HTML string with no separator.

  // Attach click listeners to each card after they're rendered
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      activeCategory = card.dataset.category; // read the data-category attribute
      renderCategories();
      renderProducts();
    });
    // Also support keyboard navigation (Enter/Space key)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') card.click();
    });
  });
}

// ---- Render Product Cards ----
export function renderProducts() {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;

  // STEP 1: Filter by category
  let filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  // STEP 2: Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  // STEP 3: Handle empty state
  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>No products found.<br/>Try a different category or search term.</p>
      </div>
    `;
    return;
  }

  // STEP 4: Render the filtered product cards
  productsGrid.innerHTML = filtered.map((product, index) => `
    <article
      class="product-card animate-fadeUp"
      style="animation-delay: ${index * 0.07}s"
      data-id="${product.id}"
    >
      <div class="product-image-wrap">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-img"
          loading="lazy"
        />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <button class="product-wishlist" aria-label="Add to wishlist">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <span class="product-category-tag">${getCategoryName(product.category)}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-rating">
          <div class="stars">${renderStars(product.rating)}</div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-label">LKR</span>
            <span class="price-value">${product.price.toLocaleString()}</span>
          </div>
          <button
            class="add-to-cart-btn"
            data-product-id="${product.id}"
            aria-label="Add ${product.name} to cart"
          >
            <i class="fa-solid fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// ---- Update Search Query ----
export function setSearchQuery(query) {
  searchQuery = query;
  renderProducts();
}

// ---- Helper: Get Category Name from ID ----
function getCategoryName(categoryId) {
  const cat = categories.find(c => c.id === categoryId);
  return cat ? cat.name : categoryId;
}

// ---- Export products list for cart lookups ----
export { products };
