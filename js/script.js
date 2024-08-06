const caffeineContainer = document.getElementById('caffeineContainer');
const teasContainer = document.getElementById('teasContainer');
const cakesContainer = document.getElementById('cakesContainer');
const snacksContainer = document.getElementById('snacksContainer');
const totalContainer = document.getElementById('totalContainer');
const totalElement = document.getElementById('total');
const proceedButton = document.getElementById('proceedButton');

const menuItems = [
  { name: 'COFFEE', price: 35, category: 'caffeine' },
  { name: 'LATTE', price: 115, category: 'caffeine' },
  { name: 'CAPPUCCINO', price: 120, category: 'caffeine' },
  { name: 'REGULAR TEA', price: 35, category: 'teas' },
  { name: 'BUBBLE TEA', price: 80, category: 'teas' },
  { name: 'INFUSED TEA (Chamomile,Green Tea,Blue Pea,Berry)', price: 165, category: 'teas' },
  { name: 'BLACK FOREST', price: 95, category: 'cakes' },
  { name: 'RED VELVET', price: 95, category: 'cakes' },
  { name: 'REGULAR FLAVORS (Chocolate,Strawberry,Vanilla)', price: 75, category: 'cakes' },
  { name: 'SAMOSA', price: 12, category: 'snacks' },
  { name: 'VEG CURRY PUFF', price: 30, category: 'snacks' },
  { name: 'PANEER/CHICKEN PUFF', price: 48, category: 'snacks' },
  { name: 'VEG SANDWICH', price: 100, category: 'snacks' },
  { name: 'CHICKEN SANDWICH', price: 130, category: 'snacks' }
];

let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
let total = calculateTotal();

function calculateTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderMenuItems() {
  caffeineContainer.innerHTML = '';
  teasContainer.innerHTML = '';
  cakesContainer.innerHTML = '';
  snacksContainer.innerHTML = '';

  menuItems.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menuItem');
    const isItemInCart = cart.some(cartItem => cartItem.name === item.name);
    menuItem.innerHTML = `
      <h4>${item.name}</h4>
      <div class="dotted-line"></div>
      <div class="price-container">
        <p>&#8377; ${item.price}</p>
        <button onclick="addToCart('${item.name}', ${item.price}, this)">${isItemInCart ? 'Added to Cart' : 'Add to Cart'}</button>
      </div>
    `;

    switch (item.category) {
      case 'caffeine':
        caffeineContainer.appendChild(menuItem);
        break;
      case 'teas':
        teasContainer.appendChild(menuItem);
        break;
      case 'cakes':
        cakesContainer.appendChild(menuItem);
        break;
      case 'snacks':
        snacksContainer.appendChild(menuItem);
        break;
    }
  });
}

function addToCart(name, price, button) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  sessionStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
  button.textContent = 'Added to Cart';
}

function renderCartItems() {
  total = calculateTotal();
  totalElement.textContent = total.toFixed(2);
  proceedButton.disabled = cart.length === 0;
}

function proceedToCart() {
  window.location.href = 'cart.html';
}

function resetCart() {
  cart = [];
  sessionStorage.removeItem('cart');
  renderCartItems();
}

renderMenuItems();
renderCartItems();
proceedButton.addEventListener('click', proceedToCart);