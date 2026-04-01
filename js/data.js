// js/data.js

const UI_STRINGS = {
  uk: {
    cart: "Кошик",
    emptyCart: "Тут поки порожньо",
    total: "Разом",
    checkout: "ОФОРМИТИ ЗАМОВЛЕННЯ",
    quickAdd: "+ Швидко додати",
    loadMore: "Завантажити ще",
    allLoaded: "Всі товари завантажені",
    selectSize: "Оберіть розмір!",
    added: "Додано до кошика! ✓",
    home: "Головна",
    related: "Вам може сподобатись"
  },
  en: {
    cart: "Cart",
    emptyCart: "Your cart is empty",
    total: "Total",
    checkout: "CHECKOUT",
    quickAdd: "+ Quick add",
    loadMore: "Load more",
    allLoaded: "All items loaded",
    selectSize: "Please select a size!",
    added: "Added to cart! ✓",
    home: "Home",
    related: "You may also like"
  }
};

const PRODUCTS = [
  {
    id: 1,
    priceNum: 7200,
    price: { uk: '7 200 ₴', en: '€165' },
    oldPrice: null,
    badge: { uk: 'Хіт', en: 'Best' },
    badgeType: 'new',
    color: '#1a1a1a', tc: '#fff',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    name: { uk: 'CONCEPT BOX "ULTRA"', en: 'CONCEPT BOX "ULTRA"' },
    desc: {
      uk: '<p>CONCEPT BOX – це лімітований набір, зміст якого залишається таємницею.</p>',
      en: '<p>CONCEPT BOX is a limited mystery set.</p>'
    }
  },
  {
    id: 2,
    priceNum: 4800,
    price: { uk: '4 800 ₴', en: '€110' },
    oldPrice: null,
    color: '#2a2a2a', tc: '#fff',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    name: { uk: 'CONCEPT BOX "CORE"', en: 'CONCEPT BOX "CORE"' },
    desc: {
      uk: '<p>Базова версія нашого секретного боксу.</p>',
      en: '<p>Basic version of our mystery box.</p>'
    }
  },
  {
    id: 3,
    priceNum: 3800,
    price: { uk: '3 800 ₴', en: '€85' },
    oldPrice: null,
    color: '#111', tc: '#fff',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    name: { uk: 'HOODIE "ESSENTIAL" ONYX', en: 'HOODIE "ESSENTIAL" ONYX' },
    desc: {
      uk: '<p>Фундаментальна модель. Щільний трикотаж.</p>',
      en: '<p>Fundamental piece. Heavy cotton.</p>'
    }
  },
  {
    id: 4,
    priceNum: 2900,
    price: { uk: '2 900 ₴', en: '€65' },
    oldPrice: null,
    badge: { uk: 'Новинка', en: 'New' },
    badgeType: 'new',
    color: '#e0ddd8', tc: '#111',
    sizes: ['S', 'M', 'L', 'XL'],
    name: { uk: 'LONGSLEEVE "URBAN ECHO"', en: 'LONGSLEEVE "URBAN ECHO"' },
    desc: {
      uk: '<p>Лонгслів з акцентною графікою.</p>',
      en: '<p>Longsleeve with accent graphics.</p>'
    }
  }
];