let cart = JSON.parse(localStorage.getItem("grablyCart")) || [];

// Fix any older cart items saved before quantity was added
cart = cart
    .filter(product => product && product.name && product.price)
    .map(product => ({
        name: product.name,
        price: Number(product.price),
        quantity: Number(product.quantity) || 1
    }));

saveCart();

function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(name + " has been added to your cart!");
}

function saveCart() {
    localStorage.setItem(
        "grablyCart",
        JSON.stringify(cart)
    );
}

function updateCartCount() {

    const count = document.getElementById("cart-count");

    if (count) {

        let totalItems = 0;

        cart.forEach(product => {
            totalItems += product.quantity;
        });

        count.textContent = totalItems;
    }
}

function openCart() {
    window.location.href = "cart.html";
}

updateCartCount();