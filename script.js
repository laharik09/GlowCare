gsap.from("#logo", { 
    duration: 1, 
    y: -50, 
    opacity: 0, 
    ease: "bounce.out" 
}); 
 
gsap.from("nav ul li", { 
    duration: 1, 
    opacity: 0, 
    y: -30, 
    stagger: 0.2 
}); 
 
 
gsap.from(".hero-text h2", { 
    duration: 1.2, 
    x: -100, 
    opacity: 0 
}); 
 
gsap.from(".hero-text p", { 
    duration: 1.4, 
    x: -100, 
    opacity: 0, 
    delay: 0.3 
}); 
 
gsap.from(".hero-text button", { 
    duration: 1, 
    scale: 0, 
    ease: "back.out(1.7)", 
    delay: 0.6 
}); 
 
gsap.from(".hero-image img", { 
    duration: 1.5, 
    x: 100, 
    opacity: 0, 
    ease: "power3.out" 
}); 
 
gsap.from(".feature", { 
    scrollTrigger: ".features", 
    duration: 1, 
    opacity: 0, 
    y: 50, 
    stagger: 0.3 
}); 
let slideIndex = 0; 
showSlides(); 
 
function showSlides() { 
    const slides = document.getElementsByClassName("slide"); 
    for (let i = 0; i < slides.length; i++) { 
        slides[i].style.display = "none"; 
    } 
 
    slideIndex++; 
    if (slideIndex > slides.length) { slideIndex = 1 } 
 
    slides[slideIndex - 1].style.display = "block"; 
 
    setTimeout(showSlides, 3000); 
} 
 
let cart = JSON.parse(localStorage.getItem("cart")) || []; 
const cartCountEl = document.getElementById("cart-count"); 
 
function updateCartCount() { 
    cartCountEl.textContent = cart.reduce((a, c) => a + c.quantity, 0); 
} 
updateCartCount(); 
 
document.getElementById("cart-btn").addEventListener("click", () => { 
    window.location.href = "cart.html"; 
}); 
 
document.querySelectorAll(".add-to-cart").forEach(button => { 
    button.addEventListener("click", () => { 
        const card = button.closest(".product-card"); 
        const title = card.querySelector("h4").textContent; 
        const price = card.querySelector("p").textContent; 
        const img = card.querySelector("img").src; 
 
        const existing = cart.find(item => item.title === title); 
        if (existing) { 
            existing.quantity += 1; 
        } else { 
            cart.push({ 
                title, 
                price: parseFloat(price.replace('₹', '')), 
                img, 
                quantity: 1, 
            }); 
        } 
 
        localStorage.setItem("cart", JSON.stringify(cart)); 
        updateCartCount(); 
        console.log("Cart contents:", cart); 
    }); 
}); 
 
const buyNowButtons = document.querySelectorAll(".buy-now"); 
 
buyNowButtons.forEach((button) => { 
    button.addEventListener("click", () => { 
        const product = { 
            name: button.dataset.name, 
            price: parseFloat(button.dataset.price), 
            image: button.dataset.image, 
        }; 
 
        localStorage.setItem("buyNowProduct", JSON.stringify(product)); 
        window.location.href = "checkout.html"; 
    }); 
}); 
 
const searchInput = document.getElementById("searchInput"); 
const searchBtn = document.getElementById("searchBtn"); 
const productCards = document.querySelectorAll(".product-card"); 
 
function filterProducts() { 
    const query = searchInput.value.toLowerCase().trim(); 
 
    productCards.forEach((card) => { 
        const name = card.dataset.name ? card.dataset.name.toLowerCase() : 
""; 
 
        if (name.includes(query)) { 
            card.style.display = "block"; 
        } else { 
            card.style.display = "none"; 
        } 
    }); 
} 
searchBtn.addEventListener("click", filterProducts); 
searchInput.addEventListener("keyup", filterProducts);
