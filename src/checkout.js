/**
 * checkout.js — Checkout Page Logic
 *
 * Handles:
 *  - Loading cart from localStorage
 *  - Rendering order summary
 *  - 3-step form navigation with validation
 *  - Live card preview updates
 *  - Payment method switching
 *  - Delivery method price updates
 *  - Order confirmation with generated order ID
 *  - Cart clear on successful order
 */

import './style.css';
import './checkout.css';

// ============================================================
// State
// ============================================================
let currentStep = 1;
let selectedDelivery = 'standard';
let selectedPayment  = 'card';
let promoApplied     = false;
let promoDiscount    = 0;

const DELIVERY_PRICES = { standard: 350, express: 750 };
const COD_FEE = 100;
const VALID_PROMOS = { 'CEYLON10': 0.10, 'WELCOME15': 0.15, 'SL20': 0.20 };

// ============================================================
// Load Cart from localStorage
// ============================================================
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('ceyloncart_cart') || '[]');
  } catch {
    return [];
  }
}

function clearCart() {
  localStorage.removeItem('ceyloncart_cart');
}

function formatLKR(amount) {
  return `LKR ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ============================================================
// Render Order Summary
// ============================================================
function renderSummary() {
  const cart = loadCart();
  const itemsEl    = document.getElementById('summaryItems');
  const subtotalEl = document.getElementById('summarySubtotal');
  const deliveryEl = document.getElementById('summaryDelivery');
  const totalEl    = document.getElementById('summaryTotal');
  const codRow     = document.getElementById('codRow');

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="summary-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your cart is empty.<br/><a href="/" style="color:var(--gold)">Go back to shop</a></p>
      </div>`;
  } else {
    itemsEl.innerHTML = cart.map(item => `
      <div class="summary-item">
        <img src="${item.image}" alt="${item.name}" class="summary-item-img" />
        <div class="summary-item-info">
          <p class="summary-item-name">${item.name}</p>
          <p class="summary-item-qty">Qty: ${item.quantity}</p>
        </div>
        <span class="summary-item-price">${formatLKR(item.price * item.quantity)}</span>
      </div>
    `).join('');
  }

  const subtotal     = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee  = DELIVERY_PRICES[selectedDelivery] || 350;
  const codFee       = selectedPayment === 'cod' ? COD_FEE : 0;
  const discountAmt  = promoApplied ? Math.round(subtotal * promoDiscount) : 0;
  const total        = subtotal + deliveryFee + codFee - discountAmt;

  if (subtotalEl) subtotalEl.textContent = formatLKR(subtotal);
  if (deliveryEl) deliveryEl.textContent = formatLKR(deliveryFee);
  if (codRow)     codRow.style.display  = selectedPayment === 'cod' ? 'flex' : 'none';
  if (totalEl)    totalEl.textContent   = formatLKR(total);
}

// ============================================================
// Step Navigation
// ============================================================
function goToStep(step) {
  // Hide current panel
  const prevPanel = document.getElementById(`panel-${currentStep}`);
  if (prevPanel) prevPanel.classList.remove('active');

  // Update step indicators
  for (let i = 1; i <= 3; i++) {
    const ind = document.getElementById(`step-indicator-${i}`);
    if (!ind) continue;
    ind.classList.remove('active', 'done');
    if (i < step)  ind.classList.add('done');
    if (i === step) ind.classList.add('active');
  }

  // Update step lines
  document.querySelectorAll('.step-line').forEach((line, idx) => {
    line.classList.toggle('done', idx < step - 1);
  });

  currentStep = step;

  // Show new panel
  const newPanel = document.getElementById(`panel-${step}`);
  if (newPanel) newPanel.classList.add('active');

  // Scroll to top of checkout
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// Validation Helpers
// ============================================================
function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errEl = document.getElementById(`err-${fieldId}`);
  if (field)  field.classList.toggle('error', !!message);
  if (errEl)  errEl.textContent = message || '';
}

