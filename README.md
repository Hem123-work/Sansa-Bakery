# Sansa Bakes — Handcrafted Gourmet Brownies 🍫✨

A modern, responsive, high-converting bakery storefront designed for **Sansa Bakes**. Built with pure HTML5, modern modular CSS3, and vanilla ES6+ JavaScript.

![Sansa Bakes Hero Brownies](assets/images/hero-brownies.jpg)

---

## ✨ Features

- **Artisanal Aesthetics**: Warm confectionery palette (cocoa, caramel, cream, gold accents), glassmorphic sticky header, and smooth micro-animations.
- **Portion Switcher**: Instantly toggle between **Per piece** (₹160+) and **Whole tray ~ 1 kg** (₹1,199+).
- **Dietary & Flavour Filters**: Filter by *100% Eggless*, *Extra Rich*, or *Nutty & Crunchy*.
- **Product Quick-View Modal**: Detailed modal with tabs for *Tasting Notes*, *Ingredients & Allergens*, and *Reheating & Storage Instructions*.
- **Reactive Shopping Bag Drawer**:
  - Add to bag with bump animation and live cart badge counter.
  - Increment / decrement quantities with instant subtotal recalculation.
  - Persistent cart state saved to `localStorage`.
- **Gifting & Personalization**:
  - "🎁 Is this a gift?" option in checkout.
  - Adds recipient name and a handwritten greeting card message to the order.
- **WhatsApp Order Integration**: Formats customer name, phone, delivery address, itemized breakdown, and gift message into a pre-filled WhatsApp link with celebratory confetti.
- **Social Proof & Customer Trust**:
  - Customer review cards with 5-star ratings.
  - 4 core brand promises (100% Vegetarian/Eggless, Pure Couverture Chocolate, Baked to Order, Gift Packaging).
  - Interactive FAQ accordion with storage, reheating, and delivery answers.
- **Floating WhatsApp Quick-Chat Widget**: Instant 1-tap inquiries for questions.
- **SEO & Social Sharing Ready**: Includes OpenGraph meta tags, Twitter card tags, and custom SVG favicon.

---

## 🚀 Running Locally

You do not need to install complex build tools or node packages. You can run it immediately with any local HTTP server:

### Option 1: Python
```bash
python -m http.server 8080
```
Then open `http://localhost:8080` in your web browser.

### Option 2: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

### Option 3: Node / npx
```bash
npx serve .
```

---

## ⚙️ Business Configuration

Before publishing live, open [script.js](script.js) and update the `BUSINESS_SETTINGS` object:

```javascript
const BUSINESS_SETTINGS = {
  // Enter digits only including country code (e.g., '919876543210' for India)
  whatsappNumber: "919876543210", 
  businessName: "Sansa Bakes",
  email: "hello@sansabakes.com",
  instagram: "sansa_bakes",
  currency: "INR",
  operatingHours: "10:00 AM – 9:00 PM (Daily)",
  deliveryNotice: "Freshly baked on order. Same-day & pre-orders available."
};
```

---

## 🌐 Free 1-Click Deployment to GitHub Pages

1. **Create Repository on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Name the repository (e.g. `sansa-bakes` or `sansabakes-storefront`).
   - Leave it **Public** and do not add a README, .gitignore, or license (they are already created here).
   - Click **Create repository**.

2. **Push Your Code**:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - In your GitHub repo, go to **Settings** > **Pages** (under Code and automation in the left sidebar).
   - Under **Build and deployment > Branch**, select `main` and folder `/(root)`, then click **Save**.
   - Within 1–2 minutes, your website is live at `https://<your-username>.github.io/<repo-name>/`.

---

© Sansa Bakes. Baked with love and lots of chocolate.
