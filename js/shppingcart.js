// 模拟购物车数据
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
      img: "images/img2.png",
      qty: 1
    }
  ];
  
  // 渲染购物车商品
  function renderCart() {
    const cartList = document.querySelector('.cart-list');
    cartList.innerHTML = '';
    cartData.forEach((item, idx) => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img class="cart-item-img" src="${item.img}" alt="" />
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-desc">${item.desc}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="cart-qty-btn cart-qty-minus" data-idx="${idx}">-</button>
          <span class="cart-qty-value">${item.qty}</span>
          <button class="cart-qty-btn cart-qty-plus" data-idx="${idx}">+</button>
        </div>
        <div class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</div>
        <button class="cart-item-remove" data-idx="${idx}">
          <i class="ri-close-line"></i>
        </button>
      `;
      cartList.appendChild(cartItem);
    });
    updateSummary();
  }
  
  // 更新总金额
  function updateSummary() {
    let orderPrice = 0;
    cartData.forEach(item => {
      orderPrice += item.price * item.qty;
    });
    const shipping = 5.99;
    const discount = 0.0;
    const total = orderPrice + shipping - discount;
  
    // PC端
    document.querySelectorAll('.cart-summary-row').forEach(row => {
      if (row.children[0].textContent.includes('Order Price')) {
        row.children[1].textContent = `$${orderPrice.toFixed(2)}`;
      }
      if (row.children[0].textContent.includes('Discount')) {
        row.children[1].textContent = `$${discount.toFixed(2)}`;
      }
      if (row.children[0].textContent.includes('shipping fees')) {
        row.children[1].textContent = `$${shipping.toFixed(2)}`;
      }
      if (row.classList.contains('cart-summary-total')) {
        row.children[1].textContent = `$${total.toFixed(2)}`;
      }
    });
    // PC端大字
    document.querySelectorAll('.cart-summary-final-price span').forEach(span => {
      span.textContent = `$${total.toFixed(2)}`;
    });
  }
  
  // 事件委托处理加减
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cart-qty-plus')) {
      const idx = e.target.getAttribute('data-idx');
      cartData[idx].qty++;
      renderCart();
    }
    if (e.target.classList.contains('cart-qty-minus')) {
      const idx = e.target.getAttribute('data-idx');
      if (cartData[idx].qty > 1) {
        cartData[idx].qty--;
        renderCart();
      }
    }
    if (e.target.classList.contains('cart-item-remove') || e.target.closest('.cart-item-remove')) {
      const btn = e.target.classList.contains('cart-item-remove') ? e.target : e.target.closest('.cart-item-remove');
      const idx = btn.getAttribute('data-idx');
      cartData.splice(idx, 1);
      renderCart();
    }
  });
  
  // 页面加载时渲染
  window.addEventListener('DOMContentLoaded', renderCart);