class ProductDetail {
    constructor() {
        this.selectedOptions = {}; // Store all specifications
        this.quantity = 1;
        this.minQuantity = 1;
        this.maxQuantity = 99;
        
        this.init();
    }
    
    init() {
        // Initialization specification selection
        this.initSizeSelection();
        // Initial quantity control
        this.initQuantityControl();
        // Initialize the Add to Cart button
        this.initAddToCart();
    }
    
    initSizeSelection() {
        // Get all specification groups
        const sizeGroups = document.querySelectorAll('.product-size');
        
        sizeGroups.forEach(group => {
            const sizeList = group.querySelector('.size-list');
            const sizeName = group.querySelector('.size-name').textContent.toLowerCase();
            
            if (sizeList) {
                // Initialize selected state
                this.selectedOptions[sizeName] = null;
                
                sizeList.addEventListener('click', (e) => {
                    if (e.target.tagName === 'SPAN') {
                        // Remove other selected states
                        sizeList.querySelectorAll('span').forEach(span => {
                            span.classList.remove('selected');
                        });
                        // Add the currently selected state
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
            // reduce quantity
            minusBtn.addEventListener('click', () => {
                if (this.quantity > this.minQuantity) {
                    this.quantity--;
                    this.updateQuantity();
                }
            });
            // increase quantity
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
           
            // Update button state
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
                // Check that all specifications are selected
                const allSelected = Object.values(this.selectedOptions).every(value => value !== null);
                
                if (allSelected) {
                    // Add the logic of adding to the shopping cart here
                   
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
                        carts.push({id: 2, quantity: quantityInput.textContent})
                        }
                    }
                    addToCartTxt.innerHTML = carts.length
                    sessionStorage.setItem('cart',JSON.stringify(carts))
                    window.renderCartCommon()
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
            // Check that all specifications are selected
            const allSelected = Object.values(this.selectedOptions).every(value => value !== null);
            addToCartBtn.disabled = !allSelected;
        }
    }
}

// Initialize after the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductDetail();
}); 