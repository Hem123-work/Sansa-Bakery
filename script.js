/**
 * Sansa Bakes - Modern Interactive Storefront Logic
 * Features:
 * - Reactive Cart with LocalStorage Persistence
 * - Dietary & Category Filtering
 * - Product Quick-View Details Modal
 * - Gift Wrap & Handwritten Card Checkout Option
 * - Formatted WhatsApp Order Link Generator
 * - Micro-interactions (Confetti, Badge Pulse, Toasts)
 */

// ==========================================
// 1. BUSINESS CONFIGURATION
// ==========================================
const BUSINESS_SETTINGS = {
  // Enter digits only with country code (e.g., '919876543210' for India)
  whatsappNumber: "919876543210", 
  businessName: "Sansa Bakes",
  email: "hello@sansabakes.com",
  instagram: "sansa_bakes",
  currency: "INR",
  operatingHours: "10:00 AM – 9:00 PM (Daily)",
  deliveryNotice: "Freshly baked on order. Same-day & pre-orders available."
};

// ==========================================
// 2. PRODUCT CATALOGUE
// ==========================================
const products = [
  {
    id: "fudge",
    name: "Classic Fudge Brownie",
    category: "classic",
    tag: "THE ORIGINAL",
    eggless: true,
    containsNuts: false,
    badges: ["100% Eggless", "Bestseller"],
    piece: 60,
    tray: 999,
    description: "Our signature recipe: ultra-fudgy centre with a crackly paper-thin crust. Chocolate lovers' paradise.",
    tastingNotes: "Deep 55% dark cocoa notes with a melt-in-your-mouth chewy texture.",
    ingredients: "Couverture dark chocolate, premium butter, unrefined cane sugar, whole wheat blend, pure vanilla extract.",
    allergens: "Contains Dairy & Gluten. 100% Eggless. Prepared in a bakery that handles nuts.",
    shelfLife: "Room temperature: 5 days | Refrigerated: 12 days | Freeze up to 1 month.",
    reheatTips: "Warm in microwave for 12–15 seconds for a warm molten centre. Heavenly with vanilla ice cream!",
    image: "assets/images/classic-fudge.jpg"
  },
  {
    id: "double",
    name: "Double Chocolate Brownie",
    category: "rich",
    tag: "DOUBLE COCOA",
    eggless: true,
    containsNuts: false,
    badges: ["100% Eggless", "Extra Rich"],
    piece: 70,
    tray: 1199,
    description: "Folded with generous chunks of Belgian dark chocolate that melt into gooey pockets when warm.",
    tastingNotes: "Rich, bittersweet chocolate chunks balanced by a luscious brownie sponge.",
    ingredients: "Belgian chocolate chunks, cocoa solids, brown sugar, farm butter, vanilla essence.",
    allergens: "Contains Dairy & Gluten. 100% Eggless.",
    shelfLife: "Room temperature: 5 days | Refrigerated: 12 days.",
    reheatTips: "Microwave for 15 seconds to watch the inner chocolate chunks turn into liquid pools.",
    image: "assets/images/double-chocolate.jpg"
  },
  {
    id: "triple",
    name: "Triple Chocolate Indulgence",
    category: "rich",
    tag: "MAXIMUM INDULGENCE",
    eggless: true,
    containsNuts: false,
    badges: ["100% Eggless", "Chef's Special"],
    piece: 80,
    tray: 1299,
    description: "An irresistible blend of dark, milk, and white chocolate layered into our rich cocoa batter.",
    tastingNotes: "Complex sweet and dark notes with creamy white chocolate accents in every single bite.",
    ingredients: "Dark chocolate, Belgian milk chocolate chips, ivory white chocolate drops, butter, organic flour.",
    allergens: "Contains Dairy & Gluten. 100% Eggless.",
    shelfLife: "Room temperature: 5 days | Refrigerated: 12 days.",
    reheatTips: "Warm for 10-12 seconds on medium power. Pair with cold milk or iced coffee.",
    image: "assets/images/triple-chocolate.jpg"
  },
  {
    id: "almond",
    name: "Roasted Almond Crunch",
    category: "nutty",
    tag: "NUTTY CRUNCH",
    eggless: true,
    containsNuts: true,
    badges: ["100% Eggless", "Roasted Nuts"],
    piece: 70,
    tray: 1199,
    description: "Slow-roasted California almonds folded within and generously crowned on top for a delightful crunch.",
    tastingNotes: "Warm nutty aroma combining toasted almond crunch with silky fudge chocolate.",
    ingredients: "Slow-toasted almonds, rich cocoa, farm dairy butter, brown sugar, vanilla.",
    allergens: "Contains Tree Nuts (Almonds), Dairy & Gluten. 100% Eggless.",
    shelfLife: "Room temperature: 6 days | Refrigerated: 14 days.",
    reheatTips: "Reheat in a toaster oven for 2 minutes to bring back the crisp almond crunch.",
    image: "assets/images/roasted-almond.jpg"
  },
  {
    id: "walnut",
    name: "Classic Walnut Brownie",
    category: "nutty",
    tag: "TIMELESS PAIRING",
    eggless: true,
    containsNuts: true,
    badges: ["100% Eggless", "Nutty Favourite"],
    piece: 70,
    tray: 1199,
    description: "The quintessential American bakery pairing: buttery Kashmiri walnuts combined with intense cocoa.",
    tastingNotes: "Earthy, buttery walnut crunch cutting through dark, decadent chocolate fudginess.",
    ingredients: "Crisp Kashmiri walnuts, dark cocoa solids, rich butter, vanilla extract, flour.",
    allergens: "Contains Tree Nuts (Walnuts), Dairy & Gluten. 100% Eggless.",
    shelfLife: "Room temperature: 6 days | Refrigerated: 14 days.",
    reheatTips: "Warm gently for 15 seconds. Incredible served with a shot of hot espresso.",
    image: "assets/images/classic-walnut.jpg"
  },
  {
    id: "caramel",
    name: "Salted Caramel Brownie",
    category: "rich",
    tag: "SWEET & SALTY",
    eggless: true,
    containsNuts: false,
    badges: ["100% Eggless", "Crowd Favourite"],
    piece: 75,
    tray: 1249,
    description: "Swirled with our house-made buttery caramel sauce and finished with a pinch of flaky sea salt.",
    tastingNotes: "Addictive contrast between creamy dulce-style caramel, dark cocoa, and crunchy sea salt.",
    ingredients: "Homemade salted butter caramel, dark chocolate, sea salt flakes, brown sugar, flour.",
    allergens: "Contains Dairy & Gluten. 100% Eggless.",
    shelfLife: "Room temperature: 5 days | Refrigerated: 10 days.",
    reheatTips: "Warm for 10-12 seconds until the caramel swirl glistens and softens.",
    image: "assets/images/salted-caramel.jpg"
  }
];