function clearErrors(...ids) {
  ids.forEach(id => setError(id, ''));
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// ============================================================
// Step 1 Validation
// ============================================================
function validateStep1() {
  let valid = true;
  clearErrors('firstName','lastName','email','phone','address','city','district');

  if (!val('firstName'))  { setError('firstName', 'First name is required'); valid = false; }
  if (!val('lastName'))   { setError('lastName',  'Last name is required');  valid = false; }

  const email = val('email');
  if (!email) {
    setError('email', 'Email is required'); valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('email', 'Enter a valid email address'); valid = false;
  }

  const phone = val('phone');
  if (!phone) {
    setError('phone', 'Phone number is required'); valid = false;
  } else if (!/^\d{7,10}$/.test(phone.replace(/\s/g, ''))) {
    setError('phone', 'Enter a valid Sri Lankan phone number'); valid = false;
  }

  if (!val('address'))  { setError('address',  'Street address is required'); valid = false; }
  if (!val('city'))     { setError('city',      'City is required');           valid = false; }
  if (!val('district')) { setError('district',  'Please select a district');   valid = false; }

  return valid;
}

// ============================================================
// Step 2 Validation
// ============================================================
function validateStep2() {
  if (selectedPayment !== 'card') return true; // bank/COD need no card validation

  let valid = true;
  clearErrors('cardNumber','cardHolder','cardExpiry','cardCvv');

  const raw = val('cardNumber').replace(/\s/g, '');
  if (!raw) {
    setError('cardNumber', 'Card number is required'); valid = false;
  } else if (!/^\d{16}$/.test(raw)) {
    setError('cardNumber', 'Enter a valid 16-digit card number'); valid = false;
  }

  if (!val('cardHolder')) { setError('cardHolder', 'Name on card is required'); valid = false; }

  const expiry = val('cardExpiry');
  if (!expiry) {
    setError('cardExpiry', 'Expiry date is required'); valid = false;
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
    setError('cardExpiry', 'Use MM/YY format'); valid = false;
  } else {
    const [m, y] = expiry.split('/').map(Number);
    const now = new Date();
    const exp = new Date(2000 + y, m - 1);
    if (exp < now) { setError('cardExpiry', 'Card has expired'); valid = false; }
  }

  const cvv = val('cardCvv');
  if (!cvv) {
    setError('cardCvv', 'CVV is required'); valid = false;
  } else if (!/^\d{3,4}$/.test(cvv)) {
    setError('cardCvv', 'Enter a valid CVV'); valid = false;
  }

  return valid;
}

// ============================================================
// Card Preview — Live updates
// ============================================================
function initCardPreview() {
  const numInput    = document.getElementById('cardNumber');
  const holderInput = document.getElementById('cardHolder');
  const expiryInput = document.getElementById('cardExpiry');

  const numDisplay    = document.getElementById('cardNumDisplay');
  const holderDisplay = document.getElementById('cardHolderDisplay');
  const expiryDisplay = document.getElementById('cardExpiryDisplay');
  const brandIcon     = document.getElementById('cardBrandIcon');

  if (!numInput) return;

  numInput.addEventListener('input', () => {
    // Auto-format with spaces every 4 digits
    let v = numInput.value.replace(/\D/g, '').slice(0, 16);
    numInput.value = v.replace(/(.{4})/g, '$1 ').trim();

    const display = v.padEnd(16, '.').replace(/(.{4})/g, '$1 ').trim();
    if (numDisplay) numDisplay.textContent = display;

    // Brand detection
    if (brandIcon) {
      if (/^4/.test(v))       brandIcon.innerHTML = '<i class="fa-brands fa-cc-visa"></i>';
      else if (/^5/.test(v))  brandIcon.innerHTML = '<i class="fa-brands fa-cc-mastercard"></i>';
      else if (/^3[47]/.test(v)) brandIcon.innerHTML = '<i class="fa-brands fa-cc-amex"></i>';
      else                    brandIcon.innerHTML = '<i class="fa-solid fa-credit-card"></i>';
    }
  });

  holderInput.addEventListener('input', () => {
    if (holderDisplay) {
      holderDisplay.textContent = holderInput.value.toUpperCase() || 'YOUR NAME';
    }
  });

  expiryInput.addEventListener('input', () => {
    let v = expiryInput.value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
    expiryInput.value = v;
    if (expiryDisplay) expiryDisplay.textContent = expiryInput.value || 'MM/YY';
  });
}

// ============================================================
// Payment Method Switcher
// ============================================================
function initPaymentMethods() {
  const methods = document.querySelectorAll('.pay-method');
  methods.forEach(btn => {
    btn.addEventListener('click', () => {
      methods.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPayment = btn.dataset.method;

      document.getElementById('cardForm').style.display = selectedPayment === 'card' ? 'block' : 'none';
      document.getElementById('bankForm').style.display = selectedPayment === 'bank' ? 'block' : 'none';
      document.getElementById('codForm').style.display  = selectedPayment === 'cod'  ? 'block' : 'none';

      renderSummary();
    });
  });
}

// ============================================================
// Delivery Method Switcher
// ============================================================
function initDeliveryOptions() {
  document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', () => {
      selectedDelivery = radio.value;
      document.querySelectorAll('.delivery-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      radio.closest('.delivery-option').classList.add('selected');
      renderSummary();
    });
  });
}

