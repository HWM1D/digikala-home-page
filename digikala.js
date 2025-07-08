// Slider functionality
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startAutoSlide();
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause auto-slide on hover
        const sliderWrapper = document.querySelector('.slider-wrapper');
        sliderWrapper.addEventListener('mouseenter', () => this.stopAutoSlide());
        sliderWrapper.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    updateSlide() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlide();
    }
    
    prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.updateSlide();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Search functionality
class SearchHandler {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.searchBtn = document.querySelector('.search-btn');
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        
        // Search suggestions (placeholder)
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearchInput(e.target.value);
        });
    }
    
    handleSearch() {
        const query = this.searchInput.value.trim();
        if (query) {
            console.log('جستجو برای:', query);
            // اینجا می‌توانید منطق جستجو را پیاده‌سازی کنید
            this.showToast(`جستجو برای "${query}" انجام شد`);
        }
    }
    
    handleSearchInput(value) {
        // اینجا می‌توانید پیشنهادات جستجو را نمایش دهید
        if (value.length > 2) {
            console.log('نمایش پیشنهادات برای:', value);
        }
    }
    
    showToast(message) {
        // Toast notification ساده
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Product interactions
class ProductHandler {
    constructor() {
        this.productCards = document.querySelectorAll('.product-card');
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.productCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleProductClick(e));
            card.addEventListener('mouseenter', (e) => this.handleProductHover(e));
        });
    }
    
    handleProductClick(e) {
        const productTitle = e.currentTarget.querySelector('h3').textContent;
        console.log('کلیک روی محصول:', productTitle);
        // اینجا می‌توانید به صفحه محصول هدایت کنید
    }
    
    handleProductHover(e) {
        // اضافه کردن افکت‌های اضافی در هنگام hover
        const image = e.currentTarget.querySelector('.product-placeholder');
        if (image) {
            image.style.transform = 'scale(1.05)';
            image.style.transition = 'transform 0.3s ease';
        }
        
        e.currentTarget.addEventListener('mouseleave', () => {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        }, { once: true });
    }
}

// Cart functionality
class CartHandler {
    constructor() {
        this.cartBtn = document.querySelector('.cart-btn');
        this.cartCount = document.querySelector('.cart-count');
        this.cartItems = this.loadCartFromStorage();
        this.init();
    }
    
    init() {
        this.updateCartDisplay();
        this.bindEvents();
    }
    
    bindEvents() {
        this.cartBtn.addEventListener('click', () => this.toggleCart());
    }
    
    toggleCart() {
        console.log('نمایش سبد خرید');
        // اینجا می‌توانید مودال سبد خرید را نمایش دهید
        this.showCartModal();
    }
    
    showCartModal() {
        // ایجاد مودال ساده برای سبد خرید
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-header">
                    <h3>سبد خرید</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="cart-body">
                    <p>سبد خرید شما ${this.cartItems.length} محصول دارد</p>
                    <p>این یک نمونه اولیه است</p>
                </div>
                <div class="cart-footer">
                    <button class="checkout-btn">ادامه خرید</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const content = modal.querySelector('.cart-modal-content');
        content.style.cssText = `
            background: white;
            padding: 24px;
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        document.body.appendChild(modal);
        
        // بستن مودال
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    updateCartDisplay() {
        this.cartCount.textContent = this.cartItems.length;
    }
    
    loadCartFromStorage() {
        const saved = localStorage.getItem('digikala-cart');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveCartToStorage() {
        localStorage.setItem('digikala-cart', JSON.stringify(this.cartItems));
    }
}

// Category interactions
class CategoryHandler {
    constructor() {
        this.categoryItems = document.querySelectorAll('.category-item');
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.categoryItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleCategoryClick(e));
        });
    }
    
    handleCategoryClick(e) {
        const categoryName = e.currentTarget.querySelector('span').textContent;
        console.log('کلیک روی دسته‌بندی:', categoryName);
        // اینجا می‌توانید به صفحه دسته‌بندی هدایت کنید
    }
}

// Mobile menu handler
class MobileMenuHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.createMobileMenuToggle();
        this.handleResponsiveMenu();
    }
    
    createMobileMenuToggle() {
        const header = document.querySelector('.header-top');
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
        `;
        
        header.insertBefore(menuToggle, header.firstChild);
        
        menuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
    }
    
    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('mobile-open');
        
        if (!document.querySelector('.mobile-menu-styles')) {
            const styles = document.createElement('style');
            styles.className = 'mobile-menu-styles';
            styles.textContent = `
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: block !important;
                    }
                    
                    .nav-menu {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: #ef394e;
                        transform: translateY(-100%);
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                        z-index: 1000;
                    }
                    
                    .nav-menu.mobile-open {
                        transform: translateY(0);
                        opacity: 1;
                        visibility: visible;
                    }
                    
                    .menu-list {
                        flex-direction: column;
                        padding: 16px 0;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }
    
    handleResponsiveMenu() {
        const checkScreenSize = () => {
            const navMenu = document.querySelector('.nav-menu');
            if (window.innerWidth > 768) {
                navMenu.classList.remove('mobile-open');
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
    }
}

// Animation utilities
class AnimationUtils {
    static observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const animatedElements = document.querySelectorAll('.product-card, .category-item, .section-title');
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    static addScrollAnimations() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
        
        header.style.transition = 'transform 0.3s ease';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new HeroSlider();
    new SearchHandler();
    new ProductHandler();
    new CartHandler();
    new CategoryHandler();
    new MobileMenuHandler();
    
    // Add animations
    AnimationUtils.observeElements();
    AnimationUtils.addScrollAnimations();
    
    // Add custom animations styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .toast {
            font-family: 'Vazirmatn', sans-serif;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(animationStyles);
    
    console.log('صفحه دیجی‌کالا با موفقیت لود شد! 🎉');
});

// Utility functions
const utils = {
    // Format price with Persian digits
    formatPrice: (price) => {
        return price.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
    },
    
    // Add to cart functionality
    addToCart: (productId, productData) => {
        const cart = JSON.parse(localStorage.getItem('digikala-cart') || '[]');
        cart.push({ id: productId, ...productData, quantity: 1 });
        localStorage.setItem('digikala-cart', JSON.stringify(cart));
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    },
    
    // Smooth scroll to element
    scrollToElement: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

// Export for potential use
window.DigikalaUtils = utils;