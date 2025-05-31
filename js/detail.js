class ProductDetail {
    constructor() {
        this.selectedOptions = {}; // 存储所有规格的选择
        this.quantity = 1;
        this.minQuantity = 1;
        this.maxQuantity = 99;
        
        this.init();
    }
    
    init() {
        // 初始化规格选择
        this.initSizeSelection();
        // 初始化数量控制
        this.initQuantityControl();
        // 初始化加入购物车按钮
        this.initAddToCart();
    }
    
    initSizeSelection() {
        // 获取所有规格组
        const sizeGroups = document.querySelectorAll('.product-size');
        
        sizeGroups.forEach(group => {
            const sizeList = group.querySelector('.size-list');
            const sizeName = group.querySelector('.size-name').textContent.toLowerCase();
            
            if (sizeList) {
                // 初始化选中状态
                this.selectedOptions[sizeName] = null;
                
                sizeList.addEventListener('click', (e) => {
                    if (e.target.tagName === 'SPAN') {
                        // 移除其他选中状态
                        sizeList.querySelectorAll('span').forEach(span => {
                            span.classList.remove('selected');
                        });
                        // 添加当前选中状态
                        e.target.classList.add('selected');
                        this.selectedOptions[sizeName] = e.target.textContent;
                        this.updateAddToCartButton();
                    }
                });
            }
        });
    }
    
    initQuantityControl() {
        const minusBtn = document.querySelector('.quantity-btn-remove');
        const plusBtn = document.querySelector('.quantity-btn-add');
        const quantityInput = document.querySelector('.quantity-input');
    
        if (minusBtn && plusBtn && quantityInput) {
            // 减少数量
            minusBtn.addEventListener('click', () => {
                if (this.quantity > this.minQuantity) {
                    this.quantity--;
                    this.updateQuantity();
                }
            });
            // 增加数量
            plusBtn.addEventListener('click', () => {
                if (this.quantity < this.maxQuantity) {
                    this.quantity++;
                    this.updateQuantity();
                }
            });
        }
    }
    
    updateQuantity() {
        const quantityInput = document.querySelector('.quantity-input');
        const minusBtn = document.querySelector('.quantity-btn-remove');
        const plusBtn = document.querySelector('.quantity-btn-add');
        
        if (quantityInput && minusBtn && plusBtn) {
            quantityInput.textContent = this.quantity;
           
            // 更新按钮状态
            minusBtn.disabled = this.quantity <= this.minQuantity;
            plusBtn.disabled = this.quantity >= this.maxQuantity;
        }
    }
    
    initAddToCart() {
        const quantityInput = document.querySelector('.quantity-input');
        const addToCartBtn = document.querySelector('.add-to-cart');
        const addToCartTxt = document.querySelector('#icon-cart-menu span');
        const cartPopup = document.getElementById('cart-popup');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                // 检查是否所有规格都已选择
                const allSelected = Object.values(this.selectedOptions).every(value => value !== null);
                
                if (allSelected) {
                    // 这里添加加入购物车的逻辑
                   
                    addToCartTxt.style.display = 'block'
                    cartPopup.style.display = 'block';
                    addToCartBtn.style.background = '#df0e0e'

                    let carts = sessionStorage.getItem('cart')
                    carts = carts ? JSON.parse(carts) : []
                    if (window.location.pathname.includes('detail.html')) {
                       const index = carts.findIndex(item => item.id == 1)
                       if (index > -1) {
                        carts.splice(index, 1, {id: 1, quantity: quantityInput.textContent})
                       } else {
                        carts.push({id: 1, quantity: quantityInput.textContent})
                       }
                    } else if (window.location.pathname.includes('detail2.html')){
                        const index = carts.findIndex(item => item.id == 2)
                        if (index > -1) {
                         carts.splice(index, 1, {id: 2, quantity: quantityInput.textContent})
                        } else {
                        carts.push({id: 1, quantity: quantityInput.textContent})
                        }
                    }
                    addToCartTxt.innerHTML = carts.length
                    sessionStorage.setItem('cart',JSON.stringify(carts))
                    console.log('加入购物车', {
                        options: this.selectedOptions,
                        quantity: this.quantity
                    });
                }
            });
        }
    }
    
    updateAddToCartButton() {
        const addToCartBtn = document.querySelector('.add-to-cart');
        if (addToCartBtn) {
            // 检查是否所有规格都已选择
            const allSelected = Object.values(this.selectedOptions).every(value => value !== null);
            addToCartBtn.disabled = !allSelected;
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new ProductDetail();
}); 