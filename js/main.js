// ═══════════════════════════
// DATA 
// // ═══════════════════════════

const DEFAULT_IMG = 'https://placehold.co/600x800?text=600x800';
const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const LOREM = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>';

const PRODUCTS = [
  {
    id: 1,
    category: 'essentials',
    name: 'CONCEPT BOX "ULTRA"',
    price: 7200,
    badge: 'Best',
    badgeType: 'new',
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  },
  {
    id: 2,
    category: 'essentials',
    name: 'CONCEPT BOX "CORE"',
    price: 4800,
    badge: null,
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  },
  {
    id: 3,
    category: 'hoodies',
    name: 'HOODIE "ESSENTIAL" ONYX',
    price: 3800,
    badge: null,
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  },
  {
    id: 4,
    category: 'tees',
    name: 'LONGSLEEVE "URBAN ECHO"',
    price: 2900,
    badge: 'New Era',
    badgeType: 'new',
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  },
  {
    id: 5,
    category: 'tees',
    name: 'LONGSLEEVE "VELOCITY"',
    price: 3300,
    badge: null,
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  },
  {
    id: 6,
    category: 'tees',
    name: 'LONGSLEEVE "MATRIX" ASH',
    price: 3300,
    badge: null,
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  },
  {
    id: 7,
    category: 'hoodies',
    name: 'HOODIE "PULSE" BURGUNDY',
    price: 3800,
    badge: null,
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  },
  {
    id: 8,
    category: 'tees',
    name: 'LONGSLEEVE "COAST" NAVY',
    price: 3300,
    badge: 'New',
    badgeType: 'new',
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  },
  {
    id: 9,
    category: 'hoodies',
    name: 'HOODIE "SIGNATURE" BLACK',
    price: 3800,
    badge: null,
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  },
  {
    id: 10,
    category: 'hoodies',
    name: 'HOODIE "VINTAGE" WASHED',
    price: 3600,
    badge: 'Sale',
    badgeType: 'sale',
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  },
  {
    id: 11,
    category: 'tees',
    name: 'T-SHIRT "BASIC" BLACK',
    price: 1600,
    badge: null,
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  },
  {
    id: 12,
    category: 'tees',
    name: 'T-SHIRT "BASIC" WHITE',
    price: 1600,
    badge: null,
    sizes: DEFAULT_SIZES,
    img: DEFAULT_IMG,
    desc: LOREM
  }
];

// ═══════════════════════════
// STATE
// ═══════════════════════════
let cart = JSON.parse(localStorage.getItem('vor_cart')) || [];
let shownCount = 8;
let currentProduct = null;
let selectedSize = null;
let activeCategory = 'all';

// ═══════════════════════════
// HELPERS
// ═══════════════════════════
function priceHTML(p) {
  return `<span>${p.price.toLocaleString('uk-UA')} ₴</span>`;
}

