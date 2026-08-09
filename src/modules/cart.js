/**
 * cart.js — Shopping Cart State & Logic
 *
 * STUDY CONCEPT: "State Management"
 * 
 * In any interactive app, "state" is the current data that
 * drives what the user sees. Here, our state is the `cartItems` array.
 * 
 * We keep all cart logic here in ONE place (Single Responsibility Principle).
 * Other modules just CALL our functions — they don't touch the data directly.
 * This is a key pattern in professional software development!
 * 
 * We also use "localStorage" to PERSIST the cart.
 * localStorage is like a tiny database that lives in the browser.
 * Data saved there survives page refreshes!
 */

// ---- State ----
// We try to load saved cart from localStorage first.
// If nothing is saved, we start with an empty array.
let cartItems = loadCartFromStorage();

// ---- Internal Helpers ----

/** Save the current cart to localStorage (converts JS object to JSON string) */
function saveCartToStorage() {
  // JSON.stringify() converts a JavaScript object/array into a text string
  // so it can be stored (localStorage can only store strings)
  localStorage.setItem('ceyloncart_cart', JSON.stringify(cartItems));
}

/** Load the cart from localStorage on page load */
function loadCartFromStorage() {
  const saved = localStorage.getItem('ceyloncart_cart');
  // JSON.parse() converts the stored string BACK into a JavaScript array
  return saved ? JSON.parse(saved) : [];
}

// ---- Public Cart Functions ----

/** Add a product to cart, or increase quantity if it already exists */
export function addToCart(product) {
  const existing = cartItems.find(item => item.id === product.id);

  if (existing) {
    // Product already in cart — just increase the quantity
    existing.quantity += 1;
  } else {
    // New product — add it with quantity: 1
    cartItems.push({ ...product, quantity: 1 });
    // STUDY NOTE: `{ ...product, quantity: 1 }` is the "spread operator"
    // It COPIES all properties from `product` and adds `quantity: 1` on top.
  }

  saveCartToStorage();
}

/** Increase or decrease the quantity of an item */
export function updateQuantity(productId, delta) {
  // delta is +1 (increase) or -1 (decrease)
  const item = cartItems.find(item => item.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCartToStorage();
}

/** Remove a product completely from the cart */
export function removeFromCart(productId) {
  // filter() returns a NEW array without the removed item
  // The original item with matching id is excluded
  cartItems = cartItems.filter(item => item.id !== productId);
  saveCartToStorage();
}

/** Get the current cart array */
export function getCart() {
  return cartItems;
}

/** Get total number of items in cart (sum of all quantities) */
export function getCartCount() {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
  // STUDY NOTE: reduce() is a powerful array method.
  // It "reduces" the array to a single value.
  // Here it adds up all item.quantity values, starting from 0.
}

/** Get the total price of all items in cart */
export function getCartTotal() {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}
