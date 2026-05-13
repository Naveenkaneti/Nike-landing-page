// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

// Mouse-follow glow effect for hero
const hero = document.querySelector('.hero');
const glow = document.querySelector('.glow-circle');

if (hero && glow) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = clientX - hero.offsetLeft;
        const y = clientY - hero.offsetTop;
        
        gsap.to(glow, {
            x: x - 300, // Offset by half width
            y: y - 300,
            duration: 0.8,
            ease: "power2.out"
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();

    // 1. Initial Zoom Out Animation for the shoe
    tl.from("#main-shoe", {
        scale: 2.5,
        rotate: -45,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    });

    // 2. Animate Hero Text (Fade and Slide)
    tl.from("#hero-sub", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5");

    tl.from("#hero-title", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6");

    // 3. Animate Hero Buttons
    tl.from("#hero-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6");

    // 4. Animate Navbar
    tl.from("nav", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=1");

    // 5. Floating Shoe Animation (Infinite)
    gsap.to("#main-shoe", {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

// Fetch products from backend
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        console.log("Fetched Products from Backend:", products);
        // Here you could dynamically render cards, 
        // but for now we keep the high-fidelity static ones 
        // as per the premium design requirements.
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

fetchProducts();

// Cart Logic
let cart = [];
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');

function toggleCart() {
    cartDrawer.classList.toggle('open');
}

if (cartBtn) cartBtn.addEventListener('click', toggleCart);
if (closeCart) closeCart.addEventListener('click', toggleCart);

function addToCart(name, price, image) {
    const item = { name, price, image };
    cart.push(item);
    updateCartUI();
    
    // Animation effect on cart icon
    gsap.from(".cart-icon-btn", {
        scale: 1.5,
        duration: 0.3,
        ease: "back.out(2)"
    });
}

function updateCartUI() {
    // Update count
    cartCount.innerText = cart.length;
    
    // Update items list
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        cartTotal.innerText = '$0.00';
        return;
    }
    
    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Add a style to .nav-links.active in CSS if needed, 
        // but for now just showing the logic.
    });
}

