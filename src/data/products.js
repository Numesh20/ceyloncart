/**
 * products.js — Sri Lankan Product Data
 *
 * STUDY CONCEPT: This file uses ES6 "export" to make the data
 * available to other files. This is called a JavaScript Module.
 * 
 * In older JavaScript, all code shared one global scope (messy).
 * With modules, each file has its OWN scope — much cleaner!
 * 
 * Usage in another file: import { products, categories } from './data/products.js'
 */

export const categories = [
  { id: 'all',       name: 'All Products',    icon: '🛍️' },
  { id: 'tea',       name: 'Ceylon Tea',      icon: '🍵' },
  { id: 'spices',    name: 'Spices & Herbs',  icon: '🌶️' },
  { id: 'crafts',    name: 'Handcrafts',      icon: '🐘' },
  { id: 'batik',     name: 'Batik & Textiles',icon: '🎨' },
  { id: 'ayurveda',  name: 'Ayurveda',        icon: '🌿' },
  { id: 'coconut',   name: 'Coconut Products',icon: '🥥' },
];

export const products = [
  {
    id: 1,
    name: 'Premium Ceylon Black Tea',
    category: 'tea',
    description: 'Hand-picked single-estate black tea from the Nuwara Eliya highlands. Rich, full-bodied flavor.',
    price: 1850,
    rating: 4.9,
    reviews: 312,
    image: '/product_tea.png',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'True Ceylon Cinnamon Sticks',
    category: 'spices',
    description: 'Authentic "soft quill" Ceylon cinnamon — the real deal, not the harsh cassia variety. Delicate & sweet.',
    price: 980,
    rating: 4.8,
    reviews: 204,
    image: '/product_spices.png',
    badge: 'Authentic',
  },
  {
    id: 3,
    name: 'Hand-Carved Wooden Elephant',
    category: 'crafts',
    description: 'Beautifully detailed elephant figurine, hand-carved by artisans in Kandy. A timeless Sri Lankan keepsake.',
    price: 3500,
    rating: 4.7,
    reviews: 88,
    image: '/product_elephant.png',
    badge: 'Handmade',
  },
  {
    id: 4,
    name: 'Traditional Batik Sarong',
    category: 'batik',
    description: 'Vibrant handwoven batik fabric with intricate traditional motifs. Crafted using age-old wax-resist dyeing techniques.',
    price: 2200,
    rating: 4.6,
    reviews: 145,
    image: '/product_batik.png',
    badge: 'Artisan',
  },
  {
    id: 5,
    name: 'Pure Virgin Coconut Oil',
    category: 'coconut',
    description: 'Cold-pressed from fresh Sri Lankan coconuts. Perfect for cooking, hair care and skincare.',
    price: 760,
    rating: 4.8,
    reviews: 267,
    image: '/product_coconut_oil.png',
    badge: 'Organic',
  },
  {
    id: 6,
    name: 'Ayurvedic Herbal Oil Kit',
    category: 'ayurveda',
    description: 'Traditional Sri Lankan Ayurvedic oil blend with turmeric, neem and gingili. Balances the body and mind.',
    price: 1450,
    rating: 4.5,
    reviews: 92,
    image: '/product_ayurveda.png',
    badge: 'Natural',
  },
  {
    id: 7,
    name: 'Ceylon Green Tea Collection',
    category: 'tea',
    description: 'A curated collection of 3 premium green teas: Jasmine, Sencha and Gunpowder. Lightly oxidized, deeply refreshing.',
    price: 2400,
    rating: 4.7,
    reviews: 178,
    image: '/product_tea.png',
    badge: 'Gift Set',
  },
  {
    id: 8,
    name: 'Sri Lankan Spice Mix Set',
    category: 'spices',
    description: 'A curated set of 6 authentic Sri Lankan spices: curry powder, turmeric, black pepper, cardamom, cloves & nutmeg.',
    price: 1680,
    rating: 4.9,
    reviews: 321,
    image: '/product_spices.png',
    badge: 'Value Pack',
  },
];