// ==========================================
// 3. APPLICATION STATE
// ==========================================
let selectedSize = "piece"; // 'piece' | 'tray'
let activeFilter = "all";   // 'all' | 'eggless' | 'rich' | 'nutty'
let cart = [];

// Helper Shortcuts
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const formatMoney = (val) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

// Load cart from localStorage
function loadCart() {
  try {
    const saved = localStorage.getItem("sansa_cart");
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }
}

// Save cart to localStorage
function saveCart() {
  try {
    localStorage.setItem("sansa_cart", JSON.stringify(cart));
  } catch (e) {}
}

// ==========================================
// 4. RENDERING FUNCTIONS
// ==========================================
function renderProducts() {
  const grid = $("#productGrid");
  if (!grid) return;

  const filtered = products.filter(product => {
    if (activeFilter === "all") return true;
    if (activeFilter === "eggless") return product.eggless;
    if (activeFilter === "nutty") return product.containsNuts;
    if (activeFilter === "rich") return product.category === "rich";
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p>No brownies found in this category.</p>
        <button class="button button-outline button-sm" style="margin-top: 10px;" onclick="setFilter('all')">View all brownies</button>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const price = product[selectedSize];
    const sizeLabel = selectedSize === "piece" ? "piece" : "tray (1 kg)";
    const badgesHtml = product.badges.map(b => {
      const cls = b.includes("Eggless") ? "badge-eggless" : (b.includes("Bestseller") ? "badge-bestseller" : "badge-nutty");
      return `<span class="badge-tag ${cls}">${b}</span>`;
    }).join("");

    return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-badges">${badgesHtml}</div>
          <button class="product-quick-view-btn" data-quick-view="${product.id}">Quick Details ↗</button>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-footer">
            <div class="price-wrap">
              <span class="price-val">${formatMoney(price)}</span>
              <span class="price-unit">per ${sizeLabel}</span>
            </div>
            <button class="btn-add-cart" data-add="${product.id}" aria-label="Add ${product.name} to bag">+</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderCart() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = $("#cartCount");
  if (badge) {
    badge.textContent = totalCount;
    badge.classList.remove("bump");
    void badge.offsetWidth; // trigger reflow
    badge.classList.add("bump");
  }

  const drawerCount = $("#drawerCount");
  if (drawerCount) drawerCount.textContent = `(${totalCount})`;

  const cartContainer = $("#cartItems");
  if (!cartContainer) return;

  if (cart.length === 0) {
    $("#cartEmpty").style.display = "block";
    $("#cartSummary").style.display = "none";
    cartContainer.innerHTML = "";
    return;
  }

  $("#cartEmpty").style.display = "none";
  $("#cartSummary").style.display = "block";

  cartContainer.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return "";
    const itemUnitPrice = product[item.size];
    const itemTotal = itemUnitPrice * item.quantity;
    const sizeName = item.size === "piece" ? "Per piece" : "Whole tray (1 kg)";

    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${product.image}" alt="${product.name}">
        <div class="cart-item-details">
          <h4>${product.name}</h4>
          <span class="cart-item-size">${sizeName} · ${formatMoney(itemUnitPrice)}</span>
          <div class="qty-controls">
            <button class="qty-btn" data-quantity="${item.id}|${item.size}|-1" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" data-quantity="${item.id}|${item.size}|1" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="cart-item-total">${formatMoney(itemTotal)}</div>
      </div>
    `;
  }).join("");

  const subtotal = calculateCartTotal();
  const subtotalFormatted = formatMoney(subtotal);
  if ($("#cartSubtotal")) $("#cartSubtotal").textContent = subtotalFormatted;
  if ($("#checkoutSubtotal")) $("#checkoutSubtotal").textContent = subtotalFormatted;
}

function calculateCartTotal() {
  return cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product[item.size] * item.quantity : 0);
  }, 0);
}

// ==========================================
// 5. CART MUTATIONS
// ==========================================
function addToCart(id, size = selectedSize, qty = 1) {
  const existing = cart.find(item => item.id === id && item.size === size);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ id, size, quantity: qty });
  }
  saveCart();
  renderCart();

  const product = products.find(p => p.id === id);
  showToast(`Added ${product ? product.name : "Brownie"} to your bag ♥`);
}

function changeQuantity(id, size, delta) {
  const index = cart.findIndex(item => item.id === id && item.size === size);
  if (index === -1) return;

  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  renderCart();
}

function openCart() {
  const drawer = $("#cartDrawer");
  const overlay = $("#overlay");
  if (drawer && overlay) {
    drawer.classList.add("open");
    overlay.classList.add("visible");
    drawer.setAttribute("aria-hidden", "false");
  }
}

function closeCart() {
  const drawer = $("#cartDrawer");
  const overlay = $("#overlay");
  if (drawer && overlay) {
    drawer.classList.remove("open");
    overlay.classList.remove("visible");
    drawer.setAttribute("aria-hidden", "true");
  }
}

// ==========================================
// 6. QUICK VIEW MODAL
// ==========================================
let currentQvProduct = null;
let currentQvSize = "piece";

function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentQvProduct = product;
  currentQvSize = selectedSize;

  const dialog = $("#quickViewDialog");
  if (!dialog) return;

  $("#qvImage").src = product.image;
  $("#qvTitle").textContent = product.name;
  $("#qvDesc").textContent = product.description;
  $("#qvTaste").textContent = product.tastingNotes;
  $("#qvIngredients").textContent = product.ingredients;
  $("#qvAllergens").textContent = product.allergens;
  $("#qvShelfLife").textContent = product.shelfLife;
  $("#qvReheat").textContent = product.reheatTips;
  
  // Badges
  const badgesWrap = $("#qvBadges");
  badgesWrap.innerHTML = product.badges.map(b => `<span class="badge-tag ${b.includes("Eggless") ? "badge-eggless" : "badge-bestseller"}">${b}</span>`).join("");

  updateQvPrice();
  dialog.showModal();
}

function updateQvPrice() {
  if (!currentQvProduct) return;
  const price = currentQvProduct[currentQvSize];
  const unit = currentQvSize === "piece" ? "piece" : "tray (1 kg)";
  $("#qvPrice").textContent = formatMoney(price);
  $("#qvUnit").textContent = `per ${unit}`;
}

// ==========================================
// 7. TOAST & NOTIFICATIONS
// ==========================================
let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.innerHTML = `<span>♡</span> <span>${message}</span>`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

// ==========================================
// 8. ORDER MESSAGE & WHATSAPP INTEGRATION
// ==========================================
function buildOrderMessage(details) {
  const lines = cart.map(item => {
    const p = products.find(product => product.id === item.id);
    const sizeTitle = item.size === "piece" ? "Per piece" : "Whole tray (1 kg)";
    const total = p[item.size] * item.quantity;
    return `• ${p.name} (${sizeTitle}) × ${item.quantity} = ${formatMoney(total)}`;
  });

  let msg = `🍫 *New Brownie Order Request — ${BUSINESS_SETTINGS.businessName}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += lines.join("\n") + `\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `*Order Subtotal:* ${formatMoney(calculateCartTotal())}\n\n`;
  msg += `👤 *Customer Details:*\n`;
  msg += `• *Name:* ${details.name}\n`;
  msg += `• *Phone:* ${details.phone}\n`;
  msg += `• *Address:* ${details.address}\n`;

  if (details.isGift) {
    msg += `\n🎁 *Gift Order Packaging:* Yes\n`;
    msg += `• *Recipient:* ${details.recipientName || "Beloved Friend"}\n`;
    msg += `• *Handwritten Note:* "${details.giftMessage || "Enjoy these delicious brownies!"}"\n`;
  }

  if (details.notes) {
    msg += `\n📝 *Special Instructions:* ${details.notes}\n`;
  }

  msg += `\nPlease confirm availability and delivery charges!`;
  return msg;
}

function sendWhatsApp(message) {
  const cleanNumber = BUSINESS_SETTINGS.whatsappNumber.replace(/\D/g, "");
  if (!cleanNumber) {
    showToast("Please set the bakery WhatsApp number in script.js first.");
    return false;
  }
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}

// ==========================================
// 9. DELIGHTFUL CONFETTI ANIMATION
// ==========================================
function launchConfetti() {
  const container = document.createElement("div");
  container.className = "confetti-container";
  document.body.appendChild(container);

  const colors = ["#b56b3e", "#d49a37", "#542714", "#f5dfcf", "#25d366", "#e88f62"];
  for (let i = 0; i < 45; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 4000);
}

// ==========================================
// 10. EVENT LISTENERS & SETUP
// ==========================================
function setFilter(category) {
  activeFilter = category;
  $$(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === category);
  });
  renderProducts();
}

window.addEventListener("DOMContentLoaded", () => {
  loadCart();
  renderProducts();
  renderCart();

  // Synchronize floating WhatsApp button with configuration
  const floatingWa = $(".floating-whatsapp");
  if (floatingWa) {
    floatingWa.href = `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=${encodeURIComponent("Hello Sansa Bakes! I have an inquiry about your brownies.")}`;
  }

  // Sticky Header Shadow on Scroll
  window.addEventListener("scroll", () => {
    const header = $(".site-header");
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
  });

  // Size Switcher
  $$(".size-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      selectedSize = tab.dataset.size;
      $$(".size-tab").forEach(t => t.classList.toggle("active", t === tab));
      renderProducts();
    });
  });

  // Category Filters
  $$(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setFilter(btn.dataset.filter);
    });
  });

  // Product Grid Delegate (Add to Cart / Quick View)
  const productGrid = $("#productGrid");
  if (productGrid) {
    productGrid.addEventListener("click", (e) => {
      const addBtn = e.target.closest("[data-add]");
      if (addBtn) {
        addToCart(addBtn.dataset.add);
        return;
      }
      const qvBtn = e.target.closest("[data-quick-view]");
      if (qvBtn) {
        openQuickView(qvBtn.dataset.quickView);
      }
    });
  }

  // Cart Items Delegate (+ / -)
  const cartItems = $("#cartItems");
  if (cartItems) {
    cartItems.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-quantity]");
      if (!btn) return;
      const [id, size, delta] = btn.dataset.quantity.split("|");
      changeQuantity(id, size, parseInt(delta, 10));
    });
  }

  // Cart Drawer open/close
  $("#openCart")?.addEventListener("click", openCart);
  $("#closeCart")?.addEventListener("click", closeCart);
  $("#overlay")?.addEventListener("click", () => {
    closeCart();
    $("#quickViewDialog")?.close();
  });

  $("#continueShopping")?.addEventListener("click", () => {
    closeCart();
    $("#menu")?.scrollIntoView({ behavior: "smooth" });
  });

  // Mobile Navigation Toggle
  const menuToggle = $("#menuToggle");
  const nav = $("#nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Quick View Tabs & Buttons
  $$(".qv-tab-btn").forEach(tabBtn => {
    tabBtn.addEventListener("click", () => {
      $$(".qv-tab-btn").forEach(b => b.classList.remove("active"));
      $$(".qv-tab-pane").forEach(p => p.classList.remove("active"));
      tabBtn.classList.add("active");
      const targetPane = $(`#${tabBtn.dataset.tab}`);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  $("#qvCloseBtn")?.addEventListener("click", () => $("#quickViewDialog").close());

  $("#qvSizeSelect")?.addEventListener("change", (e) => {
    currentQvSize = e.target.value;
    updateQvPrice();
  });

  $("#qvAddBagBtn")?.addEventListener("click", () => {
    if (!currentQvProduct) return;
    addToCart(currentQvProduct.id, currentQvSize, 1);
    $("#quickViewDialog").close();
  });

  // Checkout Dialog Flow
  $("#checkoutButton")?.addEventListener("click", () => {
    if (!cart.length) return;
    $("#checkoutSubtotal").textContent = formatMoney(calculateCartTotal());
    $("#checkoutDialog").showModal();
  });

  $("#closeCheckout")?.addEventListener("click", () => $("#checkoutDialog").close());

  // Gift Checkbox Toggle
  const giftCheckbox = $("#isGiftCheckbox");
  const giftFields = $("#giftFields");
  if (giftCheckbox && giftFields) {
    giftCheckbox.addEventListener("change", () => {
      giftFields.classList.toggle("active", giftCheckbox.checked);
    });
  }

  // Checkout Form Submission
  $("#checkoutForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!cart.length) return;

    const formData = new FormData(e.currentTarget);
    const details = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      notes: formData.get("notes"),
      isGift: formData.get("isGift") === "on",
      recipientName: formData.get("recipientName"),
      giftMessage: formData.get("giftMessage")
    };

    const sent = sendWhatsApp(buildOrderMessage(details));
    if (sent) {
      launchConfetti();
      $("#checkoutDialog").close();
      closeCart();
      showToast("WhatsApp opened! Send the message to request your fresh batch ♥");
    }
  });

  // Contact Order CTA button
  $("#contactOrder")?.addEventListener("click", () => {
    if (cart.length > 0) {
      openCart();
    } else {
      $("#menu")?.scrollIntoView({ behavior: "smooth" });
      showToast("Pick your favourite brownies to start an order!");
    }
  });

  // FAQ Accordion Handler
  $$(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const isActive = item.classList.contains("active");

      // Close other items
      $$(".faq-item").forEach(other => other.classList.remove("active"));

      // Toggle current
      if (!isActive) item.classList.add("active");
    });
  });

  // Escape key closes modals/cart
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      $("#quickViewDialog")?.close();
      $("#checkoutDialog")?.close();
    }
  });

  // Copyright Year
  const yearElem = $("#year");
  if (yearElem) yearElem.textContent = new Date().getFullYear();
});
