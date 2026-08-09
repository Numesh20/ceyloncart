# 🦁 CeylonCart — Premium Sri Lankan E-Commerce Store

![CeylonCart](https://img.shields.io/badge/CeylonCart-Sri%20Lankan%20Goods-f5a623?style=for-the-badge)
![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646cff?style=for-the-badge&logo=vite)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-f7df1e?style=for-the-badge&logo=javascript)

> *"Authentic Flavors. Timeless Crafts."*

CeylonCart is a premium, dark-themed Sri Lankan online marketplace built as a learning project. It showcases authentic Sri Lankan products — Ceylon Tea, Spices, Handcrafts, Batik textiles, Ayurveda products and more.

---

## 🌟 Features

- **Dark & Sleek Design** — Golden yellow + electric cyan color theme inspired by Sri Lanka's heritage
- **Dynamic Category Filtering** — Click any category to filter products instantly
- **Real-time Search** — Type to search products by name or description
- **Shopping Cart** — Add, remove and update product quantities with a slide-in sidebar
- **Persistent Cart** — Cart data is saved using `localStorage` and survives page refreshes
- **Responsive Design** — Fully optimized for desktop, tablet and mobile devices
- **Smooth Animations** — Floating hero image, card hover effects and fade-in transitions
- **Toast Notifications** — User feedback on every cart action

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic page structure & SEO |
| **CSS3** | Design system, CSS variables, Grid & Flexbox |
| **Vanilla JavaScript (ES6+)** | Dynamic rendering, state management, DOM manipulation |
| **Vite** | Build tool, dev server & ES6 module bundling |
| **Google Fonts** | Playfair Display (headings) + Inter (body) |
| **Font Awesome** | Icons |

---

## 📁 Project Structure

```
ceyloncart/
├── index.html              # Main HTML page
├── package.json            # Project config & npm scripts
├── vite.config.js          # Vite configuration
├── public/
│   ├── hero.png            # Hero section image
│   ├── product_tea.png     # Product images
│   ├── product_spices.png
│   ├── product_batik.png
│   ├── product_elephant.png
│   ├── product_coconut_oil.png
│   └── product_ayurveda.png
└── src/
    ├── main.js             # App entry point (wires everything together)
    ├── style.css           # Global styles & design system
    ├── data/
    │   └── products.js     # Product & category data (ES6 exports)
    └── modules/
        ├── cart.js         # Cart state management + localStorage
        ├── products.js     # Product rendering & filtering logic
        └── ui.js           # UI helpers, cart sidebar, navbar effects
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ceyloncart.git

# 2. Navigate into the project folder
cd ceyloncart

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open your browser and go to: **http://localhost:5173**

---

## 📚 Key Learning Concepts

This project was built as a learning exercise covering:

1. **ES6 Modules** — `import` / `export` to split code into reusable files
2. **State Management** — Managing cart and filter state across modules
3. **DOM Manipulation** — Dynamic content rendering with `innerHTML` and template literals
4. **Array Methods** — `map()`, `filter()`, `reduce()`, `find()` for data operations
5. **localStorage API** — Persisting data across browser sessions
6. **Event Delegation** — Attaching one listener to a parent to handle many children
7. **CSS Custom Properties** — Building a complete design token system
8. **IntersectionObserver API** — Detecting when elements enter the viewport
9. **Vite Build Tool** — Modern JavaScript bundling and hot module replacement

---

## 🇱🇰 Product Categories

- 🍵 **Ceylon Tea** — Single-estate black & green teas from Nuwara Eliya highlands
- 🌶️ **Spices & Herbs** — Authentic Ceylon cinnamon, cardamom, cloves & more
- 🐘 **Handcrafts** — Hand-carved wooden figurines from Kandy artisans
- 🎨 **Batik & Textiles** — Traditional hand-dyed batik fabric & clothing
- 🌿 **Ayurveda** — Traditional herbal wellness products
- 🥥 **Coconut Products** — Pure virgin coconut oil & coconut-based goods

---

## 👨‍💻 Author

Built by a **Sri Lankan IT University Student** as a full learning project.

> *"Every line of code here was written to learn something new."*

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
