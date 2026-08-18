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
    description: 'Hand-picked single-estate black tea from the Nuwara Eliya highlands. Rich, full-bodied flavor with a beautiful amber color and a lingering malty finish that tea lovers worldwide cherish.',
    price: 1850,
    rating: 4.9,
    reviews: 312,
    image: '/product_tea.png',
    badge: 'Best Seller',
    highlights: ['Single-estate, hand-picked leaves', 'Nuwara Eliya highlands origin', 'Rich amber brew with malty finish', 'Resealable foil-lined pouch', 'Net weight: 100g'],
  },
  {
    id: 2,
    name: 'True Ceylon Cinnamon Sticks',
    category: 'spices',
    description: 'Authentic "soft quill" Ceylon cinnamon — the real deal, not the harsh cassia variety. Delicate & sweet with a warm, complex flavour profile prized by chefs worldwide.',
    price: 980,
    rating: 4.8,
    reviews: 204,
    image: '/product_spices.png',
    badge: 'Authentic',
    highlights: ['True Ceylon (Cinnamomum verum)', 'Soft quill — not cassia bark', 'Low coumarin, safe daily use', 'Sourced from Matale district', 'Pack of 10 whole sticks'],
  },
  {
    id: 3,
    name: 'Hand-Carved Wooden Elephant',
    category: 'crafts',
    description: 'Beautifully detailed elephant figurine, hand-carved by artisans in Kandy from sustainable Mahogany wood. A timeless Sri Lankan keepsake and perfect gift.',
    price: 3500,
    rating: 4.7,
    reviews: 88,
    image: '/product_elephant.png',
    badge: 'Handmade',
    highlights: ['Hand-carved by Kandy artisans', 'Sustainable Mahogany wood', 'Unique — no two are identical', 'Height: approx. 15 cm', 'Comes in a gift box'],
  },
  {
    id: 4,
    name: 'Traditional Batik Sarong',
    category: 'batik',
    description: 'Vibrant handwoven batik fabric with intricate traditional motifs. Crafted using age-old wax-resist dyeing techniques passed down through generations in Ambalangoda.',
    price: 2200,
    rating: 4.6,
    reviews: 145,
    image: '/product_batik.png',
    badge: 'Artisan',
    highlights: ['Hand-drawn wax-resist batik', 'Natural fabric, vibrant dyes', 'Traditional Ambalangoda motifs', 'Dimensions: 200cm x 115cm', 'Machine washable (cold)'],
  },
  {
    id: 5,
    name: 'Pure Virgin Coconut Oil',
    category: 'coconut',
    description: 'Cold-pressed from fresh Sri Lankan coconuts within hours of harvest. Unrefined, unbleached — pure coconut goodness. Perfect for cooking, hair care and skincare.',
    price: 760,
    rating: 4.8,
    reviews: 267,
    image: '/product_coconut_oil.png',
    badge: 'Organic',
    highlights: ['Cold-pressed, unrefined', 'No additives or preservatives', 'Multipurpose: cook, hair & skin', 'Certified organic', 'Volume: 500ml glass jar'],
  },
  {
    id: 6,
    name: 'Ayurvedic Herbal Oil Kit',
    category: 'ayurveda',
    description: 'Traditional Sri Lankan Ayurvedic oil blend with turmeric, neem and gingili. Prepared by certified Ayurvedic physicians — balances the body, soothes the mind.',
    price: 1450,
    rating: 4.5,
    reviews: 92,
    image: '/product_ayurveda.png',
    badge: 'Natural',
    highlights: ['Prepared by Ayurvedic physicians', 'Turmeric, Neem & Gingili blend', 'No synthetic ingredients', 'Suitable for all skin types', 'Kit includes 3 x 100ml bottles'],
  },
  {
    id: 7,
    name: 'Ceylon Green Tea Collection',
    category: 'tea',
    description: 'A curated gift collection of 3 premium Ceylon green teas: Jasmine, Sencha and Gunpowder. Lightly oxidized, deeply refreshing — a journey through Sri Lankan tea gardens.',
    price: 2400,
    rating: 4.7,
    reviews: 178,
    image: '/product_tea.png',
    badge: 'Gift Set',
    highlights: ['3 varieties: Jasmine, Sencha, Gunpowder', 'Nuwara Eliya high-grown leaves', 'Beautiful gift tin packaging', 'Low caffeine, high antioxidants', 'Total: 3 x 50g tins'],
  },
  {
    id: 8,
    name: 'Sri Lankan Spice Mix Set',
    category: 'spices',
    description: 'A curated set of 6 authentic Sri Lankan spices: curry powder, turmeric, black pepper, cardamom, cloves & nutmeg — everything you need to cook like a Sri Lankan grandmother.',
    price: 1680,
    rating: 4.9,
    reviews: 321,
    image: '/product_spices.png',
    badge: 'Value Pack',
    highlights: ['6 essential Sri Lankan spices', 'Stone-ground, freshly packed', 'No artificial colours or flavours', 'Resealable labelled pouches', 'Recipe card included'],
  },
];
