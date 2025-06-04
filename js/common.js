const searchInput = document.querySelector('.search-box input');
const searchDropdown = document.getElementById('searchDropdown');

searchInput.addEventListener('input', (e) => {
  if (e.target.value) {
    searchDropdown.style.display = 'flex';
  } else {
    setTimeout(() => { // Delay hiding to avoid immediate disappearance when clicking on the drop-down content
      searchDropdown.style.display = 'none';
    }, 150);
  }
});
searchInput.addEventListener('blur', () => {
  setTimeout(() => { // Delay hiding to avoid immediate disappearance when clicking on the drop-down content
    searchDropdown.style.display = 'none';
  }, 250);
});
// Get the shopping cart icon and pop-up window
const cartIcon = document.querySelector('#icon-cart-menu');
const cartPopup = document.getElementById('cart-popup');

// Show/hide shopping cart icon and pop-up window
// cartIcon && cartIcon.addEventListener('mouseenter', function() {
//   cartPopup.style.display = 'block';
//   renderCart()
// });
cartIcon && cartIcon.addEventListener('click', function() {

  if (cartPopup.style.display == 'block') {
    cartPopup.style.display = 'none';
  } else {
    cartPopup.style.display = 'block';
    renderCart()
  }
 
});
// cartIcon && cartIcon.addEventListener('mouseleave', function() {
//   setTimeout(() => {
//     if (!cartPopup.matches(':hover')) {
//       cartPopup.style.display = 'none';
//     }
//   }, 200);
// });
// cartPopup && cartPopup.addEventListener('mouseleave', function() {
//   cartPopup.style.display = 'none';
// });
// cartPopup && cartPopup.addEventListener('mouseenter', function() {
//   cartPopup.style.display = 'block';
//   renderCart()
// });

// Simulate shopping cart data
let cartData = [
  {
    id: 1,
    name: "Dry Cat Food",
    desc: "Special Price",
    price: 199.00,
    img: "images/img1.png",
    qty: 1
  },
  {
    id: 2,
    name: "Stage Cat Food",
    desc: "Special Price",
    price: 99.00,
    img: "images/detail2.webp",
    qty: 1
  }
];

// Rendering shopping cart items
function renderCart() {
  let carts = sessionStorage.getItem('cart')
  carts = carts ? JSON.parse(carts) : []
  const addToCartTxt = document.querySelector('#icon-cart-menu span');
  const cartList = document.querySelector('.cart-popup-content');
  cartList && (cartList.innerHTML = '');
  if (addToCartTxt && carts.length > 0) {
    addToCartTxt.innerHTML = carts.length
    addToCartTxt.style.display = 'block'
  }

  cartData.forEach((item, idx) => {
    const index = carts.findIndex(x => x.id == item.id)
 
    if (index === -1) return
    const cartItem = document.createElement('div');
    console.log(item)
    // cartItem.className = 'suggest-product-card';
    cartItem.innerHTML = `
      <img src="${item.img}" alt="Product pictures" class="cart-popup-img">
      <div class="cart-popup-info">
          <div class="cart-popup-name">${item.name}</div>
          <div class="cart-popup-price">$${item.price.toFixed(2)}</div>
          <div class="cart-popup-qty">
          <div class="quantity-selector" style="display:flex; align-items:center; gap:12px;">
            <button class="quantity-btn quantity-btn-remove1" data-idx="${idx}">-</button>
            <i >${item.qty}</i>
            <!-- <input type="number" value="1" min="1" class="quantity-input"> -->
            <button class="quantity-btn quantity-btn-add1" data-idx="${idx}" style="background-color: #54361A;color: #fff;">+</button>
          </div>
        
          </div>
      </div>
    `;
    cartList && (cartList.appendChild(cartItem));
  });
}
window.renderCartCommon = renderCart
renderCart()