// ============================================================
// Promo Code
// ============================================================
function initPromo() {
  const promoBtn = document.getElementById('promoBtn');
  if (!promoBtn) return;

  promoBtn.addEventListener('click', () => {
    const code  = (document.getElementById('promoInput')?.value || '').trim().toUpperCase();
    const errEl = document.getElementById('err-promo');

    if (promoApplied) {
      if (errEl) errEl.textContent = 'A promo code is already applied.';
      return;
    }

    if (VALID_PROMOS[code]) {
      promoDiscount = VALID_PROMOS[code];
      promoApplied  = true;
      if (errEl) {
        errEl.style.color = 'var(--success)';
        errEl.textContent = `✓ "${code}" applied — ${Math.round(promoDiscount * 100)}% off!`;
      }
      promoBtn.textContent = 'Applied ✓';
      promoBtn.style.color = 'var(--success)';
      promoBtn.style.borderColor = 'var(--success)';
      renderSummary();
    } else {
      if (errEl) {
        errEl.style.color = 'var(--danger)';
        errEl.textContent = 'Invalid promo code. Try CEYLON10, WELCOME15 or SL20.';
      }
    }
  });
}

// ============================================================
// Generate Order ID
// ============================================================
function generateOrderId() {
  const ts  = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `#CC-${ts}${rnd}`;
}

// ============================================================
// Render Confirmation Details
// ============================================================
function renderConfirmation() {
  const orderId = generateOrderId();
  const idEl = document.getElementById('confirmOrderId');
  if (idEl) idEl.textContent = orderId;

  const cart     = loadCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = DELIVERY_PRICES[selectedDelivery] || 350;
  const codFee   = selectedPayment === 'cod' ? COD_FEE : 0;
  const discount = promoApplied ? Math.round(subtotal * promoDiscount) : 0;
  const total    = subtotal + delivery + codFee - discount;

  const detailsEl = document.getElementById('confirmDetails');
  if (detailsEl) {
    const payLabel = { card: 'Credit/Debit Card', bank: 'Bank Transfer', cod: 'Cash on Delivery' };
    const delLabel = { standard: 'Standard (3-5 days)', express: 'Express (1-2 days)' };
    detailsEl.innerHTML = `
      <strong>Name:</strong> ${val('firstName')} ${val('lastName')}<br/>
      <strong>Email:</strong> ${val('email')}<br/>
      <strong>Address:</strong> ${val('address')}, ${val('city')}, ${val('district')}<br/>
      <strong>Payment:</strong> ${payLabel[selectedPayment] || selectedPayment}<br/>
      <strong>Delivery:</strong> ${delLabel[selectedDelivery] || selectedDelivery}<br/>
      <strong>Order Total:</strong> ${formatLKR(total)}
    `;
  }

  // Clear the cart after successful order
  clearCart();
}

// ============================================================
// Init All Listeners
// ============================================================
function init() {
  renderSummary();
  initCardPreview();
  initPaymentMethods();
  initDeliveryOptions();
  initPromo();

  // Step 1 → Step 2
  const nextBtn = document.getElementById('nextToPayment');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateStep1()) goToStep(2);
    });
  }

  // Step 2 → Step 1 (back)
  const backBtn = document.getElementById('backToDetails');
  if (backBtn) {
    backBtn.addEventListener('click', () => goToStep(1));
  }

  // Step 2 → Step 3 (place order)
  const placeBtn = document.getElementById('placeOrderBtn');
  if (placeBtn) {
    placeBtn.addEventListener('click', () => {
      if (!validateStep2()) return;

      // Loading state
      placeBtn.disabled = true;
      placeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Placing Order...';

      setTimeout(() => {
        renderConfirmation();
        goToStep(3);
        placeBtn.disabled = false;
      }, 1400);
    });
  }

  // Redirect to home if cart is empty on load
  const cart = loadCart();
  if (cart.length === 0 && window.location.pathname.includes('checkout')) {
    // Allow page to load — show empty summary (user sees the empty state)
  }
}

document.addEventListener('DOMContentLoaded', init);
