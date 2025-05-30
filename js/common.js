const searchInput = document.querySelector('.search-box input');
const searchDropdown = document.getElementById('searchDropdown');

searchInput.addEventListener('input', (e) => {
  if (e.target.value) {
    searchDropdown.style.display = 'flex';
  } else {
    setTimeout(() => { // 延迟隐藏，避免点击下拉内容时立刻消失
      searchDropdown.style.display = 'none';
    }, 150);
  }
});
searchInput.addEventListener('blur', () => {
  setTimeout(() => { // 延迟隐藏，避免点击下拉内容时立刻消失
    searchDropdown.style.display = 'none';
  }, 150);
});
// 获取购物车图标和弹窗
const cartIcon = document.querySelector('#icon-cart-menu');
const cartPopup = document.getElementById('cart-popup');

// 购物车图标和弹窗的显示/隐藏
cartIcon && cartIcon.addEventListener('mouseenter', function() {
  cartPopup.style.display = 'block';
});
cartIcon && cartIcon.addEventListener('mouseleave', function() {
  setTimeout(() => {
    if (!cartPopup.matches(':hover')) {
      cartPopup.style.display = 'none';
    }
  }, 200);
});
cartPopup && cartPopup.addEventListener('mouseleave', function() {
  cartPopup.style.display = 'none';
});
cartPopup && cartPopup.addEventListener('mouseenter', function() {
  cartPopup.style.display = 'block';
});