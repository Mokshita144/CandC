const cartContainer = document.getElementById('cartContainer');
const totalElementCart = document.getElementById('total');

let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
let total = calculateTotal();

function calculateTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderCartItems() {
  const tableBody = document.getElementById('cartContainer');
  tableBody.innerHTML = '';
  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>&#8377; ${item.price}</td>
      <td>
        <button onclick="decreaseQuantity(${index})">-</button>
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
        <button onclick="increaseQuantity(${index})">+</button>
      </td>
      <td><button onclick="removeFromCart(${index})">Remove</button></td>
    `;
    tableBody.appendChild(row);
  });

  const checkoutButton = document.getElementById('checkoutButton');
  checkoutButton.disabled = cart.length === 0;
  totalElementCart.innerHTML = '&#8377;' + total.toFixed(2);
}

function addToCart(name, price, quantity = 1) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
  sessionStorage.setItem('cart', JSON.stringify(cart));
  total = calculateTotal(); // Recalculate total
  renderCartItems();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  total = calculateTotal(); // Recalculate total
  renderCartItems();
}

function increaseQuantity(index) {
  cart[index].quantity++;
  sessionStorage.setItem('cart', JSON.stringify(cart));
  total = calculateTotal(); // Recalculate total
  renderCartItems();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    total = calculateTotal(); // Recalculate total
    renderCartItems();
  }
}

function updateQuantity(index, newQuantity) {
  cart[index].quantity = parseInt(newQuantity);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  total = calculateTotal(); // Recalculate total
  renderCartItems();
}


renderCartItems();