// ═══════════════════════════
// FILTERING & ROUTING
// ═══════════════════════════
function setFilter(cat) {
  activeCategory = cat;
  shownCount = 8;
  renderGrid();
  closeMobile();
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if(target) target.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

function goHome() {
  activeCategory = 'all';
  showPage('home');
  renderGrid();
}

// ═══════════════════════════
// RENDER LOGIC
// ═══════════════════════════
function cardHTML(p) {
  const idx = PRODUCTS.findIndex(item => item.id === p.id);
  const image = p.img || DEFAULT_IMG;
  return `
    <div class="product-card" onclick="goProduct(${idx})">
      <div class="pimg-wrap">
        <img src="${image}" class="pimg" loading="lazy" onerror="this.src='${DEFAULT_IMG}'">
        ${p.badge ? `<span class="pbadge ${p.badgeType||''}">${p.badge}</span>` : ''}
      </div>
      <div class="pinfo">
        <div class="pname">${p.name}</div>
        <div class="pprice">${priceHTML(p)}</div>
      </div>
      <button class="quick-add" onclick="event.stopPropagation();quickAdd(${idx})">+ До кошика</button>
    </div>`;
}

function renderGrid() {
  const grid = document.getElementById('productsGrid');
  if(!grid) return;

  let filtered = PRODUCTS;
  if(activeCategory !== 'all') {
    if(activeCategory === 'sale') filtered = PRODUCTS.filter(p => p.badgeType === 'sale');
    else if(activeCategory === 'new') filtered = PRODUCTS.filter(p => p.badgeType === 'new');
    else filtered = PRODUCTS.filter(p => p.category === activeCategory);
  }

  grid.innerHTML = filtered.slice(0, shownCount).map(cardHTML).join('');
  
  const btn = document.getElementById('loadMore');
  if(btn) {
    btn.style.display = filtered.length <= shownCount ? 'none' : 'inline-block';
  }
}

// ═══════════════════════════
// PRODUCT PAGE
// ═══════════════════════════
function goProduct(idx) {
  const p = PRODUCTS[idx];
  if(!p) return;
  currentProduct = p;
  selectedSize = null;

  document.getElementById('bc-name').textContent = p.name;
  document.getElementById('prodTitle').textContent = p.name;
  document.getElementById('prodPrice').innerHTML = priceHTML(p);
  document.getElementById('prodDesc').innerHTML = p.desc;
  
  document.getElementById('prodMainImg').innerHTML = 
    `<img src="${p.img || DEFAULT_IMG}" style="width:100%;height:100%;object-fit:cover" onerror="this.src='${DEFAULT_IMG}'">`;

  document.getElementById('sizeGrid').innerHTML =
    p.sizes.map(s => `<button class="size-btn" onclick="selectSize(this,'${s}')">${s}</button>`).join('');

  const related = PRODUCTS.filter(x => x.id !== p.id).sort(()=>Math.random()-.5).slice(0,4);
  document.getElementById('relatedGrid').innerHTML = related.map(cardHTML).join('');

  showPage('product');
}

function selectSize(el, size) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedSize = size;
}

// ═══════════════════════════
// CART LOGIC
// ═══════════════════════════
function addToCart(product, size) {
  cart.push({ product, size, uid: Date.now() + Math.random() });
  saveCart();
  updateCartUI();
  openCart();
  showToast('Додано в кошик ✓');
}

function quickAdd(idx) {
  const p = PRODUCTS[idx];
  addToCart(p, p.sizes[0] || null);
}

function removeItem(uid) {
  cart = cart.filter(i => i.uid !== uid);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('vor_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  if(countEl) countEl.textContent = cart.length;

  const empty = document.getElementById('cartEmpty');
  const items = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (!cart.length) {
    if(empty) empty.style.display = 'flex';
    if(items) items.innerHTML = '';
    if(footer) footer.style.display = 'none';
    return;
  }

  if(empty) empty.style.display = 'none';
  if(footer) footer.style.display = 'block';

  items.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="ci-img">
        <img src="${item.product.img || DEFAULT_IMG}" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div class="ci-info">
        <div class="ci-name">${item.product.name}</div>
        <div class="ci-size">${item.size ? 'Розмір: '+item.size : ''}</div>
        <div class="ci-price">${item.product.price}</div>
      </div>
      <button class="ci-remove" onclick="removeItem(${item.uid})">×</button>
    </div>`).join('');

  const total = cart.reduce((s, i) => s + i.product.priceNum, 0);
  document.getElementById('cartTotal').textContent = total.toLocaleString('uk-UA') + ' ₴';
}

// ═══════════════════════════
// UI EVENTS
// ═══════════════════════════
function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartSidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartSidebar').classList.remove('open');
  document.body.style.overflow = '';
}

function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  updateCartUI();

  document.getElementById('cartToggle').onclick = openCart;
  document.getElementById('cartClose').onclick = closeCart;
  document.getElementById('cartOverlay').onclick = closeCart;
  
  const loadMore = document.getElementById('loadMore');
  if(loadMore) loadMore.onclick = () => {
    shownCount += 4;
    renderGrid();
  };

  const addBtn = document.getElementById('addBtn');
  if(addBtn) addBtn.onclick = () => {
    if(!selectedSize && currentProduct.sizes.length) {
      document.getElementById('sizeGrid').classList.add('shake');
      setTimeout(() => document.getElementById('sizeGrid').classList.remove('shake'), 400);
      showToast('Оберіть розмір');
      return;
    }
    addToCart(currentProduct, selectedSize);
  };

  const burger = document.getElementById('burgerBtn');
  if(burger) burger.onclick = () => document.getElementById('mobileMenu').classList.add('open');
  
  const mobileClose = document.getElementById('mobileClose');
  if(mobileClose) mobileClose.onclick = closeMobile;
});