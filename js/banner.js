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
        this.autoPlayDelay = 3000; // 3秒自动切换
        
        this.init();
    }
    
    init() {
        // 绑定事件
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // 绑定指示器点击事件
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });
        
        // 鼠标悬停时暂停自动播放
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // 开始自动播放
        this.startAutoPlay();
    }
    
    updateSlider() {
        // 更新轮播图显示
        this.items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
        
        // 更新指示器状态
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

// 页面加载完成后初始化轮播图
document.addEventListener('DOMContentLoaded', () => {
    new BannerSlider();
}); 