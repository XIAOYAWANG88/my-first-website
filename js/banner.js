class BannerSlider {
    constructor() {
        this.container = document.querySelector('.banner-container');
        this.items = document.querySelectorAll('.banner-item');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.banner-control.prev');
        this.nextBtn = document.querySelector('.banner-control.next');
        
        this.currentIndex = 0;
        this.totalItems = this.items.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 3000; // 3 seconds automatic switching
        
        this.init();
    }
    
    init() {
        // Binding events
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Binding indicator click event
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });
        
        // Pause autoplay on mouseover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Start autoplay
        this.startAutoPlay();
    }
    
    updateSlider() {
        // Update the carousel display
        this.items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update indicator status
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateSlider();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateSlider();
    }
    
    goTo(index) {
        this.currentIndex = index;
        this.updateSlider();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize the carousel after the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BannerSlider();
}); 