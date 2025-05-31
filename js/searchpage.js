// 1. 复制filter-sidebar内容到popup
function moveFilterSidebarToPopup() {
  var sidebar = document.querySelector('.filter-sidebar');
  var container = document.getElementById('filterSidebarContainer');
  if (sidebar && container && container.children.length === 0) {
    container.appendChild(sidebar);
  }
}

// 2. 打开弹窗
document.getElementById('openFilterPopup').onclick = function() {
  moveFilterSidebarToPopup();
  document.getElementById('filterPopup').style.display = 'block';
  document.body.style.overflow = 'hidden';
};
document.getElementById('openFilterPopup').onclick = function() {
  moveFilterSidebarToPopup();
  document.getElementById('filterPopup').style.display = 'block';
  document.body.style.overflow = 'hidden';
};
// 3. 关闭弹窗
document.getElementById('filterPopupClose').onclick = function() {
  document.getElementById('filterPopup').style.display = 'none';
  document.body.style.overflow = '';
};
document.getElementById('filterPopupMask').onclick = function() {
  document.getElementById('filterPopup').style.display = 'none';
  document.body.style.overflow = '';
};
document.getElementById('show-result').onclick = function() {
  document.getElementById('filterPopup').style.display = 'none';
  document.body.style.overflow = '';
};

document.getElementById('cart1').onclick = function(e) {
  e.preventDefault()
  const addToCartTxt = document.querySelector('#icon-cart-menu span');
  let carts = sessionStorage.getItem('cart')
  carts = carts ? JSON.parse(carts) : []
  const index = carts.findIndex(item => item.id == 1)
  if (index > -1) {
  carts.splice(index, 1, {id: 1, quantity: 1})
  } else {
  carts.push({id: 1, quantity: 1})
  }
  
  addToCartTxt.innerHTML = carts.length
  sessionStorage.setItem('cart',JSON.stringify(carts))
  window.renderCartCommon()
};
document.getElementById('cart2').onclick = function(e) {
  e.preventDefault()

  const addToCartTxt = document.querySelector('#icon-cart-menu span');
  let carts = sessionStorage.getItem('cart')
  carts = carts ? JSON.parse(carts) : []
  const index = carts.findIndex(item => item.id == 2)
  if (index > -1) {
  carts.splice(index, 1, {id: 2, quantity: 1})
  } else {
  carts.push({id: 2, quantity: 1})
  }
  
  addToCartTxt.innerHTML = carts.length
  sessionStorage.setItem('cart',JSON.stringify(carts))
  window.renderCartCommon()
};